const Event = require("../models/Event");
const User = require("../models/User");

module.exports = {
  
    async save(req,res){
        const {title, description, price,category} = req.body;
        const {filename} = req.file;
        const {user_id} = req.headers;

        const user = await User.findById(user_id);

        if(!user){
            return res.status(400).json({
                message:"esse usuário não existe"
            })
        }

        const event = await Event.create({
            title,
            description,
            price:parseFloat(price),
            user:user_id,
            thumbnail:filename,
            category
        })

        return res.json(event);

    },

    async getEventById(req, res){
        const {eventId} = req.params;
        try {
            const event = await Event.findById(eventId);
            
            if(event){
                return res.json(event);
            }
         
            
        } catch (error) {
            return res.status(400).json({
                message:"Não foi possível encontrar esse evento."
            })
        }
    },

    async getByCategory(req, res){
        const {category} = req.params;

        try{
            const event = await Event.find({category});
            if(event.length>0){
                return res.json(event);
            }else{
                return res.status(400).json({
                    message: "Não foi encontrado evento com essa categoria"
                })
            }
        }catch(error){
            console.log(error)
            return res.status(400).json({
                message: "Algo deu errado :/"
            })
        }
    },

    async getAllEvents(req, res){
        try{
            const events = await Event.find({});
            
            if(events!=null){
                return res.json(events);
            }

        }catch(error){
            return res.status(400).json({
                message:"Algo deu errado... :/"
            })
        }
    },

    async delete(req, res){
        const {eventId} = req.params;
        try{
            await Event.findByIdAndDelete(eventId);
            //console.log({eventId})
            return res.status(204).send();

        }catch(error){
            return res.status(400).json({
                message:"Não foi possível encontrar esse evento."
            })
        }
    }
}