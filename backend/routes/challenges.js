import express from 'express';
import { protect } from '../middleware/auth.js';
import Challenge from '../models/Challenge.js';
import User from '../models/User.js';

const router = express.Router();

// Get daily challenge
router.get('/daily', protect, async (req, res) => {
  try {
    const challenges = await Challenge.aggregate([{ $sample: { size: 1 } }]);
    res.json(challenges[0]);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Complete challenge
router.post('/complete', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const challenge = await Challenge.findById(req.body.challengeId);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if user already completed challenge today
    const today = new Date().toDateString();
    const lastChallenge = user.lastChallengeDate?.toDateString();

    if (lastChallenge === today) {
      return res.status(400).json({ message: 'Challenge already completed today' });
    }

    // Update user stats
    user.ecoPoints += challenge.points;
    user.treesPlanted += 1;
    
    // Update streak
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    
    if (user.lastChallengeDate && user.lastChallengeDate.toDateString() === yesterday.toDateString()) {
      user.streak += 1;
    } else if (!user.lastChallengeDate || user.lastChallengeDate.toDateString() !== today) {
      user.streak = 1;
    }
    
    user.lastChallengeDate = new Date();
    await user.save();

    res.json({
      message: 'Challenge completed!',
      pointsEarned: challenge.points,
      totalPoints: user.ecoPoints,
      treesPlanted: user.treesPlanted,
      streak: user.streak
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get all challenges (for admin)
router.get('/', async (req, res) => {
  try {
    const challenges = await Challenge.find();
    res.json(challenges);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;