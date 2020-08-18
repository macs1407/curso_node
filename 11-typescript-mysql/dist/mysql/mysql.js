"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mysql = require("mysql");
class MySQL {
    constructor() {
        this.conectado = false;
        console.log('clase inicializada');
        this.cnn = mysql.createConnection({
            host: 'localhost',
            user: 'node_user',
            password: '123456',
            database: 'node'
        });
        this.conectarDb();
    }
    static get instance() {
        // this._instance = new this(): hace referencia al constructor
        return this._instance || (this._instance = new this());
    }
    static ejecutarQuery(sql, callback) {
        this.instance.cnn.query(sql, (err, results, fileds) => {
            if (err) {
                console.log('Error: ' + err);
                return callback(err);
            }
            if (results.length === 0) {
                callback('Sin resultados');
            }
            else {
                callback(null, results);
            }
        });
    }
    conectarDb() {
        // Establecer conexion
        this.cnn.connect((err) => {
            if (err) {
                console.log(err.message);
                return;
            }
            this.conectado = true;
            console.log('base de datos arriba');
        });
    }
}
exports.default = MySQL;
