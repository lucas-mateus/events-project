const express = require('express');
const routes = require('./routes');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const app = express();

const PORT = process.env.PORT || 8000;
if(process.env.NODE_ENV != 'production'){
    require('dotenv').config();
}

app.use(cors());
app.use("/files", express.static(path.resolve((__dirname,"..","files"))))

app.use(express.json());

try {
    mongoose.connect(process.env.MONGO_DB_CONNECTION,{
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

    console.log("mongoDB conectado")
} catch (error) {
    console.log(error)
    
}

app.use(routes);

app.listen(PORT, () => {
    console.log(`Linstening on Port: ${PORT}`)
});