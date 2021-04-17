const router = require("express").Router()
const controllerUser = require('../../controllers/user')

router.get("/detail/:id",controllerUser.getDetails)

module.exports = router