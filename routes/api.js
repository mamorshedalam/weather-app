const express = require('express');
const router = express.Router();
const { createHistory, getHistory, deleteHistory } = require('../controllers/historyController');

router.post('/', createHistory);
router.get('/', getHistory);
router.delete('/', deleteHistory);

module.exports = router