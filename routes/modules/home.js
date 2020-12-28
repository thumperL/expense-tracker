// 引用 Express 與 Express 路由器
const express = require('express');
const Category = require('../../models/category');

const router = express.Router();

// 定義首頁路由
router.get('/', (req, res) => {
  Category.find()
    .lean()
    .then((categories) => res.render('index', { categories }))
    .catch((error) => console.error(error));
});
// 匯出路由模組
module.exports = router;
