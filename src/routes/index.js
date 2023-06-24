const homeRoute = require("./site");
const registerRoute = require("./register");
const loginRoute = require("./login");
const userRoute = require("./user");
const cartRoute = require("./cart");
const orderRoute = require("./order");
const brandRoute = require("./brand");
const branchRoute = require("./branch");
const supplierRoute = require("./supplier");
const productRoute = require("./product");
const paymentRoute = require("./payment");
const statisticRoute = require("./statistic");


const authMiddlewares = require('../app/middlewares/Authmidllewares')

function route(app) {
  app.use('/', authMiddlewares.freedom, homeRoute);
  app.use('/register', registerRoute);
  app.use('/login', loginRoute);
  app.use('/cart', authMiddlewares.isAuth, cartRoute);
  app.use('/user', authMiddlewares.isAuth, userRoute);
  app.use('/payment', authMiddlewares.isAuth, paymentRoute);
  app.use('/manage/statistic', authMiddlewares.isAdmin, statisticRoute);
  app.use('/manage/order', authMiddlewares.isAdmin, orderRoute);
  app.use('/manage/brand', authMiddlewares.isAdmin, brandRoute);
  app.use('/manage/branch', authMiddlewares.isAdmin, branchRoute);
  app.use('/manage/supplier', authMiddlewares.isAdmin, supplierRoute);
  app.use('/manage/product', authMiddlewares.isAdmin, productRoute);
}
module.exports = route;
