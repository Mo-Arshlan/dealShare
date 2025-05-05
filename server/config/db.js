const mongoose = require('mongoose');
const colors = require('colors');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONDOGB_URL);
        console.log(`Connection to database is successful ${conn.connection.host}`.bgMagenta.white)
    } catch (error) {
        console.log(`Error in MongoDB connection: ${error}`.bgRed.white)
    }
}

module.exports = connectDB