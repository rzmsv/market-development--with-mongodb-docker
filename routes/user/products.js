const router = require("express").Router()
const controllerUser = require('../../controllers/user')
const {isAuth,isNotAuth,userPage} = require("../../middlewares/auth")
// const controllerPostShop = require("../../controllers/user")

router.get("/cart",isNotAuth,userPage,controllerUser.getCartPage)
router.post("/cart",controllerUser.postDeleteCartPage)

router.get("/signup",isAuth,controllerUser.getSignup)
router.post("/signup",controllerUser.postSignup)

router.get("/login",isAuth,controllerUser.getLogin)
router.post("/login",controllerUser.postLogin)

router.post("/logout",controllerUser.logout)

router.get("/user",isNotAuth,userPage,controllerUser.getUserPage)

router.get("/",controllerUser.getAllProducts)
router.post("/",controllerUser.addToCard)

module.exports = router