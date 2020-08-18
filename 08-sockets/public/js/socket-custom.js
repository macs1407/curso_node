var socket = io();

// LOS ON SON PARA ESCUCHAR
// Cuando estoy conectado al servidor
socket.on('connect', function(){
    console.log('conectado al servidor');
});

socket.on('disconnect', function(){
    console.log('Se perdio conexion con el servidor');
});

// LOS EMIT ENVIAN INFORMACION
socket.emit('enviarMensaje', {usuario:'maikol',mensaje:'Hola...'}, function(resp){
    console.log(resp);
});

// Escuchar informacion
socket.on('enviarMensaje', function(mensaje){
    console.log('info servidor '+mensaje);
})