// load dotenv based on the ENVIRONMENT
if(process.env.ENVIRONMENT != 'production'){
    // will return true if process.env.ENVIRONMENT is undefined (that's why we need dotenv)
    const dotenv = require('dotenv')
    dotenv.config();
}