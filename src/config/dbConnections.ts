import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

/**
 * Connects to the MongoDB database using the CONNECTION_STRING from environment variables.
 * Logs successful connection or exits with an error.
 */
const connectDb = async (): Promise<void> => {
    try {
        const connectionString = process.env.CONNECTION_STRING;
        if (!connectionString) 
            throw new Error("CONNECTION_STRING is not defined in the environment variables");

        const connect = await mongoose.connect(connectionString);
        console.log("Database Connected:", connect.connection.name);
    } catch (err) {
        console.error("Error connecting to the database:", err);
        process.exit(1);
    }
}

export default connectDb;
