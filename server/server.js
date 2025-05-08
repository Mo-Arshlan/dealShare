const express = require('express');
const connectDB = require('./config/db');
const colors = require('colors');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoute = require('./routers/auth-routers');
const productRoute = require('./routers/product-routers');
const categoryRoute = require('./routers/category-routers');
//const path = require('path');

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

// serve static files
//app.use(express.static(path.join(__dirname, './client/dist')));


// wildcard route (for React Router)
//app.use('*', function (req, res) {
//    res.sendFile(path.join(__dirname, './client/dist/index.html'));
//  });

// PORT
const PORT = process.env.PORT || 8080;

// database config
connectDB().then(() => {
    // run listen
    app.listen(PORT, () => {
        console.log(`Server is running on PORT ${PORT}`.bgCyan.white);
    })
})
