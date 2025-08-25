import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import { dbConnect } from './config/db.js'

const app = express()
dotenv.config()

dbConnect();

const PORT = process.env.PORT || 5000



app.use(cors())
app.use(express.json())

app.get('', (req, res) => {
    res.send("api is running")
})


app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);

})