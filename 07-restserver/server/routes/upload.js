const express = require('express');
const app = new express();
const fileUpload = require('express-fileupload');
const Usuario = require('../models/usuario');
const Producto = require('../models/producto');
const fs = require('fs');
const path = require('path');

// Middleware para subir los archivos
app.use(fileUpload({ useTempFiles: true }));

app.put('/upload/:tipo/:id', (req, res)=>{
    let tipo = req.params.tipo;
    let id = req.params.id;
    let tiposValidos = ['productos', 'usuarios'];
    if(tiposValidos.indexOf(tipo)<0){
        res.status(400).json({
            ok:false,
            msg:'Los tipos validos son: '+tiposValidos.join(', ')
        });
    }
    // Validar tipo

    // Si no bienen arichos
    if(!req.files){
        return res.status(400).json({
            ok:false,
            msg:'no se ha seleccionado ningun archivo'
        });
    }
    // Recuperar el archivo
    let archivo = req.files.archivo;
    // Obtener extension
    let nombreCortado = archivo.name.split('.');
    let extension = nombreCortado[nombreCortado.length - 1];
    // Extensiones permitidas
    let extensionValidas = ['jpg', 'png', 'gif', 'jpeg'];
    if(extensionValidas.indexOf(extension)< 0){
        res.status(400).json({
            ok:false,
            msg:'Las extensiones permitidas son '+extensionValidas
        });
    } else {
        // Cambiar nombre al archivo
        let nombreArchivo = `${id}-${new Date().getMilliseconds()}.${extension}`

        // Subir el archivo
        archivo.mv(`uploads/${tipo}/${nombreArchivo}`, (err)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                });
            }
            if(tipo === 'usuarios'){
                imagenUsuario(id, res, nombreArchivo);
            } else {
                imagenProducto(id, res, nombreArchivo);
            }
            
        });
    }
    
});

function imagenUsuario(id, res, nombreArchivo){
    Usuario.findById(id, (err, usuarioDb)=>{
        if(err){
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!usuarioDb){
            borraArchivo(nombreArchivo, 'usuarios');
            return res.status(400).json({
                ok:false,
                msg:'Usuario no existe'
            })
        }
        borraArchivo(usuarioDb.img, 'usuarios');
        // Actualiza la imagen del usuario
        usuarioDb.img = nombreArchivo;
        usuarioDb.save((err, usuarioActualizado)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }
            res.status(200).json({
                ok:true,
                usuario:usuarioActualizado
            })
        })
    })
}
function imagenProducto(id, res, nombreArchivo){
    Producto.findById(id, (err, productoDb)=>{
        if(err){
            borraArchivo(nombreArchivo, 'productos');
            return res.status(500).json({
                ok:false,
                err
            })
        }
        if(!productoDb){
            borraArchivo(nombreArchivo, 'productos');
            return res.status(400).json({
                ok:false,
                msg:'Usuario no existe'
            })
        }
        borraArchivo(productoDb.img, 'productos');
        // Actualiza la imagen del usuario
        productoDb.img = nombreArchivo;
        productoDb.save((err, productoActualizado)=>{
            if(err){
                return res.status(500).json({
                    ok:false,
                    err
                })
            }
            res.status(200).json({
                ok:true,
                producto:productoActualizado
            })
        })
    })
}

function borraArchivo(nombreImagen, tipo){
     // ELiminar imagen anterior si existe
     let pathImagen = path.resolve(__dirname, `../../uploads/${tipo}/${nombreImagen}`);
     if(fs.existsSync(pathImagen)){
         fs.unlinkSync(pathImagen)
     } 
}
module.exports = app;