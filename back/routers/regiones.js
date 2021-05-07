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

var arrayRegiones= [];
var arrayCiudades= [];
var arrayPaises= [];

//-------------------------------------REGIONES---------------------------------------//
//-------------------------------------VER REGIONES-------------------------------------//

router.get('/regiones', autenticarUsuario, (req, res)=> {
    sequelize.query(`SELECT * FROM regiones`, 
    { type: sequelize.QueryTypes.SELECT}
    ).then(function(projects) {
        res.json(projects);
    })
    .catch(err=> res.status(404).json({status_code: 404}));
})

//-------------------------------------CREAR REGION---------------------------------------//
router.post('/regiones', autenticarUsuario, (req, res)=> {
    let values= [req.body.nombre]

    sequelize.query('SELECT * FROM REGIONES WHERE NOMBRE= ?',
    {replacements: values,
    type: sequelize.QueryTypes.SELECT
    })
    .then(function(projects){
        console.log(projects);
        if (projects.length<=0) {
                sequelize.query("INSERT INTO regiones (nombre) VALUES (?)",
            {replacements: values})
            .then(function(p) {
                res.json({message: 'Región agregada'});
            })
        } else {
            throw new Error();
        }
    })
    .catch(err=> res.status(400).json({message: 'Región ya guardada', status_code: 400}))
    
})


//UPDATE REGION
router.patch('/regiones/:id', autenticarUsuario, (req,res)=> {
    let id_reg= req.params.id;
    
    let o = {
        nombre: req.body.nombre
    }

    let a= {};
    for (const property in o) {
        if (o[property]== undefined) {
            console.log('Skip');
        } else {
            a[`${property}`]= o[property];
        }
    }

    let stringOne= 'UPDATE regiones SET ';
    let stringTwo= [];
    for (const nuevo in a) {
        stringTwo.push(` ${nuevo} = '${a[nuevo]}'`);
    }
    let stringThree= ` WHERE ID= ${id_reg}`

    let stringFour= stringOne + stringTwo + stringThree;

    sequelize.query(stringFour)
    .then((r)=> {
        if (r[0].info.includes('Rows matched: 1')) {
            res.json({message: 'Region actualizada'});     
        } else {
            throw new Error();
        }
    })
    .catch((err)=> res.status(404).json({status_code: 404}));
})

//DELETE REGION
router.delete('/regiones/:id', autenticarUsuario, (req, res)=> {
    let id_reg= req.params.id;
    let values= [id_reg];

    sequelize.query('DELETE FROM regiones WHERE id= ?', {
    replacements: values
    })
    .then((r)=> {
        if (r[0].affectedRows== 0) {
            throw new Error();
        } else {
            res.json({message: 'Región eliminada'})
        }
    })
    .catch((err)=> res.status(404).json({status_code: 404}));
})



//-------------------------------------PAISES---------------------------------------//
//-------------------------------------VER PAISES-------------------------------------//
router.get('/paises/regiones/:id', autenticarUsuario, (req, res)=> {
    let values = [req.params.id];
    sequelize.query(`SELECT * FROM paises WHERE region_id= ? ORDER BY region_id`, 
    { replacements: values, 
    type: sequelize.QueryTypes.SELECT}
    ).then(function(projects) {
        res.json(projects);
    })
    .catch(err=> res.status(404).json({status_code: 404}));
})

//-------------------------------------CREAR PAISES-------------------------------------//
router.post('/paises', autenticarUsuario, (req, res)=> {
    let o = {
        region_id: req.body.region_id,
        nombre: req.body.nombre
    }
    let values= {
        region_id: o.region_id,
        nombre: o.nombre
    }

    sequelize.query('SELECT * FROM PAISES WHERE nombre= :nombre',
    {replacements: values,
    type: sequelize.QueryTypes.SELECT
    })
    .then(function(projects){
        console.log(projects);
        if (projects.length<=0) {
                sequelize.query("INSERT INTO paises (region_id, nombre) VALUES (:region_id, :nombre)",
            {replacements: values})
            .then(function(p) {
                res.json({message: 'País agregado'});
            })
        } else {
            throw new Error();
        }
    })
    .catch(err=> res.status(400).json({message: 'País ya guardado', status_code: 400}))
    
})

//UPDATE PAIS
router.patch('/paises/:id', autenticarUsuario, (req,res)=> {
    let id_pais= req.params.id;
    
    let o = {
        region_id: req.body.region_id,
        nombre: req.body.nombre
    }

    let a= {};
    for (const property in o) {
        if (o[property]== undefined) {
            console.log('Skip');
        } else {
            a[`${property}`]= o[property];
        }
    }

    let stringOne= 'UPDATE paises SET ';
    let stringTwo= [];
    for (const nuevo in a) {
        stringTwo.push(` ${nuevo} = '${a[nuevo]}'`);
    }
    let stringThree= ` WHERE ID= ${id_pais}`

    let stringFour= stringOne + stringTwo + stringThree;

    sequelize.query(stringFour)
    .then((r)=> {
        if (r[0].info.includes('Rows matched: 1')) {
            res.json({message: 'País actualizado'});     
        } else {
            throw new Error();
        }
    })
    .catch((err)=> res.status(404).json({status_code: 404}));
})

//DELETE PAIS
router.delete('/paises/:id', autenticarUsuario,  (req, res)=> {
    let id_pais= req.params.id;
    let values= [id_pais];

    sequelize.query('DELETE FROM paises WHERE id= ?', {
    replacements: values
    })
    .then((r)=> {
        if (r[0].affectedRows== 0) {
            throw new Error();
        } else {
            res.json({message: 'País eliminado'})
        }
    })
    .catch((err)=> res.status(404).json({status_code: 404}));
})


//-------------------------------------CIUDADES---------------------------------------//
//-------------------------------------VER CIUDADES-------------------------------------//
router.get('/ciudades/paises/:id', autenticarUsuario, (req, res)=> {
    let values = [req.params.id];
    sequelize.query(`SELECT * FROM ciudades WHERE pais_id= ? ORDER BY pais_id`, 
    { replacements: values, 
    type: sequelize.QueryTypes.SELECT}
    ).then(function(projects) {
        res.json(projects);
    })
    .catch(err=> res.status(404).json({status_code: 404}));
})

//------------------------VER TODAS LAS CIUDADES---------------------------
// router.get('/ciudades', authenticateUser, (req, res)=> {
//     sequelize.query(`SELECT * FROM ciudades ORDER BY pais_id`, 
//     {type: sequelize.QueryTypes.SELECT}
//     ).then(function(projects) {
//         res.json(projects);
//     })
//     .catch(err=> res.status(404).json({status_code: 404}));
// })


//-------------------------------------CREAR CIUDADES-------------------------------------//
router.post('/ciudades', autenticarUsuario, (req, res)=> {
    let o = {
        pais_id: req.body.pais_id,
        nombre: req.body.nombre
    }
    let values= {
        pais_id: o.pais_id,
        nombre: o.nombre
    }

    sequelize.query('SELECT * FROM PAISES WHERE nombre= :nombre',
    {replacements: values,
    type: sequelize.QueryTypes.SELECT
    })
    .then(function(projects){
        console.log(projects);
        if (projects.length<=0) {
                sequelize.query("INSERT INTO ciudades (pais_id, nombre) VALUES (:pais_id, :nombre)",
            {replacements: values})
            .then(function(p) {
                res.json({message: 'Ciudad agregada'});
            })
        } else {
            throw new Error();
        }
    })
    .catch(err=> res.status(400).json({message: 'Ciudad ya guardada', status_code: 400}))
    
})

//UPDATE CIUDAD
router.patch('/ciudades/:id', autenticarUsuario, (req,res)=> {
    let id_ciudad= req.params.id;
    
    let o = {
        pais_id: req.body.pais_id,
        nombre: req.body.nombre
    }

    let a= {};
    for (const property in o) {
        if (o[property]== undefined) {
            console.log('Skip');
        } else {
            a[`${property}`]= o[property];
        }
    }

    let stringOne= 'UPDATE ciudades SET ';
    let stringTwo= [];
    for (const nuevo in a) {
        stringTwo.push(` ${nuevo} = '${a[nuevo]}'`);
    }
    let stringThree= ` WHERE ID= ${id_ciudad}`

    let stringFour= stringOne + stringTwo + stringThree;

    sequelize.query(stringFour)
    .then((r)=> {
        if (r[0].info.includes('Rows matched: 1')) {
            res.json({message: 'Ciudad actualizada'});     
        } else {
            throw new Error();
        }
    })
    .catch((err)=> res.status(404).json({status_code: 404}));
})

//DELETE CIUDAD
router.delete('/ciudades/:id', autenticarUsuario, (req, res)=> {
    let id_ciudad= req.params.id;
    let values= [id_ciudad];

    sequelize.query('DELETE FROM ciudades WHERE id= ?', {
    replacements: values
    })
    .then((r)=> {
        if (r[0].affectedRows== 0) {
            throw new Error();
        } else {
            res.json({message: 'Ciudad eliminada'})
        }
    })
    .catch((err)=> res.status(404).json({status_code: 404}));
})

module.exports= router;