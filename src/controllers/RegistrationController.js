const Registration = require("../models/Registration");

module.exports = {
    async create(req, res) {
        const { user_id } = req.headers;
        const { eventId } = req.params;
        const { date } = req.body;

        const registration = await Registration.create({
            date,
            user: user_id,
            event: eventId
        })

        await registration
            .populate('event')
            .populate('user', '-password')
            .execPopulate();

        return res.json(registration);
    },

    async getRegistration(req, res) {
        const { regId } = req.params;
        console.log("registration: ", regId)

        try {
            const registration = await Registration.findById(regId);
            await registration
                .populate('event')
                .populate('user', '-password')
                .execPopulate();

            return res.json(registration);
        } catch (error) {
            return res.status(400).json({
                message: "registro não encontrado!"
            })
        }
    }
}