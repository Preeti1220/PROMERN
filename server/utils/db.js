import mongoose from "mongoose";

const URI = process.env.MONGODB_URI;
mongoose.connect(URI)

const connectDB = async () => {
    try {
        await mongoose.connect(URI)
        console.log('connection successfull to database')
    }
    catch (error) {
        console.log('database connection failed')
        process.exit(0)
    }
}

export default connectDB;