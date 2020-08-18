// Configuracion del puerto
process.env.PORT = process.env.PORT || 3001; 
// Configuracion de entorno
process.env.NODE_ENV = process.env.NODE_ENV || 'dev'; 

let urlDb;
if(process.env.NODE_ENV === 'dev'){
    urlDb = 'mongodb://localhost:27017/cafe';
} else {
    urlDb = 'mongodb+srv://macs1407:P2eZZQRF8NA4rhtW@cluster0-gryds.mongodb.net/cafe';
}
process.env.URLDB = urlDb;

// Configuracion del secret
process.env.SECRET = 'MiLlave';
process.env.EXPITE_TOKEN='24h';

// Google cliente id
process.env.CLIENT_ID='40635216762-kkjce6esbv3oo22lol1a6rlk404pdlkm.apps.googleusercontent.com';