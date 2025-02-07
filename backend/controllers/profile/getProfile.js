const getProfile = (req, res) => {
    res.send(req.user);
}

module.exports = getProfile;