const express = require('express');
const router = express.Router();
const leaderController = require('../leader/controller/leader.controller.js');
const auth = require('../middlewares/auth.middlewares');
const upload = require('../config/multer');

router.post(
  '/',
  auth, // <<< INI YANG BIKIN req.user ADA
  upload.fields([
    { name: 'cv', maxCount: 1 },
    { name: 'flazz', maxCount: 1 },
    { name: 'idCard', maxCount: 1 },
  ]),
  leaderController.createLeader
);

module.exports = router;
