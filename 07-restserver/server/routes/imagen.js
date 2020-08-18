const express = require('express');
const fs = require('fs');
const app = new express();
const path = require('path');
let {verificarTokenImg} = require('../middlewares/token');

app.get('/imagen/:tipo/:img', verificarTokenImg, (req, res)=>{
    let tipo = req.params.tipo;
    let img = req.params.img;

    let pathImg = path.resolve(__dirname,`../../uploads/${tipo}/${img}`);
    if(fs.existsSync(pathImg)){

        res.sendFile(pathImg);
    } else {
        let noImage = path.resolve(__dirname,'../assets/no-image.jpg');

        res.sendFile(noImage);
    }

   
});

module.exports = app;
