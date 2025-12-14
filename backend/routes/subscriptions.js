const express = require('express');
const router = express.Router();
const subscriptionController = require('../controllers/subscriptionController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/:planId', auth, roleCheck(['user']), subscriptionController.subscribeToPlan);
router.get('/', auth, roleCheck(['user']), subscriptionController.getUserSubscriptions);
router.put('/:subscriptionId/cancel', auth, roleCheck(['user']), subscriptionController.cancelSubscription);

module.exports = router;