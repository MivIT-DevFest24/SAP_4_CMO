import mongoose from "mongoose";

const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.CONNECTION_URL, {
      // Set a timeout value in milliseconds (e.g., 30 seconds)
      connectTimeoutMS: 30000,
    });

    console.log(`MongoDB Connected to '${conn.connection.name}' database...`);
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

export default connectDB; // export the function
