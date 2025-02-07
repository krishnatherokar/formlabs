const isLogged = (req, res, next) => {
    //check if user is logged in
    let user = {
        name: "test",
        id: 123,
        username: "testing"
    }
    req.user = user;
    next();
}

module.exports = isLogged;