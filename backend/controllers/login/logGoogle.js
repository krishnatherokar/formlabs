const logGoogle = (req, res) => {
    res.json(req.user);
}

module.exports = logGoogle;