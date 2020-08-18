const mongoose = require('mongoose');

let rolesValidos = {
    values:['ADMIN_ROLE', 'USER_ROLE'],
    message:'{VALUE} no es un rol valido'
}

// Obtener el esquema para crearlos
let Schema = mongoose.Schema;

let usuarioSchema = new Schema({
    nombre:{
        type:String,
        required:[true, 'El nombre es obligatorio']
    },
    email:{
        type:String,
        unique:true,
        required:[true, 'El correo es obligatorio']
    },
    password:{
        type:String,
        required:[true, 'La contraseña es obligatoria']
    },
    img: {
        type: String,
        required: false
    },
    role:{
        type:String,
        enum:rolesValidos
    },
    estado:{
        type:Boolean,
        default:true
    },
    google:{
        type:Boolean,
        default:false
    }
});
// No devolver la contraseña
usuarioSchema.methods.toJSON = function(){
    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

module.exports = mongoose.model('Usuario', usuarioSchema);