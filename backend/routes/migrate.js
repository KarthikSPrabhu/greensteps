import express from 'express';
import User from '../models/User.js';

const router = express.Router();

// Temporary route to migrate existing users
router.get('/migrate-users', async (req, res) => {
  try {
    const users = await User.find({ completedChallenges: { $exists: false } });
    
    for (let user of users) {
      user.completedChallenges = [];
      await user.save();
    }
    
    res.json({ message: `Migrated ${users.length} users` });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

export default router;