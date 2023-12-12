const express = require ('express');
const app = express();
const bodyParser = require('body-parser');
const port = 3500;

const userRouter = require('./routers/users.router');
//Routers, rutas post-get-delete-put-patch-header-options
//app.METHOD(path,handler);
const clientRouter = require('./routers/clients.router');
const loginRouter = require('./routers/login.router');


app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

/**ERROR HANDLER */
const errorHandler=(error,req,resp,next)=>{
    const status = error.status || 400;
    resp.status(status).json({ error: true, message: error.message });

}
/**ERROR PATH */
const invalidPathHandler = (req,resp,next) =>{
    resp.status(400)
    resp.json({ error: true, message: 'INVALIDA LA RUTA'});
}

/*app.get('/',(req,res )=>{
    res.json({'message':'Welcome pascuala.'});
    //send envia datos de cualquier tipo
    //json envia respuesta en json
    //end finaliza el proceso de respuesta
});*/

app.use('/users',userRouter); 
app.use('/clients',clientRouter);
app.use('/login',loginRouter);

app.use(errorHandler);
app.use(invalidPathHandler);

app.listen(port, ()=>{
    console.log("Welcome to http://localhost:"+port)
})