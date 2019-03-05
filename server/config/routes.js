const userRoutes = require('../routes/user');
const sessionRoutes = require('../routes/session');

module.exports = (app) => {
  app.use('/user', userRoutes);
  app.use('/session', sessionRoutes);
};