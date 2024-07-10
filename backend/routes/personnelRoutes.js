const express = require('express');
const router = express.Router();
const personnelController = require('../controllers/personnelController');

router.get('/', personnelController.getPersonnel);

router.get('/getwife/:serviceNumber', personnelController.getWife);

router.get('/getchild/:serviceNumber', personnelController.getChild);

router.get('/columns', personnelController.getColumn);

router.get('/Details/:serviceNumber', personnelController.getDetails);

router.get('/columnswife', personnelController.getColumnWife);

router.get('/columnschild', personnelController.getColumnChild);
router.post('/', personnelController.insertPersonnel);
router.post('/wife', personnelController.insertWife);
router.post('/child', personnelController.insertChild);

module.exports = router;
