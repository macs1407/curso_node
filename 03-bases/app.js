const {argv} = require('./config/yargs');
const {crearArchivo, listar} = require('./multiplicar/multiplicar');

let comando = argv._[0];
switch(comando){
    case 'listar':
        listar(argv.base, argv.limite);
        break;
    case 'crear':
        crearArchivo(argv.base, argv.limite)
        .then(archivo=>{
            console.log(archivo);
        }).catch(err=>{
            console.log(err);
        });
        break;
    default:
        console.log('comando no reconocido');
}