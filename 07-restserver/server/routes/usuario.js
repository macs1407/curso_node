const express = require('express');
const app = express();
const Usuario = require('../models/usuario');
const bcrypt = require('bcrypt');
const mongosee = require('mongoose');
const _ = require('underscore');
const {verificarToken, compruebaRolAdmin} = require('../middlewares/token');

// OBTENER USUARIOS
app.get('/usuario',verificarToken,(req, res)=>{

    // Los parametros opcionales bienen en req.query y se manda en la url ?desde=5
    let desde = req.query.desde || 0;
    desde = Number(desde);

    let limite = req.query.limite || 5;
    limite = Number(limite);

    // Condiciones {filtrar solo los que tengan estado true}, '' que campos queremos mostrar
    Usuario.find({estado:true}, 'nombre email img estado role google') 
            .skip(desde) // Mostrar los siguientes 5 registros
            .limit(limite) // mostrar solo 5 registros
            .exec((err, usuarios)=>{
                if(err){
                    res.status(400).json({
                        ok:false,
                        msg:err
                    })
                }
                // Contar la cantidad de registros
                Usuario.count({estado:true}, (err, conteo)=>{
                    if(err){
                        return res.status(400).json({
                            ok:false,
                            msg:err
                        })
                    }

                    res.status(200).json({
                        ok:true,
                        usuarios:usuarios,
                        cuantos:conteo
                    })
                })
                
            });
});

// CREAR USUARIO
app.post('/usuario', [verificarToken, compruebaRolAdmin], async(req, res)=>{
    // Obtener los datos del post
    let body = req.body;
    const {nombre, email} = body;

    // Crear un objeto de tipo usuario
    let usuario = new Usuario({
        nombre:body.nombre,
        email:body.email,
        password: bcrypt.hashSync(body.password, 10),
        role:body.role
    })

    if(nombre === undefined || nombre === null){
        return res.status(400).json({
            ok:false,
            msg:'nombre es obligatorio'
        })
    } else {
        // Comprobar si el correo ya existe
        let usuarioExiste = await Usuario.findOne({email:email});
        if(usuarioExiste){
            res.status(400).json({
                ok:false,
                msg:"El correo ya existe"
            })
        } else {
            usuario.save((err, usuarioDb)=>{
                if(err){
                    return res.status(400).json({
                        ok:false,
                        err
                    })
                } else {
                    return res.status(201).json({
                        ok:true,
                        usuario:usuarioDb
                    })
                }
            });
        }
    }
});

// ACTUALIZAR USUARIO
app.put('/usuario/:id', [verificarToken, compruebaRolAdmin], async(req, res)=>{
    // Obtener los parametros
    let id = req.params.id;
    // Obtener el cuerpo del envio
    let body = _.pick(req.body, ['nombre', 'password', 'img', 'role', 'estado']);
    // Encriptar contraseña
    if(body.password){
        body.password = bcrypt.hashSync(body.password, 10);
    }

    if(mongosee.Types.ObjectId.isValid(id)) {
        // Comprobar si existe el usuario
        let usuarioExiste = await Usuario.findById(id);
        if(!usuarioExiste){
            return res.status(400).json({
                ok:false,
                mgs:`El usuario con el id ${id} no existe`
            })
        }
        // Actualizar el usuario
        await Usuario.findByIdAndUpdate(id, body, {new:true, runValidators:true},(err, usuarioDb)=>{
            if(err){
                return res.status(400).json({
                    ok:false,
                    mgs:err
                })
            }
            return res.status(201).json({
                ok:true,
                usuario:usuarioDb
            })
        });
    
    } else {
        return res.status(400).json({
            ok:true,
            usuario:'Id invalido'
        })
    }
    
});

// ELIMINAR USUARIO
app.delete('/usuario/:id', [verificarToken, compruebaRolAdmin], async(req, res)=>{
    // Obtener el ID del usuario, req.params son parametros obligatorios
    let id = req.params.id;
    if(mongosee.Types.ObjectId.isValid(id)) {
        // Comprobar si existe un usuario por ese id
        let usuarioComprueba = await Usuario.findById(id);
        if(!usuarioComprueba){
            return res.status(401).json({
                ok:false,
                msg:`El usuario con id ${id} no existe`
            });
        }

        await Usuario.findByIdAndRemove(id, (err, usuarioElminado)=>{
            if(err){
                res.status(400).json({
                    ok:false,
                    msg:err
                })
            }

            res.status(200).json({
                ok:true,
                usuario:usuarioElminado
            })
        });
    }else{
        return res.status(401).json({
            ok:false,
            msg:`El usuario con id ${id} no existe`
        });
    }
});

app.put('/usuarioDesactivar/:id', verificarToken, async(req, res)=>{
    // Obtener el ID del usuario, req.params son parametros obligatorios
    let id = req.params.id;
    if(mongosee.Types.ObjectId.isValid(id)) {
        // Comprobar si existe un usuario por ese id
        let usuarioComprueba = await Usuario.findById(id);
        if(!usuarioComprueba){
            return res.status(401).json({
                ok:false,
                msg:`El usuario con id ${id} no existe`
            });
        }
        // propiedades que se van a cambiar
        let cambiaEstado = {
            estado: false
        }

        await Usuario.findByIdAndUpdate(id, cambiaEstado, {new:true, runValidators:true}, (err, usuarioActualizado)=>{
            if(err){
                res.status(400).json({
                    ok:false,
                    msg:err
                })
            }

            res.status(200).json({
                ok:true,
                usuario:usuarioActualizado
            })
        });
    }else{
        return res.status(401).json({
            ok:false,
            msg:`El usuario con id ${id} no existe`
        });
    }
});

module.exports = app;