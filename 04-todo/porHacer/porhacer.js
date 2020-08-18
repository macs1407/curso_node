const fs = require('fs');

let listadoPorHacer = [];

const guardarDb = ()=>{
    let data = JSON.stringify(listadoPorHacer);

    fs.writeFile('db/data.json', data, (err)=>{
        if (err) throw new Error('No se pudo guardar ',err);
    });
}

const cargarDb = ()=>{
    try{
        listadoPorHacer = require('../db/data.json');
    }catch(error){
        listadoPorHacer = [];
    }
}

const crear = (descripcion)=>{
    cargarDb();
    let porHacer = {
        descripcion,
        completado:false
    }

    listadoPorHacer.push(porHacer);
    guardarDb();
    return porHacer;
}

const getListado = ()=>{
    cargarDb();
    return listadoPorHacer;
}

const actualizar = (descripcion, completado = true)=>{
    cargarDb();
    let index = listadoPorHacer.findIndex(hacer => hacer.descripcion === descripcion);
    if(index>=0){
        listadoPorHacer[index].completado = completado;
        guardarDb();
        return true;
    } else {
        return false;
    }
   
}

const borrar = (descripcion)=>{
    cargarDb();
    let nuevoListado = listadoPorHacer.filter(hacer => hacer.descripcion !== descripcion);
    if(listadoPorHacer.length !== nuevoListado.length){
        listadoPorHacer = nuevoListado;
        guardarDb();
        return true;
    } else {
        return false;
    }
}

module.exports = {
    crear,
    getListado,
    actualizar,
    borrar
}