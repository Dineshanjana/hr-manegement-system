//backend\routes\AdditionalColumns.js
const express = require('express');
const router = express.Router();

const AddColumnsController  = require('../controllers/AdditionalColumnsController');
const { route } = require('./personnelRoutes');

router.post('/add',AddColumnsController.insertColumns);
router.post('/wife',AddColumnsController.insertwifeColumns);
router.post('/child',AddColumnsController.insertchildColumns);
router.post('/insert',AddColumnsController.insertData);
router.post('/insertwife',AddColumnsController.insertwifeData);
router.post('/insertchild',AddColumnsController.insertchildData);

module.exports = router;