const jwt = require('jsonwebtoken');

// req = peticion, res = respuesta, next = hace que el programa continue
let verificarToken = (req, res, next)=>{
    // Leer el header personalizado, con req.get() se leen los valores por cabecera
    let token = req.header('Authorization');
    if(!token){
        return res.status(400).json({
            ok:false,
            msg:'No hay token en la peticion'
        });
    }
    // Comprobar que el token sea valido
    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                mgs:err
            });
        }
        // Enviar el usuario en la peticion, para pasarlas a las peticiones donde se invoque este token
        req.usuario = decoded.usuarioEncontrado;
        next();
    });
}

let compruebaRolAdmin = (req, res, next)=>{
    // Obtener el token
    let token = req.header('Authorization');
    if(!token){
        return res.status(400).json({
            ok:false,
            msg:'No hay token en la peticion'
        });
    }
    // Comprobar el token
    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                mgs:err
            });
        }
        if(decoded.usuarioEncontrado.role !== 'ADMIN_ROLE'){
            return res.status(401).json({
                ok:false,
                mgs:'No tiene privilegios para crear usuarios'
            });
        }
        next();
    })
}

const verificarTokenImg = (req, res, next)=>{
    let token = req.query.token;
    
    if(!token){
        return res.status(400).json({
            ok:false,
            msg:'No hay token en la peticion'
        });
    }
    // Comprobar que el token sea valido
    jwt.verify(token, process.env.SECRET, (err, decoded)=>{
        if(err){
            return res.status(401).json({
                ok:false,
                mgs:err
            });
        }
        // Enviar el usuario en la peticion, para pasarlas a las peticiones donde se invoque este token
        req.usuario = decoded.usuarioEncontrado;
        next();
    });
}

module.exports={
    verificarToken,
    compruebaRolAdmin,
    verificarTokenImg
};