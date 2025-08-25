import mongoose from 'mongoose'
import dotenv from 'dotenv'

dotenv.config()

export const dbConnect = async() => {

    await mongoose
        .connect(process.env.MONGO_URL)
        .then(() => console.log('Mongo Connected'))

    mongoose.connection.on('error', error => {
        console.log('error connecting to mongoDB', error)
    })
}