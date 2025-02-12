const formSchema = require('../../models/formSchema');

const getForm = async (req, res) => {
    try {
        const form = await formSchema.findById(req.params.id);
        if(!form) throw new Error('Form not found');
        res.json(form);
    } catch (error) {
        res.status(404).json(error);
    }
}

module.exports = getForm;