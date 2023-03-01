import mongoose from "mongoose";

const connectDB = async (url: string) => {
    try {
        await mongoose.connect(url);
        console.log("Successfully connected to mongo database");
    } catch (error) {
        console.error(error);
    }
}

export default connectDB;