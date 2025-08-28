const express = require('express');
const router = express.Router();
const dashboardController = require('../controllers/dashboardController');
const { checkToken, checkAdmin } = require('../middleware/authMiddleware');

router.get('/dashboard', checkToken, checkAdmin, dashboardController.getDashboard);

module.exports = router;
