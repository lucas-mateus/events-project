const User = require('../models/User');
const bcrypt = require('bcrypt');

module.exports = {
    async save(req, res){
        try {
            const {firstName, lastName, email, password } = req.body;

            const existentUser = await User.findOne({email});

            if(!existentUser){
                const hasedPassword = await bcrypt.hash(password, 10);

                const user = await User.create({
                    firstName,
                    lastName,
                    email,
                    password: hasedPassword
                })

                return res.json(user);
            }
            
            return res.status(400).json({
                message: "Erro na criação do usuário, email já cadastrado!"
            })
        

        } catch (error) {
            throw Error("Erro no momento de cadastrar o usuário!")
        }
    },

    async getUserById(req, res){
        const {userId} = req.params;
        try {

            const user = await User.findById(userId);
            return res.json(user);
            
        } catch (error) {
            return res.status(400).json({
                message:"Não foi possível encontrar usuário com este ID"
            })
        }
    },


}
