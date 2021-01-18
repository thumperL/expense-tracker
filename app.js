// app.js
// require packages used in the project
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const methodOverride = require('method-override'); // 載入 method-override
const flash = require('connect-flash');
const routes = require('./routes'); // 引用路由器
const usePassport = require('./config/passport');
require('./config/mongoose');

const app = express();
const port = process.env.PORT || 3000;

// serving static files
app.use(express.static('public'));
// Init template engine
app.engine('handlebars', exphbs({
  defaultLayout: 'main',
}));
app.set('view engine', 'handlebars');
app.use(session({
  secret: 'ThisIsMySecret',
  resave: false,
  saveUninitialized: true,
}));
app.use(bodyParser.urlencoded({
  extended: true,
}));
// 設定每一筆請求都會透過 methodOverride 進行前置處理
app.use(methodOverride('_method'));
usePassport(app);
app.use(flash());
app.use((req, res, next) => {
  res.locals.isAuthenticated = req.isAuthenticated();
  res.locals.user = req.user;
  res.locals.success_msg = req.flash('success_msg'); // 設定 success_msg 訊息
  res.locals.warning_msg = req.flash('warning_msg'); // 設定 warning_msg 訊息
  next();
});
// Route to handle routing
app.use(routes);

// start and listen on the Express server
app.listen(port, () => {
  console.log(`Express is listening on localhost:${port}`);
});
