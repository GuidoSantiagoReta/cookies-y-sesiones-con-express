
const express = require('express');
const app = express();
const session = require('express-session');
const MySQLStore = require('express-mysql-session')(session);

// Esta configuracin la tomamos de la documentación oficial de express-mysql-session.
//configuración en un objeto con los parametros para la conexión.
//El módulo crea por defecto una tabla en nuestra base de datos mysql.

const options = {
  host: 'localhost',
  port: '3306',
  user: 'root',
  password: '',
  database: 'prueba_mysql_session'
}

const sessionStore = new MySQLStore(options);
app.use(session({
   key:'session_cookie_user',
   secret:'session_cookie_secret',
   store: sessionStore,
   resave: false,
   saveUninitialized:false
}))



app.get('/',(req,res)=>{
 req.session.usuario ='Manuel Rodriguez';
 req.session.rol ='Admin';
 req.session.visitas  = req.session.visitas ? ++req.session.visitas : 1;
 console.log(req.session);
  res.send(`El usuario ${req.session.usuario} con el rol de ${req.session.rol} visito el sitio ${req.session.visitas} veces`)
});


app.listen(3000, (req,res)=>{
console.log('servidor corriendo con express')
});