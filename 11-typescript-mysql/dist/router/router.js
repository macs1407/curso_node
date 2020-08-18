"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const mysql_1 = __importDefault(require("../mysql/mysql"));
const router = express_1.Router();
router.get('/heroes', (req, resp) => {
    const query = 'Select * from heroes';
    mysql_1.default.ejecutarQuery(query, (err, heroes) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                msg: err
            });
        }
        resp.status(200).json({
            ok: true,
            heroes
        });
    });
});
router.get('/heroes/:id', (req, resp) => {
    let id = req.params.id;
    const idEscapado = mysql_1.default.instance.cnn.escape(id);
    const query = `Select * from heroes where id = ${idEscapado}`;
    mysql_1.default.ejecutarQuery(query, (err, heroe) => {
        if (err) {
            return resp.status(400).json({
                ok: false,
                msg: err
            });
        }
        resp.status(200).json({
            ok: true,
            heroe
        });
    });
});
exports.default = router;
