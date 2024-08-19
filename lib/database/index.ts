import mongoose from "mongoose";

const MONGODB_URI =
  "mongodb+srv://kira7dn1:Setsuna0611@cluster0.gj5k7et.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0";

let cached = (global as any).mongoose || {
  conn: null,
  promise: null,
};

export const connectToDatabase = async () => {
  if (cached.conn) return cached.conn;

  if (!MONGODB_URI) throw new Error("MONGODB_URI is missing");

  cached.promise =
    cached.promise ||
    mongoose.connect(MONGODB_URI, {
      dbName: "human-resource",
      bufferCommands: false,
    });

  cached.conn = await cached.promise;

  return cached.conn;
};
