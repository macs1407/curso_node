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

let getEmpleado = async(id)=>{
    let empleadoDb = empleados.find(empleado=>empleado.id === id);
    
    if(!empleadoDb){
        throw new Error('No existe un empleado con ese id')
    } else {
        return empleadoDb;
    }
}

let getSalario = async(empleado)=>{
    let salarioDb = salarios.find(salario=>salario.id === empleado.id);
    if(!salarioDb){
        throw new Error('No existe un salario para el empleado con ese id')
    } else {
        // Para retornar mas de un valor, se utiliza un objeto literal {}
        return({nombre:empleado.nombre, salario: salarioDb.salario});
    }
}

let getInformacion = async(id)=>{
    const empleado = await getEmpleado(id);
    // salarioEmpĺeado, Espeara a que se ejecute getEmpleado(id)
    const salarioEmpĺeado = await getSalario(empleado);
    // el return espera a que se ejecute salarioEmpĺeado y esto retorna una nueva promesa
    return `${salarioEmpĺeado.nombre} tiene un salario de ${salarioEmpĺeado.salario}`;
}

getInformacion(1).then(mensaje=>{
    console.log(mensaje);
}).catch(error=>{
    console.log(error);
});
