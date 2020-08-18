let empleados = [
    {id:1,nombre:'matias'},
    {id:2,nombre:'kerly'},
    {id:3,nombre:'paula'},
    {id:4,nombre:'sandra'},
]

let salarios = [
    {id:1,salario:1500000},
    {id:2,salario:2500000},
    {id:3,salario:3500000},
]

let getEmpleado = (id)=>{
    return new Promise((resolve, reject)=>{
        let empleadoDb = empleados.find(empleado=>empleado.id === id);
        if(!empleadoDb){
            reject('No existe un empleado con ese id')
        } else {
            resolve(empleadoDb);
        }
    });    
}

let getSalario = (empleado)=>{
    return new Promise((resolve, reject)=>{
        let salarioDb = salarios.find(salario=>salario.id === empleado.id);
        if(!salarioDb){
            reject('No existe un salario para el empleado con ese id')
        } else {
            // Para retornar mas de un valor, se utiliza un objeto literal {}
            resolve({nombre:empleado.nombre, salario: salarioDb.salario});
        }
    });
}

// El empleado representa el resolve y error el reject
/*getEmpleado(1).then(empleado =>{
    console.log('empleado de base de datos ',empleado);
    getSalario(empleado).then(emp=>{
        console.log('El salario es ',emp);
        
    },error=>{
        console.log(error);
    });
},error=>{
    console.log(error);
});*/


// Encadenar promesas, para hacer esto se pede retornar getSalario que no es mas que otra promesa
getEmpleado(1).then(empleado =>{
    console.log(`empleado ${empleado.nombre }`);
    // Encadenar la promesa
    return getSalario(empleado);
// manejar el codigo de getSalario
}).then(resp=>{
    console.log(`tiene un salario ${resp.salario}`);
}).catch(error=>{
    console.log(error);
});