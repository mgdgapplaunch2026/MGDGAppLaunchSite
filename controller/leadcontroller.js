const Lead = require('../model/leadmodel.js');
const { Resend } = require('resend');

// 1. Initialize Resend with your API Key from .env
const resend = new Resend(process.env.RESEND_API_KEY);

exports.captureLead = async (req, res) => {
    try {
        const { name, email } = req.body;

        // 1. Database logic (Keep this exactly as is)
        const existingLead = await Lead.findOne({ email });
        if (existingLead) {
            return res.status(409).json({ status: 'error', message: 'Identity already registered.' });
        }
        const newLead = await Lead.create({ name, email });

        // 2. The Internal Notification (Emailing Yourself)
        try {
            await resend.emails.send({
                from: 'MGDG Protocol <onboarding@resend.dev>',
                to: 'mgdgapplaunch2026@gmail.com', // <--- Put YOUR email here
                subject: 'MGDG Alert: New Reserve Entry Detected',
                reply_to: email, // This uses the email the user typed in the form
                html: `
                    <div style="font-family: monospace; border: 1px solid #333; padding: 20px;">
                        <h2 style="color: #d4af37;">MGDG INTERNAL NOTIFICATION</h2>
                        <p><strong>Name:</strong> ${name}</p>
                        <p><strong>Email:</strong> ${email}</p>
                        <p><strong>Timestamp:</strong> ${new Date().toLocaleString()}</p>
                        <hr>
                        <p style="font-size: 0.8em;">Action Required: Manual verification of queue position.</p>
                    </div>
                `
            });
            console.log("MGDG Protocol: Internal notification dispatched.");
        } catch (mailError) {
            console.error("MGDG Alert: Internal mail failed.", mailError);
        }

        // 3. Response to User (Still give them the success message!)
        res.status(201).json({
            status: 'success',
            message: 'Access Granted. Queue position locked.',
            data: { lead: newLead }
        });

    } catch (err) {
        res.status(400).json({ status: 'fail', message: 'Lead capture protocol failed.', error: err.message });
    }
};