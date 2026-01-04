const express = require('express');
const router = express.Router();
const teamController = require('../team/controller/team.controller');

router.post('/register', teamController.registerTeam);
router.post('/login', teamController.loginTeam);

module.exports = router;

