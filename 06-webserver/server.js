const express = require('express');
// utilizar express
const app = express();
// HBS
const hbs = require('hbs');

// Un middleware siempre se ejecuta antes de cada peticion
app.use(express.static(__dirname+'/public'));
hbs.registerPartials(__dirname+"/views/parciales");

app.set('view engine', 'hbs');

// Escuchar cualquier peticion en /
app.get('/', (req, res)=>{
    
    res.render("home",{
        nombre:'Maikol cucunuba'
    });
});

// Escuchar cualquier peticion en /
app.get('/acerca', (req, res)=>{
    res.render("acerca",{nombre:'maikol'});
});

// Escuchar cualquier peticion en /peticion
app.get('/peticion', (req, res)=>{
    let salida = {
        nombre: 'Maikol Arley Cucunuba',
        edad:30,
        url: req.url
    }
    // Enviar como aplicacion JSON para que lo puedan obtener
    // La funcion SEND verifica que es un JSON y lo serializa
    res.send(salida);
});


// Puerto por donde escucha la aplicacion
app.listen(9090, ()=>{
    console.log('escuchando peticiones');
});