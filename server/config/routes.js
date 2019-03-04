const userRoutes = require('../routes/user');

module.exports = (app) => {
  app.use('/user', userRoutes);
};