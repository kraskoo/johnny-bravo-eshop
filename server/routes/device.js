const express = require('express');
const router = new express.Router;
const Device = require('../models/Device');
const Category = require('../models/Category');
const { common: commonMessages, device: messages } = require('../services/messages');

router.get('/all', (_req, res) => {
  Device.find({}).populate('category').then(devices => {
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

router.get('/buy/:id/:count', (req, res) => {
  const params = req.params;
  if (params) {
    const { id, count } = params;
    Device.findById(id).then(device => {
      if (device.quantity < count) {
        return res.status(400).json({
          success: false,
          message: messages.notEnoughDevices
        });
      }

      device.quantity -= count;
      device.save().then(() => {
        return res.status(200).json({
          success: true,
          message: messages.buyedDevices(count)
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
      message: commonMessages.requiredParametes
    });
  }
});

router.post('/create', (req, res) => {
  const body = req.body;
  if (body) {
    const { name, description, characteristics, category, quantity, price, imageUrls } = req.body;
    Category.findById(category).then(c => {
      const newDevice = new Device({ name, description, characteristics, category, quantity, price, imageUrls });
      newDevice.save().then(device => {
        c.devices.push(device._id);
        c.save().then(() => {
          return res.status(200).json({
            success: true,
            message: messages.createdDevice
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
    }).catch(error => {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    });
  } else {
    return res.status(400).json({
      success: false,
      message: commonMessages.requiredBody
    });
  }
});

router.get('/delete/:id', (req, res) => {
  const params = req.params;
  if (params) {
    const { id } = params;
    Device.findById(id).populate('category').then(device => {
      device.category.devices.pull(device._id);
      device.category.save().then(() => {
        Device.findByIdAndRemove(id).then(() => {
          return res.status(200).json({
            success: true,
            message: messages.deletedDevice
          });
        }).catch(error => {
          return res.status(400).json({
            success: false,
            message: error.message
          });
        })
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
      message: commonMessages.requiredParametes
    });
  }
});

router.post('/edit/:id', (req, res) => {
  const params = req.params;
  const body = req.body;
  if (params && body) {
    const { id } = params;
    const { name, description, characteristics, category, quantity, price, imageUrls } = body;
    Device.findByIdAndUpdate(id).then(device => {
      device.name = name;
      device.description = description;
      device.characteristics = characteristics;
      device.quantity = quantity;
      device.price = price;
      device.imageUrls = imageUrls;
      if (category !== device.category) {
        Category.findById(device.category).then(oldCategory => {
          device.category = category;
          oldCategory.devices.pull(device._id);
          oldCategory.save().then(() => {
            Category.findById(category).then(newCategory => {
              newCategory.devices.push(device._id);
              newCategory.save().then(() => {
                device.save().then(() => {
                  return res.status(200).json({
                    success: true,
                    message: messages.editedDevice
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
            }).catch(error => {
              return res.status(400).json({
                success: false,
                message: error.message
              });
            })
          }).catch(error => {
            return res.status(400).json({
              success: false,
              message: error.message
            });
          })
        }).catch(error => {
          return res.status(400).json({
            success: false,
            message: error.message
          });
        });
      } else {
        device.save().then(() => {
          return res.status(200).json({
            success: true,
            message: messages.editedDevice
          });
        }).catch(error => {
          return res.status(400).json({
            success: false,
            message: error.message
          });
        });
      }
    }).catch(error => {
      return res.status(400).json({
        success: false,
        message: error.message
      });
    });
  } else {
    return res.status(400).json({
      success: false,
      message: commonMessages.requiredParametes
    });
  }
});

router.get('/get/:id', (req, res) => {
  const params = req.params;
  if (params) {
    const { id } = params;
    Device.findById(id).populate('category').then(device => {
      return res.status(200).json({
        success: true,
        message: messages.fetchedDevice,
        device
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
      message: commonMessages.requiredParametes
    });
  }
});

router.get('/search/:search', (req, res) => {
  const params = req.params;
  if (params) {
    const { search } = params;
    Category.find({ name: { $regex: search, $options: 'i' } })
      .populate({
        path: 'devices',
        model: 'Device',
        populate: {
          path: 'category',
          model: 'Category'
        }
      })
      .then(categories => {
        if (categories && categories.length > 0) {
          const devices = [];
          for (const category of categories) {
            for (const device of category.devices) {
              devices.push(device);
            }
          }

          return res.status(200).json({
            success: true,
            message: messages.searchedDevices(devices.length),
            devices
          });
        } else {
          const descriptionSearch = search.replace(/\s+/g, ' ');
          Device.find({ $or: [{ name: { $regex: search, $options: 'i' } }, { description: { $regex: descriptionSearch, $options: 'gi' } }] })
            .populate('category')
            .then(devices => {
              return res.status(200).json({
                success: true,
                message: messages.searchedDevices(devices.length),
                devices
              });
            })
            .catch(error => {
              return res.status(400).json({
                success: false,
                message: error.message
              });
            });
        }
      }).catch(error => {
        return res.status(400).json({
          success: false,
          message: error.message
        });
      })
  } else {
    return res.status(400).json({
      success: false,
      message: commonMessages.requiredParametes
    });
  }
});

module.exports = router;