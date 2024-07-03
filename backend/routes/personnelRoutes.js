const express = require('express');
const router = express.Router();
const personnelController = require('../controllers/personnelController');

// GET all personnel
router.get('/', personnelController.getAll);

// POST create new personnel
router.post('/', personnelController.create);

// GET columns
router.get('/columns', personnelController.getColumns);

// POST add column
router.post('/add-column', personnelController.addColumn);

// GET personnel details by ID
router.get('/personnelDetails/:id', personnelController.getById);

// GET personnel by ID (alternative route)
router.get('/:id', personnelController.getById);

// GET personnel by service number
router.get('/serviceNumber/:service_number', personnelController.getByServiceNumber);

module.exports = router;
