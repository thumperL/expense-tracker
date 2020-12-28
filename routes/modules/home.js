// 引用 Express 與 Express 路由器
const express = require('express');
const Category = require('../../models/category');
const Record = require('../../models/record');

const router = express.Router();

// 定義首頁路由
router.get('/', (req, res) => {
  const promise = [];
  promise.push(
    Category.find()
      .lean()
      .then((categoryList) => categoryList)
      .catch((error) => console.error(error)),
  );

  Promise.all(promise).then((categoryList) => {
    const [categories] = [...categoryList];
    Record.find()
      .lean()
      .then((records) => {
        records.map((record) => {
          const recordDate = new Date(record.date);
          record.date = recordDate.toLocaleDateString('en-CA');
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
