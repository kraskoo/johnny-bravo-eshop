const userRoutes = require('../routes/user');
const sessionRoutes = require('../routes/session');
const categoryRoutes = require('../routes/category');
const deviceRoutes = require('../routes/device');

module.exports = (app) => {
  app.use('/user', userRoutes);
  app.use('/session', sessionRoutes);
  app.use('/category', categoryRoutes);
  app.use('/device', deviceRoutes);
};