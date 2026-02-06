const Lead = require('../model/leadmodel.js');

exports.captureLead = async (req, res) => {
    try {
        const { name, email } = req.body;

        // Check if the lead already exists in the reserve
        const existingLead = await Lead.findOne({ email });
        if (existingLead) {
            return res.status(409).json({
                status: 'error',
                message: 'Identity already registered in the MGDG Reserve.'
            });
        }

        const newLead = await Lead.create({ name, email });

        res.status(201).json({
            status: 'success',
            message: 'Access Granted. Queue position locked.',
            data: { lead: newLead }
        });
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: 'MGDG Alert: Lead capture protocol failed.',
            error: err.message
        });
    }
};