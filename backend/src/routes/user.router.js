const express = require('express');

const { userController } = require('../controllers');
const authMiddleware = require('../middlewares/auth.middleware');

const router = express.Router();

router.post('/', userController.createNewUser);

router.get('/me', authMiddleware, (req, res) => res.status(200).json(req.user));

module.exports = router;