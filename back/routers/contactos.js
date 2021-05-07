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

//------------------------------CONTACTOS-------------------------------------

//------------------------------VER CONTACTOS-------------------------------------

router.get('/contactos/:by', autenticarUsuario, (req, res)=> {
    let by= req.params.by;

    sequelize.query(`SELECT 
    contactos.id AS id,
    CONCAT(contactos.nombre, ' ', contactos.apellido) AS nombre,
    contactos.email AS email, contactos.cargo AS cargo, 
    contactos.interes AS interes, 
    contactos.direccion AS direccion,
    paises.nombre AS pais,
    regiones.nombre AS region,
    companias.nombre AS compania
    FROM contactos 
    JOIN ciudades ON contactos.ciudad_id= ciudades.id 
    JOIN paises ON paises.id = ciudades.pais_id
    JOIN regiones ON regiones.id= paises.region_id
    JOIN companias ON companias.id= contactos.compania_id
    ORDER BY ${by}
    `, 
    { type: sequelize.QueryTypes.SELECT}
    ).then(function(projects) {
        res.json(projects);
    })
    .catch(err=> res.status(404).json({status_code: 404}));
});

//-------------------------------VER UN SOLO CONTACTO-----------------------------
router.get('/contactos/contacto/:id', autenticarUsuario, (req, res)=> {
    let id= req.params.id;

    sequelize.query(`SELECT 
    contactos.id AS id,
    contactos.nombre AS nombre,
    contactos.apellido AS apellido,
    contactos.email AS email, contactos.cargo AS cargo, 
    contactos.interes AS interes, 
    contactos.direccion AS direccion,
    paises.nombre AS pais,
    paises.id AS idPais,
    regiones.nombre AS region,
    regiones.id AS idRegion,
    ciudades.nombre AS ciudad,
    companias.nombre AS compania
    FROM contactos 
    JOIN ciudades ON contactos.ciudad_id= ciudades.id 
    JOIN paises ON paises.id = ciudades.pais_id
    JOIN regiones ON regiones.id= paises.region_id
    JOIN companias ON companias.id= contactos.compania_id
    WHERE contactos.id= ${id}
    `, 
    { type: sequelize.QueryTypes.SELECT}
    ).then(function(projects) {
        res.json(projects);
    })
    .catch(err=> res.status(404).json({status_code: 404}));
});


//------------------------------CREAR CONTACTO-------------------------------------
router.post('/contactos', autenticarUsuario, (req, res)=> {
    let o = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        cargo: req.body.cargo,
        interes: req.body.interes,
        direccion: req.body.direccion,
        ciudad_id: req.body.ciudadId,
        compania_id: req.body.companiaId,
        canales: req.body.canales
    }

    let values= {
        nombre: o.nombre,
        apellido: o.apellido,
        email: o.email,
        cargo: o.cargo,
        interes: o.interes,
        direccion: o.direccion,
        ciudad_id: o.ciudad_id,
        compania_id: o.compania_id
    }

    console.log(o.canales);

    sequelize.query('SELECT * FROM contactos WHERE email= :email',
    {replacements: values,
    type: sequelize.QueryTypes.SELECT
    })
    .then(function(projects){
        console.log(projects);
        if (projects.length<=0) {
                sequelize.query("INSERT INTO contactos (nombre, apellido, email, cargo, interes, direccion, ciudad_id, compania_id) VALUES (:nombre, :apellido, :email, :cargo, :interes, :direccion, :ciudad_id, :compania_id)",
            {replacements: values})
            .then(function(p) {
                let idContacto= p[0]

                let stringCanal= [];
                for (let u=0; u<o.canales.length; u++) {
                    stringCanal.push(`("${o.canales[u].cuenta}", "${o.canales[u].preferencia}", ${idContacto}, ${o.canales[u].canal})`);
                }

                values.stringCanal= stringCanal.join();

                sequelize.query(`INSERT INTO contacto_canales (usuario, preferencias, contacto_id, canal_id) VALUES ${stringCanal.join()}`,
                {replacements: values})
                .then(function(m) {
                    res.json({message: 'Contacto creado'});
                })
                .catch(err=> console.error(err))

            })
        } else {
            throw new Error();
        }

    })
    .catch(err=> res.status(400).json({message: 'Contacto ya guardado', status_code: 400}))
    
})

//UPDATE CONTACTO
router.patch('/contactos/:id', autenticarUsuario, (req,res)=> {
    let id_contacto= req.params.id;

    let o = {
        nombre: req.body.nombre,
        apellido: req.body.apellido,
        email: req.body.email,
        cargo: req.body.cargo,
        interes: req.body.interes,
        direccion: req.body.direccion,
        ciudad_id: req.body.ciudadId,
        compania_id: req.body.companiaId,
    }

    let a= {};
    for (const property in o) {
        if (o[property]== undefined) {
            console.log('Skip');
        } else {
            a[`${property}`]= o[property];
        }
    }

    let stringOne= 'UPDATE contactos SET ';
    let stringTwo= [];
    for (const nuevo in a) {
        stringTwo.push(` ${nuevo} = '${a[nuevo]}'`);
    }
    let stringThree= ` WHERE ID= ${id_contacto}`

    let stringFour= stringOne + stringTwo + stringThree;

    sequelize.query(stringFour)
    .then((r)=> {
        if (r[0].info.includes('Rows matched: 1')) {
            o.canales= req.body.canales;
            for (let m=0; m<o.canales.length; m++) {
                let canalId= o.canales[m].canal;
                let usuario= o.canales[m].cuenta;
                let preferencias= o.canales[m].preferencia;
                
                sequelize.query(`SELECT * FROM contacto_canales WHERE contacto_id= ${id_contacto} AND canal_id = ${canalId}`, {
                type: sequelize.QueryTypes.SELECT
                })
                .then((l)=> {
                    console.log(l.length);
                    if (l.length == 0) {
                        sequelize.query(`INSERT INTO contacto_canales (usuario, preferencias, contacto_id, canal_id) VALUES ('${usuario}', '${preferencias}', ${id_contacto}, ${canalId} )`)
                        .then((u)=> console.log('continue'))
                    } else {
                        sequelize.query(`UPDATE contacto_canales SET usuario= '${usuario}', preferencias= '${preferencias}' WHERE contacto_id= ${id_contacto} AND canal_id= ${canalId}`)
                        .then((e)=> {
                            if (e[0].info.includes('Rows matched: 1')) {
                                console.log('continue')
                            }
                        })
                    }
                })
                .catch(err=> console.error(err));
            }
        
            res.json({message: 'Contacto actualizado'})
        } else {
            throw new Error();
        }
    })
    .catch((err)=> res.status(404).json({status_code: 404}));
})



//DELETE CONTACTO
router.delete('/contactos/:id', autenticarUsuario, (req, res)=> {
    let id_contacto= req.params.id;
    let values= [id_contacto];

    sequelize.query('DELETE FROM contactos WHERE id= ?', {
    replacements: values
    })
    .then((r)=> {
        if (r[0].affectedRows== 0) {
            throw new Error();
        } else {
            res.json({message: 'Contacto eliminado'})
        }
    })
    .catch((err)=> res.status(404).json({status_code: 404}));
})

//--------------------------------VER CANALES-------------------------------------
router.get('/canales', autenticarUsuario, (req, res)=> {
    sequelize.query(`SELECT * FROM canales`, 
    { type: sequelize.QueryTypes.SELECT}
    ).then(function(projects) {
        res.json(projects);
    })
    .catch(err=> res.status(404).json({status_code: 404}));
});

//--------------------------------VER CANALES DE UN CONTACTO-------------------------------------
router.get('/contactos/contacto_canales/:id', autenticarUsuario, (req, res)=> {
    let id= req.params.id;
    let values = [id];
    sequelize.query(`SELECT canales.nombre AS canal, canales.id AS canalId, contacto_canales.usuario AS usuario,
    contacto_canales.preferencias AS preferencia FROM contacto_canales JOIN canales ON contacto_canales.canal_id = canales.id WHERE contacto_canales.contacto_id= ?`, 
    { replacements: values, 
    type: sequelize.QueryTypes.SELECT}
    ).then(function(projects) {
        res.json(projects);
    })
    .catch(err=> res.status(404).json({status_code: 404}));
});


//-----------------------------------SEARCH CONTACTO----------------------------------
router.post('/contactos/search/:by', autenticarUsuario, (req, res)=> {
    let by= req.params.by;
    let nombre= req.body.nombre;
    let cargo= req.body.cargo;
    let pais= req.body.pais;
    let compania= req.body.compania;
    let canal= req.body.canal;
    let interes= req.body.interes;

    let stringDos;
    let stringTres;
    let stringCuatro;
    let stringCinco;

    if (nombre != '') {
        stringDos= `contactos.nombre like "%${nombre}%"`;
    } else {
        stringDos= "";
    }

    if (cargo != '') {
    stringTres= `cargo like "%${cargo}%"`
    } else {
        stringTres= "";
    }

    if (pais == 'any') {
        stringCuatro= "";
    } else {
        stringCuatro= `regiones.id =${pais} or paises.id= ${pais}`;
    }

    if (compania == 'any') {
        stringCinco= "";
    } else {
        stringCinco= `companias.id = ${compania}`;
    }

    if (canal == 'any') {
        stringSeis= "";
    } else {
        stringSeis= `contacto_canales.canal_id= ${canal}`;
    }

    if (interes== 'any') {
        stringSiete= '';
    } else {
        stringSiete= `interes= ${interes}`;
    }

    let arr= [stringDos, stringTres, stringCuatro, stringCinco, stringSeis, stringSiete];

    for (let m=0; m<arr.length; m++) {
            if (arr[m+1] || arr[m+2] || arr[m+3] || arr[m+4] || arr[m+5] || arr[m+6]) {
                if (arr[m].length>0 && (arr[m+1].length>0 || arr[m+2].length>0 || arr[m+3].length>0 || arr[m+4].length>0 || arr[m+4].length>0 || arr[m+5].length>0)) {
                    arr[m] += ' AND';
                }
            }
            
    }

    for (let p=0; p<arr.length; p++) {
        if (arr[p].length>0) {
            let n= `WHERE ${arr[p]}`;
            arr[p]= n;
            p= arr.length-1;
        }
    }
    

    console.log(arr.join(' '));

    sequelize.query(`select 
    contactos.id AS id,
    contactos.nombre AS nombre,
    contactos.apellido AS apellido,
    contactos.email AS email,
    contactos.cargo AS cargo,
    contactos.interes AS interes,
    ciudades.nombre AS ciudad,
    ciudades.id AS ciudad_id,
    paises.nombre AS pais,
    paises.id AS pais_id,
    regiones.nombre AS region,
    regiones.id AS region_id,
    canales.nombre AS canal,
    companias.nombre AS compania
    from contactos join companias on companias.id= contactos.compania_id join ciudades on ciudades.id= contactos.ciudad_id join
    paises on paises.id = ciudades.pais_id join regiones on regiones.id= paises.region_id join contacto_canales ON contacto_canales.contacto_id= contactos.id join canales on contacto_canales.canal_id= canales.id ${arr.join(' ')} ORDER BY ${by} `, 
    { type: sequelize.QueryTypes.SELECT}
    ).then(function(projects) {
        res.json(projects);
    })
    .catch(err=> res.status(404).json({status_code: 404}));

})



module.exports= router;

