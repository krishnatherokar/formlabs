const express = require('express')
const app = express()

const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const formRouter = require('./routes/formRoutes');

// parse url encoded form data
app.use(express.urlencoded({ extended: true }));
// json to js objects
app.use(express.json());

//configure dotenv
require('./config/dotenvconfig');

// establish mongodb connection
connectDB();

app.get('/', (req, res) => {
    res.send("Working")
})

app.use('/user', userRouter);
app.use('/form', formRouter)

app.listen(process.env.PORT)