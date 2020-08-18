const http = require('http');

// crear el servidor 
http.createServer((req, res)=>{
    // Enviar la cabacera de OK con formato JSON
    res.writeHead(200, {'Content-type': 'application/json'});
    let salida = {
        nombre: 'Maikol Arley Cucunuba',
        edad:30,
        url: req.url
    }
    res.write(JSON.stringify(salida));
    res.end();
}).listen(8080);
 console.log('Escuchando el puerto 8080')