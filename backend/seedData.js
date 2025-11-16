import mongoose from 'mongoose';
import Challenge from './models/Challenge.js';
import dotenv from 'dotenv';

dotenv.config();

const challenges = [
  // Transportation (5)
  {
    title: "Bike to Work",
    description: "Use a bicycle instead of motorized transport for your commute",
    points: 25,
    category: "transport",
    difficulty: "medium"
  },
  {
    title: "Public Transport Day",
    description: "Use only public transportation for all your travels today",
    points: 30,
    category: "transport",
    difficulty: "hard"
  },
  {
    title: "Carpool Champion",
    description: "Share a ride with friends or colleagues instead of driving alone",
    points: 20,
    category: "transport",
    difficulty: "easy"
  },
  {
    title: "Walk Short Distance",
    description: "Walk for any trip under 1 km instead of using vehicles",
    points: 15,
    category: "transport",
    difficulty: "easy"
  },
  {
    title: "Electric Vehicle",
    description: "Use an electric vehicle or hybrid car for your travels",
    points: 35,
    category: "transport",
    difficulty: "hard"
  },

  // Energy (5)
  {
    title: "Unplug Electronics",
    description: "Unplug all unused electronics and chargers",
    points: 15,
    category: "energy",
    difficulty: "easy"
  },
  {
    title: "Natural Light",
    description: "Use natural daylight instead of electric lights during daytime",
    points: 10,
    category: "energy",
    difficulty: "easy"
  },
  {
    title: "AC Temperature",
    description: "Set AC temperature 2 degrees higher in summer or lower in winter",
    points: 20,
    category: "energy",
    difficulty: "medium"
  },
  {
    title: "Energy Efficient Appliance",
    description: "Use your most energy-efficient appliance for a task",
    points: 25,
    category: "energy",
    difficulty: "medium"
  },
  {
    title: "Solar Power",
    description: "Use solar-powered device or charger",
    points: 30,
    category: "energy",
    difficulty: "hard"
  },

  // Food (5)
  {
    title: "Plant-Based Day",
    description: "Eat only plant-based meals for the entire day",
    points: 30,
    category: "food",
    difficulty: "medium"
  },
  {
    title: "Local Produce",
    description: "Cook a meal using only locally sourced ingredients",
    points: 25,
    category: "food",
    difficulty: "medium"
  },
  {
    title: "Zero Food Waste",
    description: "Don't waste any food - plan meals and use leftovers",
    points: 20,
    category: "food",
    difficulty: "medium"
  },
  {
    title: "Seasonal Fruits",
    description: "Eat only seasonal fruits and vegetables today",
    points: 15,
    category: "food",
    difficulty: "easy"
  },
  {
    title: "Bulk Shopping",
    description: "Buy groceries from bulk bins to reduce packaging",
    points: 20,
    category: "food",
    difficulty: "medium"
  },

  // Waste (5)
  {
    title: "Reusable Bag",
    description: "Use reusable bags for all your shopping",
    points: 15,
    category: "waste",
    difficulty: "easy"
  },
  {
    title: "No Single-Use Plastic",
    description: "Avoid all single-use plastics for the entire day",
    points: 25,
    category: "waste",
    difficulty: "hard"
  },
  {
    title: "Compost Food Scraps",
    description: "Compost your food waste instead of throwing away",
    points: 20,
    category: "waste",
    difficulty: "medium"
  },
  {
    title: "Repair Instead of Replace",
    description: "Repair a broken item instead of buying new",
    points: 30,
    category: "waste",
    difficulty: "hard"
  },
  {
    title: "Digital Documents",
    description: "Go paperless - read documents digitally instead of printing",
    points: 10,
    category: "waste",
    difficulty: "easy"
  },

  // Water (5)
  {
    title: "5-Minute Shower",
    description: "Take a shower in 5 minutes or less",
    points: 20,
    category: "water",
    difficulty: "medium"
  },
  {
    title: "Fix Leaks",
    description: "Identify and fix any water leaks in your home",
    points: 25,
    category: "water",
    difficulty: "hard"
  },
  {
    title: "Water Plants Efficiently",
    description: "Water plants in the early morning or late evening",
    points: 15,
    category: "water",
    difficulty: "easy"
  },
  {
    title: "Collect Rainwater",
    description: "Set up a system to collect and use rainwater",
    points: 35,
    category: "water",
    difficulty: "hard"
  },
  {
    title: "Full Loads Only",
    description: "Run dishwasher and washing machine only with full loads",
    points: 15,
    category: "water",
    difficulty: "easy"
  },

  // Nature (5)
  {
    title: "Plant a Tree",
    description: "Plant a tree in your garden or community space",
    points: 50,
    category: "nature",
    difficulty: "hard"
  },
  {
    title: "Community Cleanup",
    description: "Participate in or organize a local area cleanup",
    points: 40,
    category: "nature",
    difficulty: "hard"
  },
  {
    title: "Grow Herbs",
    description: "Start growing your own herbs or vegetables",
    points: 30,
    category: "nature",
    difficulty: "medium"
  },
  {
    title: "Bird Feeder",
    description: "Set up a bird feeder to support local wildlife",
    points: 20,
    category: "nature",
    difficulty: "easy"
  },
  {
    title: "Nature Walk",
    description: "Take a walk in nature and appreciate the environment",
    points: 15,
    category: "nature",
    difficulty: "easy"
  },

  // Home (5)
  {
    title: "LED Bulbs",
    description: "Replace incandescent bulbs with LED lights",
    points: 25,
    category: "home",
    difficulty: "medium"
  },
  {
    title: "Clothesline",
    description: "Dry clothes on a line instead of using dryer",
    points: 20,
    category: "home",
    difficulty: "easy"
  },
  {
    title: "Eco-friendly Cleaners",
    description: "Use natural or eco-friendly cleaning products",
    points: 15,
    category: "home",
    difficulty: "easy"
  },
  {
    title: "Smart Thermostat",
    description: "Use programmable thermostat to optimize energy use",
    points: 30,
    category: "home",
    difficulty: "medium"
  },
  {
    title: "Insulate Home",
    description: "Improve home insulation to reduce energy consumption",
    points: 40,
    category: "home",
    difficulty: "hard"
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
    console.log(`Added ${challenges.length} challenges to database`);

    // Show challenge count by category
    const categoryCount = await Challenge.aggregate([
      { $group: { _id: '$category', count: { $count: {} } } }
    ]);
    
    console.log('\nChallenges by category:');
    categoryCount.forEach(cat => {
      console.log(`- ${cat._id}: ${cat.count} challenges`);
    });

    process.exit(0);
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedData();