const http = require('http');
const express = require('express');
const app = express();

//2. seteamos urlenconded
app.use(express.urlencoded({extended:false}));
app.use(express.json());

//3. invocar dotenv
const dotenv = require('dotenv');
dotenv.config({path:'./env/.env'});

//recursos
app.use(express.static(__dirname+'/'));

//6. invocamos a bcryptjs
const bcryptjs= require('bcryptjs');

const session = require('express-session');
app.use(session({
secret:'secret',
resave:true,
saveUninitialized:true
}));

//8. Invocar modulo de conexion de bd
const connection = require('./database/db');
const { default: swal } = require('sweetalert');
const { ENGINE_METHOD_ALL } = require('constants');


//9 enrutamiento
app.get('/',(req,res) =>{
res.render('index.html')
});

//10. registrar dueño

app.post('/register', async (req, res)=>{
    const rut = req.body.rut;
    const nombre = req.body.nombre;
    const apellido = req.body.apellido;
    const telefono = req.body.telefono;
    const email = req.body.email;
    const comuna = req.body.comuna;
    connection.query('INSERT INTO dueño SET ?', {rut_Dueño:rut, nombre:nombre, apellido:apellido, telefono:telefono, email:email, comuna:comuna}, async(error, results)=>{
        if(error){
            console.log(error);
        }
    })
})

//registrar mascota
app.post('/register_mascota', async (req, res)=>{
    const nombre = req.body.nombre;
    const raza = req.body.raza;
    const rut_dueño = req.body.rut;
    
    connection.query('INSERT INTO mascota SET ?', {nombre:nombre, raza:raza, rut_Dueño:rut_dueño}, async(error, results)=>{
        if(error){
            console.log(error);
        }
    })

})


//login
app.post('/auth', async (req, res)=>{
    
    const user = req.body.rut_Veterinario;
    const pass = req.body.pass; 
    
    
    connection.query('SELECT * FROM veterinario WHERE rut_Veterinario= ? AND rut_Veterinario= ?', [user, pass], async (error, results, alert)=>{
     
        if(results.length == 0){
        console.log(results);
        alert = 'hola mundo';
        // console.log('Uusario y/o contraeña incorrecta');
         //res.send('Inicio incorrecto')
        
   
     }else{
        // console.log(results);
          
     }   
})
})
        

app.listen(4000, (req, res)=>{
    console.log('SERVER RUNNING IN http://localhost:4000');
})
       

