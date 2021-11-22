const Router = require('express');
const router = new Router();
const authMiddleWare = require('../middleware/auth.middleware');
const fileController = require('../controllers/fileController');

router.post('', authMiddleWare, fileController.createDir);
router.post('/upload', authMiddleWare, fileController.uploadFile);
router.get('', authMiddleWare, fileController.getFiles);
router.get('/download', authMiddleWare, fileController.downloadFile);

module.exports = router