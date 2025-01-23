const fetch = require('node-fetch');

export default async function handler(req, res) {
    const { phone, otp } = req.body;

    if (req.method === 'POST' && req.url.endsWith('/send-otp')) {
        // Send OTP API call
        try {
            const response = await fetch(`https://2factor.in/API/V1/7dbd87a6-3920-11ee-addf-0200cd936042/SMS/${phone}/AUTOGEN`);
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'OTP അയക്കുന്നതിൽ പിഴവ്', error });
        }
    } else if (req.method === 'POST' && req.url.endsWith('/verify-otp')) {
        // Verify OTP API call
        try {
            const response = await fetch(`https://2factor.in/API/V1/7dbd87a6-3920-11ee-addf-0200cd936042/SMS/VERIFY/${otp}`);
            const data = await response.json();
            res.status(200).json(data);
        } catch (error) {
            res.status(500).json({ status: 'error', message: 'OTP വെരിഫൈ ചെയ്യുന്നതിൽ പിഴവ്', error });
        }
    } else {
        res.status(400).json({ status: 'error', message: 'Invalid API Endpoint' });
    }
}
