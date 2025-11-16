import mongoose from 'mongoose';

const challengeSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  points: {
    type: Number,
    required: true,
    default: 10
  },
  category: {
    type: String,
    enum: ['transport', 'energy', 'food', 'waste', 'water', 'nature', 'home'],
    required: true
  },
  difficulty: {
    type: String,
    enum: ['easy', 'medium', 'hard'],
    default: 'easy'
  },
  estimatedCO2Reduction: {
    type: Number,
    default: 0
  }
}, {
  timestamps: true
});

export default mongoose.model('Challenge', challengeSchema);