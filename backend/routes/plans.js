const express = require('express');
const router = express.Router();
const planController = require('../controllers/planController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.post('/', auth, roleCheck(['trainer']), planController.createPlan);
router.put('/:planId', auth, roleCheck(['trainer']), planController.updatePlan);
router.delete('/:planId', auth, roleCheck(['trainer']), planController.deletePlan);
router.get('/', auth, planController.getAllPlans);
router.get('/my-plans', auth, roleCheck(['trainer']), planController.getTrainerPlans);
router.get('/:planId', auth, planController.getPlan);

module.exports = router;