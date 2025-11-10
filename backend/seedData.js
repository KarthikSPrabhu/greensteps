import mongoose from 'mongoose';
import Challenge from './models/Challenge.js';
import dotenv from 'dotenv';

dotenv.config();

const challenges = [
  {
    title: "Short Shower",
    description: "Take a 5-minute shower instead of a long one to save water",
    points: 15,
    category: "water",
    difficulty: "easy"
  },
  {
    title: "Public Transport",
    description: "Use public transportation or carpool instead of driving alone",
    points: 20,
    category: "transport",
    difficulty: "medium"
  },
  {
    title: "Meat-Free Meal",
    description: "Have a vegetarian or vegan meal today",
    points: 25,
    category: "food",
    difficulty: "easy"
  },
  {
    title: "Lights Off",
    description: "Turn off lights in rooms you're not using",
    points: 10,
    category: "energy",
    difficulty: "easy"
  },
  {
    title: "Reusable Bottle",
    description: "Use a reusable water bottle instead of buying plastic",
    points: 15,
    category: "waste",
    difficulty: "easy"
  },
  {
    title: "Local Produce",
    description: "Buy locally grown fruits or vegetables",
    points: 20,
    category: "food",
    difficulty: "medium"
  },
  {
    title: "Digital Documents",
    description: "Go paperless - read documents digitally instead of printing",
    points: 10,
    category: "waste",
    difficulty: "easy"
  },
  {
    title: "Walk or Bike",
    description: "Walk or bike for a short trip instead of driving",
    points: 15,
    category: "transport",
    difficulty: "easy"
  }
];

const seedData = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Connected to database');

    // Clear existing challenges
    await Challenge.deleteMany({});
    console.log('Cleared existing challenges');

    // Insert new challenges
    await Challenge.insertMany(challenges);
    console.log('Added sample challenges');

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();