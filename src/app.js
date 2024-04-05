// ************ Require's ************
const createError = require('http-errors');
const cookieParser = require('cookie-parser');
const express = require('express');
const logger = require('morgan');
const path = require('path');
const methodOverride =  require('method-override'); // Pasar poder usar los métodos PUT y DELETE
const dataLocal = require('./middlewares/validations/dataLocal'); 
const saveSession  = require('./middlewares/validations/saveSession');
const session = require ("express-session");  

// ************ express() - (don't touch) ************
const app = express();

// ************ Middlewares - (don't touch) ************
app.use(express.static('public'));
app.use(express.static(path.join(__dirname, '../public')));  // Necesario para los archivos estáticos en el folder /public
app.use(express.urlencoded({ extended: false }));
app.use(logger('dev'));
app.use(express.json());
app.use(cookieParser());
app.use(methodOverride('_method')); // Pasar poder pisar el method="POST" en el formulario por PUT y DELETE
app.use(session({secret: "Secreto",resave: false, saveUninitialized: false})) //CRPG
app.use(dataLocal);

app.use(saveSession);



// ************ Template Engine - (don't touch) ************
app.set('view engine', 'ejs');
app.set('views',[
  path.join(__dirname, '/views'),
  path.join(__dirname, '/views/admin'),
  path.join(__dirname, '/views/autentication'),
  path.join(__dirname, '/views/cart'),
  path.join(__dirname, '/views/other'),
  path.join(__dirname, '/views/products'),
  path.join(__dirname, '/views/users')
]); // Define la ubicación de la carpeta de las Vistas

// ************ WRITE YOUR CODE FROM HERE ************
// ************ Route System require and use() ************

const otherRouter = require('./routes/other.routes'); // Rutas main
const adminRouter = require('./routes/admin.routes'); // Rutas admin
const authRouter = require("./routes/authentication.routes"); // Rutas autentication
const prodRouter = require("./routes/products.routes"); // Rutas products
const cartRouter = require("./routes/cart.routes");
const userRouter = require("./routes/users.routes");
const { check } = require('express-validator');

/* ROUTES */
app.use('/', otherRouter);
app.use('/admin', adminRouter);
app.use('/', userRouter);
app.use("/autenticacion", authRouter);
app.use("/productos", prodRouter);
app.use("/carrito-compra", cartRouter);
app.use((req,res,next)=>{
  res.status(404).render("other/notFound")
})

// ************ DON'T TOUCH FROM HERE ************
// ************ catch 404 and forward to error handler ************
app.use((req, res, next) => next(createError(404)));

// ************ error handler ************
app.use((err, req, res, next) => {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.path = req.path;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('other/error');
});

// ************ exports app - dont'touch ************
module.exports = app;