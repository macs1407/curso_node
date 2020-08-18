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

let getEmpleado = (id, callback)=>{
    let empleadoDb = empleados.find(empleado=>empleado.id === id);
    if(!empleadoDb){
        callback('No existe un empleado con ese id')
    } else {
        callback(null, empleadoDb);
    }
}


let getSalario= (empleado, callback)=>{
    let salarioDb = salarios.find(salario=>salario.id === empleado.id);
    if(!salarioDb){
        callback('No existe un salario para el empleado con ese id')
    } else {
        // Para retornar mas de un valor, se utiliza un objeto literal {}
        callback(null, {nombre:empleado.nombre, salario: salarioDb.salario});
    }
}

// El callback retorna un error y un empleado
getEmpleado(1, (error, empleado)=>{
    if(error){
        console.log(error);
        return;
    }
    console.log(empleado);
    // Esta forma de llamar un callback es erroneo
    // El callback retorna un error y un objeto
    getSalario(empleado, (error,  retorna)=>{
        if(error){
            console.log(error);
            return;
        }
        console.log(retorna);
    });
});
