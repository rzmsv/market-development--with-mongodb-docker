const router = require("express").Router()
const controllerAdmin = require('../../controllers/admin')
const {isNotAuth,adminPage} = require("../../middlewares/auth")


router.get("/",isNotAuth,adminPage,controllerAdmin.adminGetProducts)

router.get("/add-product",isNotAuth,adminPage,controllerAdmin.GetaddProduct)
router.post("/add-product",controllerAdmin.PostaddProduct)

router.get("/edit/:id",isNotAuth,adminPage,controllerAdmin.adminGetEditProduct)
router.post("/edit",controllerAdmin.adminPostEditProduct)

module.exports = router