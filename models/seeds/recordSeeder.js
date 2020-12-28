const Category = require('../category');
const Record = require('../record');
const db = require('../../config/mongoose');

console.log('MongoDb Atlas [expense-tracker] cluster0 connected! @ recordSeeder');

const getCategoryCountPromise = [];
getCategoryCountPromise.push(
  Category.find().countDocuments()
    .then((count) => count),
);

Promise.all(getCategoryCountPromise).then((count) => {
  for (let i = 0; i < 10; i++) {
    const getRandomCategoryPromise = [];
    getRandomCategoryPromise.push(
      Category.findOne().skip(Math.floor(Math.random() * count))
        .lean()
        .then((randomCategory) => randomCategory),
    );
    Promise.all(getRandomCategoryPromise).then((randomCategory) => {
      const createRecordPromise = [];
      createRecordPromise.push(
        Record.create({
          name: `record-${i}`,
          category: randomCategory[0],
          amount: Math.floor(Math.random() * 1000) + 1,
        }),
      );
      Promise.all(createRecordPromise).then(() => {
        console.log('[expense-tracker] Record Seeder Done');
        db.close();
        process.exit();
      });
    });
  }
});
