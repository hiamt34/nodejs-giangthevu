var express = require('express');
const { hotelController } = require('../controllers');
var router = express.Router();

router.get('/', hotelController.index);

router.get('/:id', hotelController.show);

router.post('/search', hotelController.search);

module.exports = router;
