const express = require('express')
const app = express()

if(process.env.ENVIRONMENT != 'production'){
    const dotenv = require('dotenv')
    dotenv.config();
}

app.get('/', (req, res) => {
    res.send("Working")
})

app.listen(process.env.PORT)