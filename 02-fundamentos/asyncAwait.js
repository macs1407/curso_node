// al poner la palabra async hace la funcion asincronica, seria hacer lo mismo que return new Promise
let getNombre = async(nombre)=>{
    if(!nombre || nombre === ''){
        throw new Error('Debe de enviar un nombre')
    }
    return nombre;
}
// nombre es el resolve
getNombre('maikol').then(nombre=>{
    console.log(nombre);
// Manejar el error
}).catch(error=>{
    console.log(error);
});

let saludo = async()=>{
    // El await hace que las funciones trabajen sobre un mismo hilo y que espere a que
    // acabe su ejecucion
    let nombre = await getNombre('maikol');
    // Hasta que no ejecute getNombre no se va a ejecutar despues la linea 21 y 22
    console.log('------------------------------');
    return `Se devuelve ${nombre}`;
}

saludo().then(nombre=>{
    console.log(nombre);
// Manejar el error
}).catch(error=>{
    console.log(error);
});