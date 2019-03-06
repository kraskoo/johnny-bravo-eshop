const express = require('express');
const router = new express.Router;
const Tag = require('../models/Tag');
const messages = require('../services/messages').tag;

router.post('/create', (req, res) => {
  const body = req.body;
  if (body) {
    const { name } = body;
    Tag.create({ name }).then(() => {
      return res.status(200).json({
        success: true,
        message: messages.createdTag
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

router.get('/all', (req, res) => {
  Tag.find({}).then(tags => {
    return res.status(200).json({
      success: true,
      message: messages.fetchedTags,
      tags
    })
  }).catch(error => {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  });
});

module.exports = router;