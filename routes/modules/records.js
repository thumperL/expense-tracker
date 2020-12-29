// 引用 Express 與 Express 路由器
const express = require('express');

const router = express.Router();

// 引用 model 與 validator middleware
const Category = require('../../models/category');
const Record = require('../../models/record');

// UPDATE operation
router.get('/:recordId/edit', (req, res) => {
  const { recordId } = req.params;
  const promise = [];

  promise.push(
    Record.findById(recordId)
      .lean()
      .then((records) => {
        const recordDate = new Date(records.date);
        records.date = recordDate.toLocaleDateString('en-CA');
        return records;
      })
      .catch((error) => console.log(error)),
  );

  Promise.all(promise).then((records) => {
    const recordData = { ...records }[0];
    Category.find()
      .lean()
      .then((categoryData) => res.render('recordForm', { recordData, categoryData }))
      .catch((error) => console.log(error));
  });
});
router.put('/:recordId', (req, res) => {
  const { recordId } = req.params;
  const { name } = req.body;
  const { date } = req.body;
  const { amount } = req.body;
  const { category } = req.body;

  return Record.findById(recordId)
    .then((record) => {
      record.name = name;
      record.date = date;
      record.amount = amount;
      record.category = category;

      return record.save();
    })
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

// DELETE operation
router.delete('/:recordId', (req, res) => {
  const { recordId } = req.params;
  return Record.findById(recordId)
    .then((records) => records.remove())
    .then(() => res.redirect('/'))
    .catch((error) => console.log(error));
});

// 匯出路由模組
module.exports = router;
