const mongoose = require('mongoose');
const express = require('express');
const router = express.Router();

//Modelos
let inmuebleSchema = require('../models/Inmuebles');

//Crear inmueble
router.route('/crear-inmueble').post((req, res, next) => {
    inmuebleSchema.create(req.body, (error, data) => {
        if (error){
            console.log(error);
            return next(error);
        }
        else{
            console.log(data);
            console.log("Inmueble creado correctamente");
            res.json(data);
        }
    });
});

//Leer inmuebles
router.route('/listar-inmuebles').get((req, res, next) =>{
    inmuebleSchema.find((error, data) => {
        if (error){
            console.log(error);
            return next(error);
        }
        else{
            console.log(data);
            res.json(data);
        }
    }).sort({nombre : 1});
});

//Actualizar inmuebles
router.route("/actualizar-inmueble/:id").put((req, res, next) =>{
    inmuebleSchema.findByIdAndUpdate(
        req.params.id,
        {
            $set: req.body
        },
        (error, data) =>{
            if (error){
                console.log(error);
                return next(error);
            }
            else{
                console.log(data);
                console.log("Inmueble actualizado correctamente");
                res.json(data);
            }
        }
    );
});

//Borrar inmuebles
router.route("/borrar-inmueble/:id").delete((req, res, next) =>{
    inmuebleSchema.findByIdAndRemove(req.params.id, (error, data) =>{
        if (error){
            console.log(error);
            return next(error);
        }
        else{
            console.log(data);
            console.log("Inmueble eliminado correctamente");
            res.status(200).json({
                msg : data
            });
        }
    });
});

//Obtener un inmueble
router.route("/obtener-estudiante/:id").get((req, res, next) =>{
    inmuebleSchema.findById(req.params.id, (error, data) =>{
        if (error){
            console.log(error);
            return next(error);
        }
        else{
            console.log(data);
            res.json(data);
        }
    });
});

//Busqueda de inmuebles
router.route('/busqueda-inmuebles/:texto').get((req, res, next) =>{
    inmuebleSchema.find(
        {Ciudad: {$regex: req.params.texto}}, 
        (error, data) => {
        if (error){
            console.log(error);
            return next(error);
        }
        else{
            console.log(data);
            res.json(data);
        }
    });
});

module.exports = router;