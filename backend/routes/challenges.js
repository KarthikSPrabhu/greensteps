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
// Complete challenge
router.post('/complete', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const challenge = await Challenge.findById(req.body.challengeId);

    if (!challenge) {
      return res.status(404).json({ message: 'Challenge not found' });
    }

    // Check if user already completed THIS SPECIFIC challenge today
    const today = new Date().toDateString();
    const challengeCompletion = user.completedChallenges?.find(
      comp => comp.challengeId.toString() === challenge._id.toString() && 
      comp.completedAt.toDateString() === today
    );

    if (challengeCompletion) {
      return res.status(400).json({ message: 'Challenge already completed today' });
    }

    // Update user stats
    user.ecoPoints += challenge.points;
    user.treesPlanted += 1;
    
    // Add to completed challenges
    if (!user.completedChallenges) {
      user.completedChallenges = [];
    }
    
    user.completedChallenges.push({
      challengeId: challenge._id,
      completedAt: new Date(),
      pointsEarned: challenge.points
    });

    // Update streak (check if user completed any challenge today)
    const todayCompleted = user.completedChallenges.some(
      comp => comp.completedAt.toDateString() === today
    );

    if (todayCompleted) {
      const yesterday = new Date();
      yesterday.setDate(yesterday.getDate() - 1);
      
      const yesterdayCompleted = user.completedChallenges.some(
        comp => comp.completedAt.toDateString() === yesterday.toDateString()
      );

      if (yesterdayCompleted) {
        user.streak += 1;
      } else if (user.streak === 0) {
        user.streak = 1;
      }
    }

    await user.save();

    res.json({
  message: 'Challenge completed!',
  pointsEarned: challenge.points,
  totalPoints: user.ecoPoints,
  treesPlanted: user.treesPlanted,
  streak: user.streak,
  challengesCompletedToday: user.completedChallenges.filter(
    comp => comp.completedAt.toDateString() === today
  ).length
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

// Get multiple daily challenges (5 random challenges instead of 3)
// Get daily challenges - static completed + dynamic remaining
router.get('/daily-multiple', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id);
    const today = new Date().toDateString();
    
    // Get today's completed challenges
    const todayCompleted = user.completedChallenges?.filter(
      comp => comp.completedAt.toDateString() === today
    ) || [];

    // Get completed challenge IDs
    const completedChallengeIds = todayCompleted.map(comp => comp.challengeId);

    // Get 5 random challenges excluding completed ones
    let remainingChallenges = await Challenge.aggregate([
      { $match: { _id: { $nin: completedChallengeIds } } },
      { $sample: { size: 5 } }
    ]);

    // If we don't have enough remaining challenges, get some anyway
    if (remainingChallenges.length < 5) {
      const extraChallenges = await Challenge.aggregate([
        { $match: { _id: { $nin: completedChallengeIds } } },
        { $sample: { size: 5 - remainingChallenges.length } }
      ]);
      remainingChallenges = [...remainingChallenges, ...extraChallenges];
    }

    // Get completed challenges data
    const completedChallengesData = await Challenge.find({
      _id: { $in: completedChallengeIds }
    });

    // Add completion info to completed challenges
    const completedWithInfo = completedChallengesData.map(challenge => ({
      ...challenge.toObject(),
      completed: true,
      completedAt: todayCompleted.find(comp => 
        comp.challengeId.toString() === challenge._id.toString()
      )?.completedAt
    }));

    // Mark remaining as not completed
    const remainingWithInfo = remainingChallenges.map(challenge => ({
      ...challenge,
      completed: false
    }));

    res.json({
      completed: completedWithInfo,
      remaining: remainingWithInfo,
      progress: {
        completed: completedWithInfo.length,
        total: completedWithInfo.length + remainingWithInfo.length
      }
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Get user's today's completed challenges
router.get('/completed-today', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user._id).populate('completedChallenges.challengeId');
    const today = new Date().toDateString();
    
    const todayCompleted = user.completedChallenges.filter(
      comp => comp.completedAt.toDateString() === today
    );

    res.json(todayCompleted);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;