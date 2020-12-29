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
        records.map((record) => {
          const recordDate = new Date(record.date);
          // Set to first accepted language Locale
          record.date = recordDate.toLocaleDateString(req.headers['accept-language'].split(';')[0].split(',')[0]);
        });
        res.render('index', {
          categories, records,
        });
      })
      .catch((error) => console.error(error));
  });
});
// 匯出路由模組
module.exports = router;
