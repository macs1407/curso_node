const argv = require('yargs')
                            .options({
                                ciudad:{
                                    demand:true,
                                    alias:'d',
                                    desc:'Direccion de la ciudad'
                                }
                            })
                            .argv;

const {getCiudad} = require('./lugar/lugar');

const endodeUrl = encodeURI(argv.ciudad);

getCiudad(endodeUrl).then(datos=>{
    console.log(`el clima para la ciudad ${datos.city} es ${datos.temperature}`);
}).catch(error=>{
    console.log(error);
})
