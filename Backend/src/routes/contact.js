const express = require('express');
const router = express.Router();

const contactController = require('../controllers/contact-controller');
const authMiddleware = require('../middleware/auth-middleware');

router.post('/addNewContact', authMiddleware, contactController.addNewContact);
router.get('/:id', authMiddleware, contactController.contactId);

module.exports = router;
