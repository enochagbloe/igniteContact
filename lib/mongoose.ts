import mongoose, { Mongoose } from 'mongoose';

//define the connection string
const MONGODB_URI = process.env.MONGODB_URI as string;
// Check if the environment variable is set

if (!MONGODB_URI) {
  throw new Error('Please define the MONGODB_URI environment variable inside .env.local');
}
//cache the mongoose instance
interface MongooseCache {
    conn: mongoose.Connection | null;
    promise: Promise<Mongoose> | null;
}
// Global cache for mongos connection
declare global {
    // eslint-disable-next-line no-var
    var mongooseCache: MongooseCache;
}
// Ensure the Global variable is defined
let cache = global.mongooseCache;

//check if the cache exists,
if (!cache) {
  cache = global.mongooseCache = { conn: null, promise: null };
}

// Function to connect to thr MongoDB database
const dbConnect = async (): Promise<Mongoose> => {
    if (!cache.conn) {
        cache.promise = mongoose.connect(MONGODB_URI, {
            dbName: 'c3 ignite community',
        })
        .then((result: Mongoose) => {
            console.log('MongoDB connected successfully');
            cache.conn = mongoose.connection;
            return result;
        })
        .catch((error) => {
            console.error('MongoDB connection error:', error);
            throw new Error('Failed to connect to MongoDB');
        });
    }
    if (!cache.promise) {
        throw new Error('Failed to create a connection promise');
    }
    return cache.promise;
}
export default dbConnect;