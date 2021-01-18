// 引用 Express 與 Express 路由器
const express = require('express');
const Category = require('../../models/category');
const Record = require('../../models/record');

const router = express.Router();

// 定義首頁路由
router.get('/', (req, res) => {
  // Construct Filter Query
  const searchQuery = {};
  if (req.query.recordFilterCategory !== undefined) {
    Object.assign(searchQuery, { category: req.query.recordFilterCategory });
  }
  if (req.query.recordFilterMonth !== undefined) {
    const gte = `${req.query.recordFilterMonth.split('-')[0]}-${req.query.recordFilterMonth.split('-')[1]}-1`;
    const lte = `${req.query.recordFilterMonth.split('-')[0]}-${req.query.recordFilterMonth.split('-')[1]}-31`;
    Object.assign(searchQuery, { date: { $gte: gte, $lte: lte } });
  }

  // Construct search query
  const { keyword } = req.query;
  if (keyword !== undefined) {
    const regex = new RegExp(keyword, 'i'); // Have to use RegExp builder to build the if contains string filtering

    Object.assign(searchQuery, {
      $or: [
        { name: { $regex: regex } },
        { merchant: { $regex: regex } },
        { amount: { $regex: regex } },
      ],
    });
  }

  const promise = [];
  promise.push(
    Category.find()
      .lean()
      .then((categoryList) => categoryList)
      .catch((error) => console.error(error)),
    Record.find()
      .lean()
      .then((records) => {
        const monthList = [...new Set(records.map((record) => (`${String(record.date.getFullYear())}-${String(record.date.getMonth() + 1)}`)))];
        return monthList;
      })
      .catch((error) => console.error(error)),
  );

  Promise.all(promise).then((filterList) => {
    const categoryList = filterList[0];
    const months = filterList[1];
    const categories = [...categoryList];

    return Record.find(searchQuery)
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
          categories, months, records, keyword, totalAmount,
        });
      })
      .catch((error) => console.error(error));
  });
});
// 匯出路由模組
module.exports = router;
