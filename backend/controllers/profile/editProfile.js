const editProfile = (req, res) => {
    Object.assign(req.user, req.body);
    res.send(req.user);
}

module.exports = editProfile;