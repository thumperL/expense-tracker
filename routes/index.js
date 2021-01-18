// 引用 Express 與 Express 路由器
const express = require('express');

const router = express.Router();

// 準備引入路由模組
const home = require('./modules/home');
const records = require('./modules/records');
const users = require('./modules/users');
const { authenticator } = require('../middleware/auth');

router.use('/records', authenticator, records);
router.use('/users', users);
router.use('/', authenticator, home);

// 匯出路由器
module.exports = router;
