const express = require('express');
const passport = require('passport');
const User = require('../../models/user');

const router = express.Router();
// Login
router.get('/login', (req, res) => {
  res.render('login');
});
router.post('/login', (req, res, next) => {
  passport.authenticate('local', (err, user, msg) => {
    if (err) {
      return next(err);
    }
    // Auth Failed
    if (!user) {
      req.flash('warning_msg', msg.message);
      res.redirect('login');
    }
    req.login(user, (err) => {
      if (err) {
        return next(err);
      }
      return res.redirect('/');
    });
  })(req, res, next);
});

// Register
router.get('/register', (req, res) => {
  res.render('register');
});
router.post('/register', (req, res) => {
  const {
    name, email, password, confirmPassword,
  } = req.body;
  const errors = [];
  if (!name || !email || !password || !confirmPassword) {
    errors.push({ message: '所有欄位都是必填。' });
  }
  if (password !== confirmPassword) {
    errors.push({ message: '密碼與確認密碼不相符！' });
  }
  if (errors.length) {
    return res.render('register', {
      errors,
      name,
      email,
      password,
      confirmPassword,
    });
  }
  User.findOne({ email }).then((user) => {
    if (user) {
      errors.push({ message: '這個 Email 已經註冊過了。' });
      return res.render('register', {
        errors,
        name,
        email,
        password,
        confirmPassword,
      });
    }
    return User.create({
      name,
      email,
      password,
    })
      .then(() => res.redirect('/'))
      .catch((err) => console.log(err));
  });
});

// Logout
router.get('/logout', (req, res) => {
  req.logout();
  req.flash('success_msg', '你已經成功登出。');
  res.redirect('/users/login');
});
module.exports = router;
