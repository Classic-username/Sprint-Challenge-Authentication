const express = require('express')
const db = require('./auth-helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

const router = require('express').Router();

router.post('/register', (req, res) => {
  const user = req.body

  const hash

});

router.post('/login', (req, res) => {
  // implement login
});

module.exports = router;
