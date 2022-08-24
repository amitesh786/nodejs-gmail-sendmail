// module.exports = appRouter;
const express = require('express');
const router = express.Router();

const routeController = require('../controllers/routes-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.get('/all', routeController.getAllUser);
router.get('/emails', routeController.getAllEmails);
router.get('/names', routeController.getAllNames);
router.post('/createDB', routeController.postDB);
router.delete('/db/:dbName', routeController.deleteDBName);
router.post('/sendMail', authMiddleware, routeController.sendMails);

module.exports = router;
