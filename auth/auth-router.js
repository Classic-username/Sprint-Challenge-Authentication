const express = require('express')
const db = require('./auth-helpers')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const secrets = require('../config/secrets.js')

const router = require('express').Router();

router.post('/register', (req, res) => {
  const user = req.body

  const hash = bcrypt.hashSync(user.password, 10);
  user.password = hash

  db.addUser(user)
    .then(id => {
      res.status(201).json(id)
    })
    .catch(err => {
      res.status(500).json({
        message: 'error adding user to database',
        err
      })
    })

});

router.post('/login', (req, res) => {
  const { username, password } = req.body

  db.getUsersBy({username})
    .then(user => {
      if(user && bcrypt.compareSync(password, user.password)) {

        let token = genToken(user)
        res.status(200).json({ message: `Welcome ${user.username}!`, token})
      } else {
        res.status(401).json({ message: 'Invalid credentials'})
      }
    })
    .catch(err => {
      res.status(500).json({ message: 'Error finding user in the database'})
    })
});



// oops. wrote a delete. it works :shrug:
// router.delete('/users/:id', (req, res) => {
//   const id = req.params.id
//   console.log(id)
//   db.delUser(id)
//     .then(() => {
//       res.status(204).end()
//     })
//     .catch(err => {
//       res.status(500).json({ message: 'error deleting user', err})
//     })
// })

function genToken(user) {
  const payload = {
    id: user.id,
    username: user.username
  }

  const options = {
    expiresIn: '1h'
  }

  return jwt.sign(payload, secrets.jwtSecret, options)
}

module.exports = router;
