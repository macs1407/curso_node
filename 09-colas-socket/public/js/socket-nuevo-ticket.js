// Comando para establecer la conexion
var socket = io();
var label = $('#lblNuevoTicket');

socket.on('connect', function(){
    console.log('conectado al servidor')
})

socket.on('disconnect', function(){
    console.log('se deconecto del servidor')
});

// Obtener el ultimo
socket.on('estadoActual', function(resp){
    label.text(resp.actual);
})

// Emitir un ticket nuevo
$('button').on('click', function(){
    socket.emit('siguienteTicket', null, function(siguiente){
        // siguiente obtiene la respuesta desde el back
        label.text(siguiente);
    });
});