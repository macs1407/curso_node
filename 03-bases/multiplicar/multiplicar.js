// requires
const fs = require('fs');
const colors = require('colors');

const crearArchivo = (base, limite = 10)=>{
    return new Promise((resolve, reject)=>{
        if(!Number(base)){
            reject('La base debe ser numerica');
            return;
        }
        let data = '';

        for(let i= 1; i <=limite; i++){
            data += `${base} * ${i } = ${base*i}\n` ;
        }

        fs.writeFile(`archivos/tabla-${base}`, data, (err)=>{
            if(err) reject(err);
            else
            resolve(`tabla-${base}.txt`)
        });
    });
}

let listar = (base, limite = 10)=>{
    console.log('-------------------------------'.red);
    console.log(`---------tabla de ${base}------------`.red);
    console.log('-------------------------------'.red);
    for(let i= 1; i <=limite; i++){
       console.log(`${base} * ${i} = ${base*i}`);
    }

}
// Exportar la funcion
module.exports = {
    crearArchivo,
    listar
};

