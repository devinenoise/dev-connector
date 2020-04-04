const express = require('express')
const router = express.Router()
const gravatar = require('gravatar')
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const { check, validationResult } = require('express-validator')
const config = require('config')
const normalize = require('normalize')

const User = require('../../models/User')

//@route   POST api/users
//@desc    Register User
//@access  Public
router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email', 'Please include a valid email').isEmail(),
    check(
      'password',
      'Please enter a password with 6 or more characters'
    ).isLength({ min: 6 }),
  ],
  async (req, res) => {
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    const { name, email, password } = req.body

    try {
      let user = await User.findOne({ email })

      if (user) {
        return res
          .status(400)
          .json({ errors: [{ message: 'User already exists' }] })
      }

      const avatar = normalize(
        gravatar.url(email, {
          s: '200',
          r: 'pg',
          d: 'mm',
        }),
        { forceHttps: true }
      )
      user = new User({
        name,
        email,
        avatar,
        password,
      })

      // hash the password
      const salt = await bcrypt.genSalt(10)

      user.password = await bcrypt.hash(password, salt)

      // save user
      await user.save()

      const payload = {
        user: {
          id: user.id,
        },
      }

      // create token
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        // make 3600 for deployment
        { expiresIn: 360000 },
        (err, token) => {
          if (err) throw err
          res.json({ token })
        }
      )
    } catch (err) {
      console.error(err.message)
      res.status(500).send('Server Error')
    }
  }
)

module.exports = router
