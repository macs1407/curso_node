const { io } = require('../server');
const {TicketControl} = require('../classes/ticket-control');

const ticketControl = new TicketControl();

io.on('connection', (client) => {

    client.on('siguienteTicket', (data, callback) => {
        // Obtiene el siguiente ticket
        let siguiente = ticketControl.siguiente();
        // lo envia al cliente
        callback(siguiente);
    });

    // Enviar el ultimo estado actual
    client.emit('estadoActual',{
        actual:ticketControl.getUltimoTicket(),
        ultimos4:ticketControl.getUltimos4()
    }) ;

    client.on('atenderTicket', (data, callback)=>{
        if(!data.escritorio){
            return callback({err:true, mensaje:'El escritorio es necesario'});
        }
        let atenderTicket = ticketControl.atenderTicket(data.escritorio);
        callback(atenderTicket);
        // Actualizar o notificar a los ultimos 4
        // A la pantalla principal
        client.broadcast.emit('ultimos4', {
            ultimos4:ticketControl.getUltimos4()
        });
    })

});