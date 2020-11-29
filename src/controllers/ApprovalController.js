const Registration = require("../models/Registration");

module.exports = {
    async approval(req, res) {
        const { regId } = req.params;
        console.log("registration id =====",regId)
        try {
            const registration = await Registration.findById(regId);

            registration.approved = true;

            await registration.save();

            return res.json(registration)

        } catch (error) {
            return res.status(400).json(error)
        }
    }
}