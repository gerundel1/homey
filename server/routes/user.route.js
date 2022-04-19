const express = require('express');
const { createUser, loginUser, getUserEmail } = require('../controllers/user');
const auth = require('../helpers/auth');
const router = express.Router();

router.post(
  '/users/create',
  createUser
);

router.post(
  '/users/login',
  loginUser
);

router.get(
  '/user/:id',
  getUserEmail
)

module.exports = router;