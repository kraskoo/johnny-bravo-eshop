const express = require('express');
const passport = require('passport');
const validator = require('validator');
const User = require('../models/User');
const router = new express.Router();
const requirements = require('../config/settings').requirements;
const messages = require('../services/messages').user;
const { isString } = require('../services/type');

function validateSignupForm (payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';  
  if (!payload || !isString(payload.username) || payload.username.trim().length < requirements.minUsernameLength) {
    isFormValid = false;
    errors.username = messages.requiredUsernameLength(requirements.minUsernameLength);
  }
  
  if (!payload || !isString(payload.email) || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = messages.incorrectEmail;
  }
  
  let password = (!payload || !payload.password || !isString(payload.password)) ? '' : payload.password.trim();
  if (password.length < requirements.minPasswordLength) {
    isFormValid = false;
    errors.password = messages.requiredPasswordLength(requirements.minPasswordLength);
  }

  if (!isFormValid) {
    message = messages.invalidForm;
  }

  return { success: isFormValid, message, errors };
}

function validateLoginForm (payload) {
  const errors = {};
  let isFormValid = true;
  let message = '';
  if (!payload || !isString(payload.email) || payload.email.trim().length === 0 || !validator.isEmail(payload.email)) {
    isFormValid = false;
    errors.email = messages.requiredEmail;
  }
  
  if (!payload || !isString(payload.password) || payload.password.trim().length === 0) {
    isFormValid = false;
    errors.password = messages.requiredPassword;
  }

  if (!isFormValid) {
    message = messages.invalidForm;
  }

  return { success: isFormValid, message, errors };
}

router.get('/allRegular', (_req, res) => {
  User.find({}).then(users => {
    const usersNotInAdminRole = [];
    users.forEach(user => {
      if (!user.roles.includes('Admin')) {
        usersNotInAdminRole.push(user);
      }
    });
    return res.status(200).json({
      success: true,
      message: messages.fetchedUserWithoutAdminRole,
      users: usersNotInAdminRole
    });
  }).catch(error => {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  });
});

router.post('/login', (req, res, next) => {
  const result = validateLoginForm(req.body);
  if (!result.success) {
    return res.status(200).json({
      success: false,
      message: result.message,
      errors: result.errors
    });
  }

  return passport.authenticate('local-login', (err, token, userData) => {
    if (err) {
      if (err.name === 'IncorrectCredentialsError') {
        return res.status(200).json({
          success: false,
          message: err.message
        });
      }

      return res.status(200).json({
        success: false,
        message: messages.unprocessableForm
      });
    }

    return res.json({
      success: true,
      message: messages.loginSuccess,
      token,
      user: userData
    });
  })(req, res, next);
});

router.post('/register', (req, res, next) => {
  const result = validateSignupForm(req.body);
  if (!result.success) {
    return res.status(200).json({
      success: false,
      message: result.message,
      errors: result.errors
    });
  }

  return passport.authenticate('local-signup', (err) => {
    if (err) {
      return res.status(200).json({
        success: false,
        message: err
      });
    }
    
    return res.status(200).json({
      success: true,
      message: messages.registerSuccess
    });
  })(req, res, next);
});

router.get('/setadmin/:id', (req, res) => {
  const id = req.params.id;
  User.findById(id).then(user => {
    if (!user.roles.includes('Admin')) {
      // TODO: fix one role issue (possible fix - delete enum from roles in model)
      user.roles.pop();
      user.roles.push('Admin');
      user.save().then(() => {
        return res.status(200).json({
          success: true,
          message: messages.setAdminRoleSuccessfully(user)
        });
      }).catch(error => {
        return res.status(400).json({
          success: false,
          message: error.message
        })
      });
    }
  }).catch(error => {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  });
});

module.exports = router;