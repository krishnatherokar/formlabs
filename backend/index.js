const express = require('express')
const app = express()

const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const formRoutes = require('./routes/formRoutes');

// parse url encoded form data
app.use(express.urlencoded({ extended: true }));
// json to js objects
app.use(express.json());

// load dotenv based on the ENVIRONMENT
if(process.env.ENVIRONMENT != 'production'){
    // will return true if process.env.ENVIRONMENT is undefined (that's why we need dotenv)
    const dotenv = require('dotenv')
    dotenv.config();
}

// establish mongodb connection
connectDB();

app.get('/', (req, res) => {
    res.send("Working")
})

app.use('/user', userRoutes);
app.use('/form', formRoutes)

app.listen(process.env.PORT)