require('../server/config/config');
const express = require('express');
const app = express();
const mongosee = require('mongoose');
const bodyParser = require('body-parser');
const path = require('path');

// CUANDO SE VE UN APP.USE SON MIDDLEWARES

// Parsear application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:false}));
// Parsear JSON
app.use(bodyParser.json());
// Hacer publico la carpeta public para login con google
app.use(express.static(path.resolve(__dirname,'../public')));
// Importar y usar las rutas del usuario
app.use(require('./routes/index'));

// mongodb+srv://macs1407:P2eZZQRF8NA4rhtW@cluster0-gryds.mongodb.net/?authSource=admin&replicaSet=Cluster0-shard-0&readPreference=primary&appname=MongoDB%20Compass&ssl=true
mongosee.connect(process.env.URLDB,
                (err, resp)=>{
    if(err) throw err;
    console.log('Conectado a base de datos')
});

/*mongosee.connect("mongodb://localhost:27017/cafe", 
                {useNewUrlParser:true, useCreateIndex:true},
                (err, resp)=>{
    if(err) throw err;
    console.log('Conectado a base de datos')
});*/
app.listen(process.env.PORT, ()=>{
    console.log('escuchando puerto 3001');
});