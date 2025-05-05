const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routers/auth-routers');
const productRoute = require('./routers/product-routers');
const categoryRoute = require('./routers/category-routers');

// configure env
dotenv.config();

// rest object - so that we can create rest APIs
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoute)
app.use('/api/product', productRoute)
app.use('/api/category', categoryRoute)

// PORT
const PORT = process.env.PORT || 8080;

// database config
connectDB().then(() => {
    // run listen
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`.bgCyan.white);
    })
})