// 引用 Express 與 Express 路由器
const express = require('express');
const Category = require('../../models/category');
const Record = require('../../models/record');

const router = express.Router();

// 定義首頁路由
router.get('/', (req, res) => {
  const category = (req.query.recordFilterCategory === undefined) ? {} : { category: req.query.recordFilterCategory };

  const promise = [];
  promise.push(
    Category.find()
      .lean()
      .then((categoryList) => categoryList)
      .catch((error) => console.error(error)),
  );

  Promise.all(promise).then((categoryList) => {
    const [categories] = [...categoryList];
    return Record.find(category)
      .lean()
      .sort({ date: 'desc' })
      .then((records) => {
        let totalAmount = 0;
        records.map((record) => {
          // Set to first accepted language Locale
          record.date = new Date(record.date).toISOString().slice(0, 10);
          // Get sum
          totalAmount += parseFloat(record.amount);
        });

        res.render('index', {
          categories, records, totalAmount,
        });
      })
      .catch((error) => console.error(error));
  });
});
// 匯出路由模組
module.exports = router;
