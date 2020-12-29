// 引用 Express 與 Express 路由器
const express = require('express');

const router = express.Router();

// 準備引入路由模組
const home = require('./modules/home');
const records = require('./modules/records');
const search = require('./modules/search');

router.use('/', home);
router.use('/records', records);
router.use('/search', search);

// 匯出路由器
module.exports = router;
