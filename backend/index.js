const express = require('express')
const app = express()

const connectDB = require('./config/db');
const userRouter = require('./routes/userRoutes');
const formRouter = require('./routes/formRoutes');
const loginRouter = require('./routes/loginRoutes');

const cookieParser = require('cookie-parser');

// parse url encoded form data
app.use(express.urlencoded({ extended: true }));
// json to js objects
app.use(express.json());

// configure dotenv
require('./config/dotenvconfig');

// set allowed request origins
app.use(require('./config/setCors'));

// limit the requests
app.use(require('./config/rateLimit'));

// establish mongodb connection
connectDB();

// parse cookies
app.use(cookieParser());

app.get('/', (req, res) => {
    res.send("Working")
})

app.use('/login', loginRouter);

app.use('/user', userRouter);
app.use('/form', formRouter);

app.listen(process.env.PORT)