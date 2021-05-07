const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const helmet = require('helmet');
const jwt= require('jsonwebtoken');
const jwtPass = process.env.JWT_PASS;
const sequelize = ("./back/database/connection");
const md5= require('md5');

const userRoute= require('./back/routers/usuarios');
const regionRoute= require('./back/routers/regiones');
const companiasRoute= require('./back/routers/companias');
const contactosRoute= require('./back/routers/contactos');

app.use(helmet());
app.use(express.json());
app.use(cors());
app.use( bodyParser.json() );       
app.use(bodyParser.urlencoded({ extended: false }));

app.use(userRoute);
app.use(regionRoute);
app.use(companiasRoute);
 app.use(contactosRoute);

app.listen(3000, ()=> {
    console.log('Server is up on port '+ 3000);
});
