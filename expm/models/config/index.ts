import mongoose, { Schema, Document, Model } from 'mongoose';

// Connection
const connectDB = async () => {
  try {
    await mongoose.connect('mongodb://localhost:27017/myapp');
    console.log('MongoDB connected successfully');
  } catch (error) {
    console.error('MongoDB connection error:', error);
    process.exit(1);
  }
};

export default connectDB;