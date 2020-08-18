const express = require('express');
const app = new express();
const Producto = require('../models/producto');
const {verificarToken} = require('../middlewares/token');
// Listar productos
app.get('/producto', verificarToken, (req, res)=>{
    // Parametros opciones
    let desde = req.query.desde || 0;
    desde = Number(desde);

    Producto.find({disponible:true})
            .skip(desde) // Desde que pagina
            .limit(5) // Solo mostrar 5 registros
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion')
            .exec((err, productos)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err:err
            });
        }
        res.status(200).json({
            ok:true,
            productos
        });
    });
});
// obtener producto
app.get('/producto/:id', verificarToken, (req, res)=>{
    let id = req.params.id;
    Producto.findById(id)
            .populate('usuario', 'nombre email')
            .populate('categoria', 'descripcion')
            .exec((err, productoDb)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err:err
            });
        }
        if(!productoDb){
            return res.status(400).json({
                ok:false,
                msg:'Id no existe'
            });
        }
        res.status(200).json({
            ok:true,
            producto:productoDb
        });
    });
});
// Agregar un producto
app.post('/producto', verificarToken, (req, res)=>{
    let producto = new Producto({
        nombre: req.body.nombre,
        precioUni: req.body.precioUni,
        descripcion: req.body.descripcion,
        categoria: req.body.categoria,
        usuario: req.usuario
    });
    
    producto.save((err, productoDb)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            })
        }
        res.status(200).json({
            ok:true,
            productoDb
        })
    });
});
// Actualizar un producto
app.put('/producto/:id', verificarToken, async(req, res)=>{
    let id = req.params.id;
    let buscarProducto = await Producto.findById(id);
    if(!buscarProducto){
        return res.status(500).json({
            ok:false,
            msg:'Producto no encontrado'
        });
    }
    let body = req.body;
    buscarProducto.nombre = body.nombre,
    buscarProducto.precioUnitario = body.precioUnitario,
    buscarProducto.descripcion = body.descripcion,
    buscarProducto.categoria = body.categoria,
    Producto.findByIdAndUpdate(id, buscarProducto, {new:true}, (err, productoDb)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        res.status(200).json({
            ok:true,
            productoDb
        })
    });
});
// Eliminar producto
app.delete('/producto/:id', verificarToken, async(req, res)=>{
    let id = req.params.id;
    let buscarProducto = await Producto.findById(id);
    if(!buscarProducto){
        return res.status(500).json({
            ok:false,
            msg:'Producto no encontrado'
        });
    }
    buscarProducto.disponible = false
    Producto.findByIdAndUpdate(id, buscarProducto, {new:true}, (err, productoDb)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        res.status(200).json({
            ok:true,
            productoEliminado:productoDb,
            msg:'Producto ya no esta disponible'
        })
    });
});

// Buscar prodcuto
app.get('/producto/buscar/:termino', verificarToken, (req, res)=>{
    let termino = req.params.termino;
    // Comprobar que el termino de busqueda exista
    if(!termino || termino === undefined || termino === ''){
        return res.status(400).json({
            ok:false,
            msg:'El termino es obligatrio'
        });
    }
    // Expresion regular, se envia una i para que no diferencia entre mayusculas y minusculas
    let regex = new RegExp(termino, 'i')
    Producto.find({nombre: regex})
            .populate('usuario', 'nombre')
            .populate('categoria', 'descripcion')
            .exec((err, resultado)=>{
        if(err){
            return res.status(500).json({
                ok:false,
                err
            });
        }
        res.status(200).json({
            ok:true,
            productos:resultado
        })        
    });
});

module.exports = app;