const express = require('express');
const app = new express();
const mongosee = require('mongoose');
let {verificarToken, compruebaRolAdmin} = require('../middlewares/token');
const Categoria = require('../models/categoria');

// Mostrar todas las categorias
app.get('/categoria',verificarToken, async(req, res)=>{
    await Categoria.find()
                    // Ordenar por la descripcion
                    .sort('descripcion')
                    // Traer informacion de otras tablas, traer de usuario el nombre y el email 
                    .populate('usuario', 'nombre email')
                    .exec((err, categorias)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        res.status(200).json({
            ok:true, 
            categorias
        })
    })
});

// Mostrar categoria por id
app.get('/categoria/:id',verificarToken, async(req, res)=>{
    let id = req.params.id;
    if(!id){
        return res.status(400).json({
            ok:false,
            msg:'Categoria no encontrada'
        });
    }

    await Categoria.findById(id)
                    // Traer informacion de otras tablas, traer de usuario el nombre y el email 
                    .populate('usuario', 'nombre email')
                    .exec((err, categoria)=>{                        
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }

        res.status(200).json({
            ok:true, 
            categoria
        })
    })
});

// Agregar categoria
app.post('/categoria',verificarToken, async(req, res)=>{
    let categoria = new Categoria();
    categoria.descripcion = req.body.descripcion;
    categoria.usuario = req.usuario; // Biene del token
    await categoria.save((err, categoriaDb)=>{
        console.log(err);
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        if(!categoriaDb){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        res.status(200).json({
            ok:true,
            categoriaDb
        })

    })
   
});

// Actualizar categoria
app.put('/categoria/:id',verificarToken, async(req, res)=>{
    let id = req.params.id;
    if(mongosee.Types.ObjectId.isValid(id)) {
        let categoriaBuscar = await Categoria.findById(id);
        if(!categoriaBuscar){
            return res.status(500).json({
                ok:false,
                msg:'categoria no existe'
            });
        }
        let categoriaActualizar = {
            descripcion: req.body.descripcion
        }
        await Categoria.findByIdAndUpdate(id, categoriaActualizar, {new:true, runValidators:true}, (err, categoriaDb)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            res.status(200).json({
                ok:true,
                categoriaDb
            });
        });
    } else {
        res.status(200).json({
            ok:true,
            msg:'Id invalido'
        });
    }
});

// Eliminar categoria
app.delete('/categoria/:id',[verificarToken, compruebaRolAdmin], async(req, res)=>{
    let id = req.params.id;
    let categoriaBuscar = await Categoria.findById(id);
    if(!categoriaBuscar){
        return res.status(500).json({
            ok:false,
            msg:'categoria no existe'
        });
    }

    await Categoria.findByIdAndRemove(id, (err, categoriaEliminado)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        res.status(200).json({
            ok:true,
            categoriaEliminado
        });
    })
});

module.exports = app;