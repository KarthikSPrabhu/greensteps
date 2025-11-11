import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const testConnection = async () => {
  try {
    console.log('Testing connection to:', process.env.MONGODB_URI.replace(/\/\/([^:]+):([^@]+)@/, '//***:***@'));
    
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('✅ SUCCESS: Connected to MongoDB Atlas!');
    
    await mongoose.connection.close();
    console.log('Connection closed.');
  } catch (error) {
    console.log('❌ ERROR:', error.message);
  }
};

testConnection();