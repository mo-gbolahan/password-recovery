const express = require('express');
const router = express.Router();

router.use('/', require('./default'))
router.use('/password', require('./password'))

module.exports = router;