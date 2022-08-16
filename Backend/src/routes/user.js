const express = require('express');
const router = express.Router();

const userController = require('../controllers/user-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.delete('/:email', authMiddleware, userController.deleteEmail);
router.put('/:email', authMiddleware, userController.modifyEmail);

module.exports = router;
