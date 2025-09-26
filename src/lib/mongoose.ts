import mongoose from "mongoose";
import type { ConnectOptions } from "mongoose";

import config from "@/config";

const clientOptions: ConnectOptions = {
  dbName: "API-mastery",
  appName: "API-mastery",
  serverApi: {
    version: "1",
    strict: true,
    deprecationErrors: true,
  },
};

export const connectToDatabase = async (): Promise<void> => {
  if (!config.MONGO_URI) {
    throw new Error("MongoDB URI is not defined in the configuration.");
  }

  try {
    const conn = await mongoose.connect(config.MONGO_URI, clientOptions);

    console.log(`MongoDB connected: ${conn.connection.host}`);
  } catch (error) {
    if (error instanceof Error) {
      throw error;
    }
    console.error("MongoDB connection failed:", error);
    process.exit(1);
  }
};

export const disconnectFromDatabase = async (): Promise<void> => {
  try {
    await mongoose.disconnect();
    console.log("Disconnect from the database successfully.", {
      uri: config.MONGO_URI,
      options: clientOptions,
    });
  } catch (error) {
    if (error instanceof Error) {
      throw new Error(error.message);
    }
    console.error("Error disconnecting from the database:", error);
    process.exit(1);
  }
};
