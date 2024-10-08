const router = require('express').Router()

//services router
const servicesRouter = require('./services')

router.use("/", servicesRouter)

//parties routes
const partiesRouter = require('./parties')

router.use("/", partiesRouter);

module.exports = router;