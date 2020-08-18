const { io } = require('../server');
const { Usuarios } = require('../classes/usuarios');
const { crearMensaje } = require('../utilidades/utilidades');

const usuarios = new Usuarios();

io.on('connection', (client) => {

    console.log('Usuario conectado');

    client.on('entrarChat', (data, callback)=>{
        if(!data.nombre || !data.sala){
            return callback({
                ok:false,
                mensaje:'El nombre/sala es necesario'
            })
        }
        // Conectar a un usuario a una sala
        client.join(data.sala)
        usuarios.agregarPersona(client.id, data.nombre, data.sala);
        //client.broadcast.emit('listaPersonas',usuarios.getPersonas());
        client.broadcast.to(data.sala).emit('listaPersonas',usuarios.getPersonaPorSalas(data.sala));
        client.broadcast.to(data.sala).emit('crearMensaje', crearMensaje('Administrador', `${data.nombre} se unio al chat`));

        callback(usuarios.getPersonaPorSalas(data.sala));
    });

    client.on('enviarMensaje', (data, callback)=>{
        let persona = usuarios.obtenerPersonaPorId(client.id);
        let mensaje = crearMensaje(persona.nombre, data.mensaje);
        client.broadcast.to(persona.sala).emit('crearMensaje', mensaje);
        callback(mensaje);
    });

    client.on('mensajePrivado', data=>{
        let persona = usuarios.obtenerPersonaPorId(client.id);
        // Enviar un mensaje a un usuario en especifico
        client.broadcast.to(data.para).emit('mensajePrivado', crearMensaje(persona.nombre, data.mensaje));
    });

    client.on('disconnect', ()=>{
        let personaBorrada = usuarios.borrarPersona(client.id);
        if(personaBorrada){
            client.broadcast.to(personaBorrada.sala).emit('crearMensaje', crearMensaje('Administrador', `${personaBorrada.nombre} abandono el chat`));
            client.broadcast.to(personaBorrada.sala).emit('listaPersonas',usuarios.getPersonaPorSalas(personaBorrada.sala));
        }
    });
   
});