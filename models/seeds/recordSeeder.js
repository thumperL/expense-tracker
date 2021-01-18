const bcrypt = require('bcryptjs');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const Category = require('../category');
const Record = require('../record');
const User = require('../user');
const db = require('../../config/mongoose');

console.log('MongoDb Atlas [expense-tracker] cluster0 connected! @ recordSeeder');

const seedUsers = [
  {
    name: 'Sample User 1',
    email: 'user1@example.com',
    password: '12345678',
  },
  {
    name: 'Sample User 2',
    email: 'user2@example.com',
    password: '12345678',
  },
];

const categoriesCreated = [];
let userCreateCount = 0;
const promise = new Promise((resolve, reject) => {
  seedUsers.forEach((eaSeedUser, index) => {
    Category.find()
      .lean()
      .then((categories) => categoriesCreated.push(...categories))
      .then(() => bcrypt.genSalt(10))
      .then((salt) => bcrypt.hash(eaSeedUser.password, salt))
      .then((hash) => User.create({
        name: eaSeedUser.name,
        email: eaSeedUser.email,
        password: hash,
      }))
      .then((user) => {
        const userId = user._id;
        return Promise.all(
          Array.from(
            { length: 5 },
            (_, i) => Record.create(
              {
                name: `record-${i}`,
                merchant: `merchant-${i}`,
                category: categoriesCreated[Math.floor(Math.random() * (categoriesCreated.length - 1))]._id,
                amount: Math.floor(Math.random() * 1000) + 1,
                userId,
              },
            ),
          ),
        );
      })
      .then(() => {
        userCreateCount += 1;
        if (userCreateCount === seedUsers.length) {
          resolve();
        }
      });
  });
});
promise.then(() => {
  console.log('Seeder Import Completed.');
  process.exit();
});
