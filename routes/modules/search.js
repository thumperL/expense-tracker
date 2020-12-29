// 引用 Express 與 Express 路由器
const express = require('express');

const router = express.Router();
// 引用 Todo model
const Record = require('../../models/record');

// 定義 search 路由
router.get('/', (req, res) => {
  const { keyword } = req.query;
  const regex = new RegExp(keyword, 'i'); // Have to use RegExp builder to build the if contains string filtering
  // search based on name, name_en, category, and location
  Record.find({
    $or: [
      { name: { $regex: regex } },
      { amount: { $regex: regex } },
    ],
  })
    .lean()
    .sort({ date: 'desc' })
    .then((records) => {
      records.map((record) => {
        // Set to first accepted language Locale
        record.date = new Date(record.date).toISOString().slice(0, 10);
      });
      res.render('index', { records, keyword });
    })
    .catch((error) => console.error(error));
});

// 匯出路由模組
module.exports = router;
