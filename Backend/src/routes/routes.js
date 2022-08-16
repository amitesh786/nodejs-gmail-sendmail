// module.exports = appRouter;
const express = require('express');
const router = express.Router();

const routeController = require('../controllers/routes-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.get('/signUp', authMiddleware, routeController.getAllUser);
router.get('/emails', authMiddleware, routeController.getAllEmails);
router.get('/names', authMiddleware, routeController.getAllNames);
router.post('/createDB', authMiddleware, routeController.postDB);
router.delete('/db/:dbName', authMiddleware, routeController.deleteDBName);
router.post('/sendMail', authMiddleware, routeController.sendMails);

module.exports = router;
