require('dotenv').config();
const express=require('express');
const http=require('http')
const cors=require('cors');
const bodyParser=require('body-parser');

const multer=require('multer')
const storage = multer.memoryStorage();

const fileUpload=require('express-fileupload');
const path = require('path');

require('./configs/database')();

const app=express();

const corsOptions = {
    origin: 'http://localhost:3000', // Replace with your allowed origin
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Enable cookies and HTTP authentication headers
    optionsSuccessStatus: 204, // Respond with 204 No Content for preflight requests
};
  
app.use(cors());

// Middleware to parse JSON data
app.use(bodyParser.json());

// Middleware to parse URL-encoded data
app.use(bodyParser.urlencoded({ extended: true }));

// Set up multer for handling file uploads
// global.upload = multer({ storage: storage });
app.use(fileUpload({
    limits:{
        fileSize:100*1024*1024
    }
}))
app.use(require('./middlewares/auth.middleware'))

app.use(`/${process.env.BASE_URL}`,require('./routers'));
const server=http.createServer(app);

server.listen(process.env.HTTP_PORT,()=>{
    console.log(`Backend Started on PORT:${process.env.HTTP_PORT}`);
})

