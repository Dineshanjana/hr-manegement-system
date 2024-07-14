//backend\routes\AdditionalColumns.js
const express = require('express');
const router = express.Router();

const AddColumnsController  = require('../controllers/AdditionalColumnsController');
const { route } = require('./personnelRoutes');

router.post('/add',AddColumnsController.insertColumns);
router.post('/wife',AddColumnsController.insertwifeColumns);
router.post('/child',AddColumnsController.insertchildColumns);

module.exports = router;