const {argv} = require('./config/yargs');
const porHacer = require('./porHacer/porhacer');
const colors = require('colors');
let comando = argv._[0];

switch(comando){
    case 'crear':
        let tarea = porHacer.crear(argv.descripcion);
        console.log(tarea);
        break;
    case 'actualizar':
        let actualizado = porHacer.actualizar(argv.descripcion, argv.completado);
        console.log(actualizado);
        break;       
    case 'listar':
       let tareas = porHacer.getListado();
       for(let tarea of tareas){
           console.log("-----------------------------".green);
           console.log(tarea.descripcion);
           console.log("estado: ",tarea.completado);
           console.log("-----------------------------".green);
       }
        break;    
    case 'eliminar':
        let borrado = porHacer.borrar(argv.descripcion);
        console.log(borrado);
        break;
    default:
        console.log('Comando no encontrado');
}