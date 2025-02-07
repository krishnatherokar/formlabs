const getForm = (req, res) => {
    res.send(req.params.id);
}

module.exports = getForm;