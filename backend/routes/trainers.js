const express = require('express');
const router = express.Router();
const trainerController = require('../controllers/trainerController');
const auth = require('../middleware/auth');
const roleCheck = require('../middleware/roleCheck');

router.get('/', auth, trainerController.getAllTrainers);
router.get('/feed', auth, roleCheck(['user']), trainerController.getPersonalizedFeed);
router.get('/following', auth, roleCheck(['user']), trainerController.getFollowedTrainers);
router.get('/:trainerId', auth, trainerController.getTrainerProfile);
router.post('/:trainerId/follow', auth, roleCheck(['user']), trainerController.followTrainer);

module.exports = router;