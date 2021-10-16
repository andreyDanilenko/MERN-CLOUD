const Router = require('express')
const router = new Router()
const authMiddleWare = require('../middleware/auth.middleware')
const fileController = require('../controllers/fileController')

router.post('', authMiddleWare, fileController.createDir)
router.get('', authMiddleWare, fileController.getFiles)

module.exports = router