// config/db.js
import mongoose from 'mongoose';

// Cache the connection
let cachedDb = null;

export const connectDB = async () => {
    // If a connection is already established, reuse it
    if (cachedDb) {
        console.log('✅ Using cached MongoDB connection');
        return;
    }

    // If no MONGO_URI, log a warning and return
    if (!process.env.MONGO_URI) {
        console.warn('⚠️ MONGO_URI environment variable not set. Database features will be unavailable.');
        return;
    }

    try {
        console.log('🔄 Attempting to connect to MongoDB...');
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 5000, // Timeout after 5s
        });
        cachedDb = conn.connection.host;
        console.log(`✅ MongoDB connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('❌ MongoDB connection error:', error.message);
        console.warn('⚠️ Server will continue running without database. Some features may not work.');
        // Do not exit the process, allow the server to run without the DB
    }
};