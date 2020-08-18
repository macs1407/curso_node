const {io} = require('../server');
// Saber cuando se conecta un usuario
io.on('connection', (client)=>{
    client.emit('enviarMensaje', {
        usuario:'Admin',
        mensaje:'Bienvenido a esta aplicacion'
    })
    // client = contiene toda la informacion del cliente
    console.log('Usuario conectado');
    client.on('disconnect', ()=>{
        console.log('Usuario desconectado');
    });

    // Escuchar el cliente
    client.on('enviarMensaje', (data, callback)=>{
        console.log(data);
        client.broadcast.emit('enviarMensaje',JSON.stringify(data));
        //callback({respuesta:'se dispara'});
    })
});