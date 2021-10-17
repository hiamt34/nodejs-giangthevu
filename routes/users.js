const router = require('express').Router()
const userCtrl = require('../controllers/userController')

/* GET users listing. */
router.post('/register',userCtrl.register)
router.post('/login',userCtrl.login)
router.post('/confirm',userCtrl.verify)

// router.get('/infor',userCtrl.getInfor)
module.exports = router;
