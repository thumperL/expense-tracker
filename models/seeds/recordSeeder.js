const bcrypt = require('bcryptjs');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}
const Category = require('../category');
const Record = require('../record');
const User = require('../user');
const db = require('../../config/mongoose');

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

const getCategories = () => new Promise((resolve, reject) => {
  Category
    .find()
    .lean()
    .then((categories) => resolve(categories))
    .catch((error) => reject(`[Category Find Error]: ${error}`));
});

const createUser = (user) => new Promise((resolve, reject) => {
  bcrypt.genSalt(10)
    .then((salt) => bcrypt.hash(user.password, salt))
    .then((hash) => User.create({
      name: user.name,
      email: user.email,
      password: hash,
    }))
    .then((userCreated) => resolve(userCreated))
    .catch((error) => reject(`[User Create Error]: ${error}`));
});

async function start() {
  try {
    const categories = await getCategories();

    const createRecord = () => new Promise((resolve, reject) => {
      seedUsers.forEach((eaSeedUser, index) => {
        createUser(eaSeedUser)
          .then((user) => {
            const userId = user._id;
            return Promise.all(
              Array.from(
                { length: 5 },
                (_, i) => Record.create(
                  {
                    name: `record-${i}`,
                    merchant: `merchant-${i}`,
                    category: categories[Math.floor(Math.random() * (categories.length - 1))]._id,
                    amount: Math.floor(Math.random() * 1000) + 1,
                    userId,
                  },
                ),
              ),
            );
          })
          .then(() => {
            if (index === seedUsers.length - 1) resolve();
          });
      });
    });
    createRecord().then(() => {
      console.log('Seeder Import Completed.');
      process.exit();
    });
  } catch (e) {
    console.warn(e);
  }
}

start();
