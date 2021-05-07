const express= require('express');
const jwt= require('jsonwebtoken');
const jwtPass = process.env.JWT_PASS;
const sequelize= require('../database/connection');
const bodyParser = require('body-parser');
const cors = require('cors');
const md5= require('md5');
const {hashPassword, autenticarUsuario, isAdmin} = require('../middleware/middlewares');

//CREATE NEW ROUTER
const router= new express.Router();

router.use(express.json());
router.use(cors());
router.use( bodyParser.json() );       
router.use(bodyParser.urlencoded({ extended: false }));

//------------------------------COMPANIAS-------------------------------------

//------------------------------VER COMPANIAS-------------------------------------

router.get('/companias', autenticarUsuario, (req, res)=> {
    sequelize.query(`SELECT paises.nombre AS pais, companias.id, companias.nombre, companias.email,
    companias.direccion, companias.telefono FROM companias JOIN ciudades ON ciudades.id= companias.ciudad_id JOIN paises ON paises.id = ciudades.pais_id`, 
    { type: sequelize.QueryTypes.SELECT}
    ).then(function(projects) {
        res.json(projects);
    })
    .catch(err=> res.status(404).json({status_code: 404}));
});

//------------------------------VER UNA COMPANIA-------------------------------------

router.get('/companias/:id', autenticarUsuario, (req, res)=> { 
    let id= req.params.id;
    let values= [id];
    sequelize.query(`SELECT companias.id, ciudades.nombre AS ciudad, companias.nombre, companias.email,
    companias.direccion, companias.telefono FROM companias JOIN ciudades ON ciudades.id= companias.ciudad_id WHERE companias.id = ?`, 
    { replacements: values, type: sequelize.QueryTypes.SELECT}
    ).then(function(projects) {
        res.json(projects);
    })
    .catch(err=> res.status(404).json({status_code: 404}));
});

//------------------------------CREAR COMPANIAS-------------------------------------
router.post('/companias', autenticarUsuario, (req, res)=> {
    let o = {
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        ciudad: req.body.ciudad
    }

    let values= {
        nombre: o.nombre,
        email: o.email,
        telefono: o.telefono,
        direccion: o.direccion,
        ciudad: o.ciudad
    }

    sequelize.query('SELECT id FROM ciudades WHERE nombre= :ciudad',
    {replacements: values,
    type: sequelize.QueryTypes.SELECT})
    .then((h)=> {
        if (h.length<=0) {
            res.status(404).json({message: 'Ciudad no encontrada'});
        } else {
            console.log(h);
            values.ciudad_id= h[0].id;
            sequelize.query('SELECT * FROM companias WHERE nombre= :nombre',
            {replacements: values,
            type: sequelize.QueryTypes.SELECT
            })
            .then(function(projects){
                if (projects.length<=0) {
                        sequelize.query("INSERT INTO companias (nombre, email, telefono, direccion, ciudad_id) VALUES (:nombre, :email, :telefono, :direccion, :ciudad_id)",
                    {replacements: values})
                    .then(function(p) {
                        res.json({message: 'Compañía agregada'});
                    })
                } else {
                    throw new Error();
                }
            })

        }
    })
    .catch(err=> res.status(400).json({message: 'Compañia ya guardada', status_code: 400}))

    
    
    
})

//UPDATE COMPANIA
router.patch('/companias/:id', autenticarUsuario,(req,res)=> {
    let id_comp= req.params.id;
    
    let o = {
        nombre: req.body.nombre,
        email: req.body.email,
        telefono: req.body.telefono,
        direccion: req.body.direccion,
        ciudad_id: req.body.ciudadId
    }

    let a= {};
    for (const property in o) {
        if (o[property]== undefined) {
            console.log('Skip');
        } else {
            a[`${property}`]= o[property];
        }
    }

    let stringOne= 'UPDATE companias SET ';
    let stringTwo= [];
    for (const nuevo in a) {
        stringTwo.push(` ${nuevo} = '${a[nuevo]}'`);
    }
    let stringThree= ` WHERE ID= ${id_comp}`

    let stringFour= stringOne + stringTwo + stringThree;

    sequelize.query(stringFour)
    .then((r)=> {
        if (r[0].info.includes('Rows matched: 1')) {
            res.json({message: 'Compañia actualizada'});     
        } else {
            throw new Error();
        }
    })
    .catch((err)=> res.status(404).json({status_code: 404}));
})

//DELETE COMPANIA
router.delete('/companias/:id', autenticarUsuario,  (req, res)=> {
    let id_comp= req.params.id;
    let values= [id_comp];

    sequelize.query('DELETE FROM companias WHERE id= ?', {
    replacements: values
    })
    .then((r)=> {
        if (r[0].affectedRows== 0) {
            throw new Error();
        } else {
            res.json({message: 'Compañía eliminada'})
        }
    })
    .catch((err)=> res.status(404).json({status_code: 404}));
})


module.exports= router;