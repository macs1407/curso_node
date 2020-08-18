// Un callback es una funcion que se ejecuta dentro de otra
setTimeout(function(){
    console.log('Callback');
},3000);

let getUsuariobyId = (id, callback)=>{
    let usuario = {
        nombre:'maikol',
        id:id
    }
    if(id === 20){
        console.log('El usuario con id 20 no existe');
    } else {
        // Cuando no hay error, el primer argumento del callback se manda en nulo
        callback(null, usuario);
    }
}
// (error, usuario) esto es el callback
getUsuariobyId(1, (error, usuario)=>{
    if(error){
        console.log(error);
        return;
    }
    console.log('Usuario de base de datos ', usuario)
});