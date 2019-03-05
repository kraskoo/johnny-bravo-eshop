const express = require('express');
const router = new express.Router();
const Session = require('../models/Session');
const User = require('../models/User');
const messages = require('../services/messages').session;
const hash = require('../services/hash');

router.post('/create', (req, res, next) => {
  const body = req.body;
  if (body) {
    const { jwtString, email } = req.body;
    User.findOne({ email }).then(user => {
      const newSession = { jwtString, user: user._id };
      Session.create(newSession).then(value => {
        if (!hash.containsKey(jwtString)) {
          hash.add(jwtString, {
            jwtString: newSession.jwtString,
            user: { username: user.username, email: user.email, roles: user.roles }
          });
        }
        
        return res.status(200).json({
          success: true,
          message: messages.createdSuccess,
          user: value
        });
      }).catch(error => {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      });
    }).catch(error => {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    });
  } else {
    return res.status(400).json({
      success: false,
      message: messages.parametersMissing
    });
  }
});

router.post('/get', (req, res, next) => {
  const body = req.body;
  if (body) {
    const { jwtString, email } = body;
    if (hash.containsKey(jwtString)) {
      const value = hash.get(jwtString);
      const user = { username: value.user.username, email: value.user.email, roles: value.user.roles };
      return res.status(200).json({
        success: true,
        message: messages.sessionExists,
        token: jwtString,
        user
      });
    } else {
      User.findOne({ email }).then(user => {
        Session.findOne({ jwtString, user: user._id }).then(session => {
          if (!hash.containsKey(jwtString)) {
            hash.add(jwtString, {
              jwtString: session.jwtString,
              user: { username: user.username, email: user.email, roles: user.roles }
            });
          }
          return res.status(200).json({
            success: true,
            message: messages.sessionExists,
            token: session.jwtString,
            user: { username: user.username, email: user.email, roles: user.roles }
          });
        }).catch(error => {
          return res.status(400).json({
            success: false,
            message: error.message
          });
        });
      }).catch(error => {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      });
    }
  } else {
    return res.status(400).json({
      success: false,
      message: messages.parametersMissing
    });
  }
});

router.post('/remove', (req, res, next) => {
  const body = req.body;
  if (body) {
    const { jwtString, email } = body;
    User.findOne({ email }).then(user => {
      Session.findOneAndRemove({ jwtString, user: user._id }).then(session => {
        if (hash.containsKey(jwtString)) {
          hash.remove(jwtString);
        }

        return res.status(200).json({
          success: true,
          message: messages.deletedSuccess,
          session: { jwtString: session.jwtString, email: user.email }
        });
      }).catch(error => {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      });
    }).catch(error => {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    });
  } else {
    return res.status(400).json({
      success: false,
      message: messages.parametersMissing
    });
  }
});

module.exports = router;