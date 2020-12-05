const User = require("../models/User");
const bcrypt = require('bcrypt');

module.exports = {
    async store(req, res){
        try{
            const {email, password} = req.body;
            
            if(!email || !password){
                return res.status(200).json({
                    message:"Campos não preenchidos"
                })
            }

            const user = await User.findOne({email});
            if(!user){
                return res.status(200).json({
                    message: "usuário não encontrado, cadastre sua conta."
                })
            }

            if(user && await bcrypt.compare(password, user.password)){
                const userResponse = {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName
                }

                return res.json(userResponse);
            }else{
                return res.status(200).json({
                    message: "Email e/ou Senha incorretos"
                })  
            }

        }catch(error){
            throw Error(`Error while Authenticating a User ${error}`)
        }
    }
}