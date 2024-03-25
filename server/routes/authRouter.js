const Router = require('express')
const authController = require("../controllers/authController")
const router = new Router

router.post('/signIn', authController.signIn)
router.post('/signUp', authController.signUp)
router.post('/logout', authController.logout)
router.post('/refresh', authController.refresh)
router.get('/testRequest', authController.testRequest)

module.exports = router