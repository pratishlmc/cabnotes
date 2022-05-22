import mongoose from "mongoose";

const dbConnect = async () => mongoose.connect(process.env.DB_URL);

export default dbConnect