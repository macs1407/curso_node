import mysql = require('mysql'); 

export default class MySQL{
    private static _instance: MySQL;
    cnn: mysql.Connection;
    conectado:boolean = false;

    constructor(){
        console.log('clase inicializada');
        this.cnn = mysql.createConnection({
            host     : 'localhost',
            user     : 'node_user',
            password : '123456',
            database : 'node'
        });
        this.conectarDb();
        
    }

    public static get instance(){
        // this._instance = new this(): hace referencia al constructor
        return this._instance || (this._instance = new this());
    }

    public static ejecutarQuery(sql:string, callback: Function){
        this.instance.cnn.query(sql, (err, results: Object[], fileds:any)=>{
            if(err){
                console.log('Error: '+err);
                return callback(err);
            }
            if(results.length === 0){
                callback('Sin resultados');
            } else {
                callback(null, results);
            }            
        });
    }

    private conectarDb(){
        // Establecer conexion
        this.cnn.connect((err:mysql.MysqlError)=>{
            if(err){
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('base de datos arriba');
        });
    }
}