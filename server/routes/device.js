const express = require('express');
const router = new express.Router;
const Device = require('../models/Device');
const messages = require('../services/messages').device;

router.post('/create', (req, res) => {
  const body = req.body;
  if (body) {

  } else {
    return res.status(400).json({
      success: false,
      message: messages.requiredBody
    });
  }
});

router.get('/delete/:id', (req, res) => {
  
});

router.get('/all', (req, res) => {
  Device.find({}).then(devices => {
    return res.status(200).json({
      success: true,
      message: messages.fetchedDevices,
      devices
    });
  }).catch(error => {
    return res.status(400).json({
      success: false,
      message: error.message
    });
  });
});

module.exports = router;