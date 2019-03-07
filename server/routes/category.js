const express = require('express');
const router = new express.Router;
const Category = require('../models/Category');
const messages = require('../services/messages').category;

router.post('/create', (req, res) => {
  const body = req.body;
  if (body) {
    const { name } = body;
    Category.create({ name }).then(() => {
      return res.status(200).json({
        success: true,
        message: messages.createdCategory
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
      message: messages.requiredBody
    });
  }
});

router.get('/edit/:id/:newName', (req, res) => {
  const params = req.params;
  if (params) {
    const { id, newName } = params;
    Category.findById(id).then(catergory => {
      catergory.name = newName;
      catergory.save().then(() => {
        return res.status(200).json({
          success: true,
          message: `Successfully edited category ${catergory.name}!`
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
    })
  } else {
    return res.status(400).json({
      success: false,
      message: 'Request should parameters!'
    });
  }
});

router.get('/all', (req, res) => {
  Category.find({}).then(categories => {
    return res.status(200).json({
      success: true,
      message: 'Successfully fetched all categories!',
      categories
    });
  }).catch(error => {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  });
});

module.exports = router;