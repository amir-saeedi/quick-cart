import mongoose from "mongoose";

let cached = global.mongoose

if (!cached) {
    cached = global.mongoose = { conn: null, promise: null }
}

async function connectDB() {
    if (cached.conn) {
        console.log("📦 Using existing MongoDB connection");
        return cached.conn
    }

    if (!cached.promise) {
        console.log("🔌 Creating new MongoDB connection...");
        const opts = {
            bufferCommands: false
        }
        cached.promise = mongoose.connect(`${process.env.MONGODB_URI}/quickcard`, opts).then(mongoose => {
            return mongoose
        })
    }
    try {
        cached.conn = await cached.promise;
        console.log("✅ MongoDB connected:", cached.conn.connection.name);
        return cached.conn;
    } catch (e) {
        cached.promise = null; // reset if failed
        console.error("❌ MongoDB connection failed:", e.message);
        throw e;
    }
}
export default connectDB

