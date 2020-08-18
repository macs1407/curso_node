import {Router, Request, Response } from 'express';
import MySQL from '../mysql/mysql';

const router = Router();

router.get('/heroes', (req: Request, resp: Response)=>{
    const query = 'Select * from heroes';
    MySQL.ejecutarQuery(query, (err:any, heroes:Object[])=>{
        if(err){
            return resp.status(400).json({
                ok:false,
                msg:err
            });
        }
        resp.status(200).json({
            ok:true,
            heroes
        });
    });
    
});

router.get('/heroes/:id', (req: Request, resp: Response)=>{
    let id = req.params.id;
    const idEscapado = MySQL.instance.cnn.escape(id);

    const query = `Select * from heroes where id = ${idEscapado}`;
    MySQL.ejecutarQuery(query, (err:any, heroe:Object[])=>{
        if(err){
            return resp.status(400).json({
                ok:false,
                msg:err
            });
        }
        resp.status(200).json({
            ok:true,
            heroe
        });
    });
});


export default router;