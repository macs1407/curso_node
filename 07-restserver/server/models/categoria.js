const mongosse = require('mongoose');
const Schema = mongosse.Schema;

let categoriaSchema = new Schema({
    descripcion: {
        type:String,
        unique:true,
        required:[true]
    },
    usuario:{
        type: Schema.Types.ObjectId, 
        ref:'Usuario'
    }
});

module.exports = mongosse.model('Categoria', categoriaSchema);