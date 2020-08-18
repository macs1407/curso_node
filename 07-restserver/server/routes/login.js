const express = require('express');

const app = new express();
const bcrypt = require('bcrypt');
const Usuario = require('../models/usuario');
const jwt = require('jsonwebtoken');
// Google
const {OAuth2Client} = require('google-auth-library');
const client = new OAuth2Client(process.env.CLIENT_ID);

app.post('/login', async(req, res)=>{
    
    const body = req.body;
    // Buscar si existe el usuario por el email
    await Usuario.findOne({email:body.email}, (err, usuarioEncontrado)=>{
        // Si se presenta error
        if(err){
            return res.status(500).json({
                ok:false,
                msg:err
            })
        }
        // Si no encontro el usuario
        if(!usuarioEncontrado){
            return res.status(400).json({
                ok:false,
                msg:'Usuario o contraseña incorrecto'
            })
        }
        // Evaluar la contraseña
        if(!bcrypt.compareSync(body.password,usuarioEncontrado.password)){
            return res.status(400).json({
                ok:false,
                msg:'usuario o contraseña incorrecto'
            });            
        } 
        // Generar token
        let token = jwt.sign({usuarioEncontrado}, process.env.SECRET, {expiresIn:process.env.EXPITE_TOKEN});
        // Guardarlo en localStorage
        //localStorage.setItem('token-node', token);
        res.json({
            ok:true,
            usuarioEncontrado,
            token
        })  
        
    });
});

// Configuraciones de google
async function verify(token) {
    const ticket = await client.verifyIdToken({
        idToken: token,
        audience: process.env.CLIENT_ID,  // Specify the CLIENT_ID of the app that accesses the backend
        // Or, if multiple clients access the backend:
        //[CLIENT_ID_1, CLIENT_ID_2, CLIENT_ID_3]
    });
    const payload = ticket.getPayload();
    return {
        nombre:payload.name,
        email:payload.email,
        img:payload.pucture,
        google:true
    }
}

app.post('/google', async(req, res)=>{
    let token = req.body.idtoken;
    let googleUser = await verify(token)
                            .catch(e=>{
                                return res.status(403).json({
                                    ok:false,
                                    err:e
                                })
                            });
    // Hacer validaciones para registrar
    Usuario.findOne({email:googleUser.email}, (err, usuarioDb)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                msg:err
            })
        }
        // Si el usuario existe
        if(usuarioDb){
            // Pero no se ha autenticado por google
            if(usuarioDb.google === false){
                return res.status(400).json({
                    ok:false,
                    msg:'Debe ingresar por autenticacion normal'
                });
            // Renovar token
            } else {
                let token = jwt.sign({usuarioDb}, process.env.SECRET, {expiresIn:process.env.EXPITE_TOKEN});
                return res.status(200).json({
                    ok:true,
                    usuario:usuarioDb,
                    token
                })
            }            
        }
        // Si el usuario no existe, hay que crearlo
        let usuario = new Usuario();
        usuario.nombre = googleUser.nombre;
        usuario.email = googleUser.email;
        usuario.img = googleUser.img;
        usuario.google = true;
        usuario.password = ':)';
        usuario.save((err, usuario)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    msg:err
                })
            }
            let token = jwt.sign({usuarioEncontrado}, process.env.SECRET, {expiresIn:process.env.EXPITE_TOKEN});
            return res.status(200).json({
                ok:true,
                usuario:usuario,
                token
            });
        })
    });
})

module.exports = app;