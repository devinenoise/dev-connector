const express = require('express');
const router = express.Router();
const Profile = require('../../models/Profile');

//@route   GET api/profile
//@desc    Test route
//@access  Public
router.get('/', (req, res) => res.send('Profile route'));

module.exports = router;
