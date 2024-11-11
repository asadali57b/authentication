const express = require("express");
const http=require("http");
const socketio=require("socket.io");
const dBConnection=require("./db")
const helmet = require("helmet");

const userRouter=require("./routes/app_routes")
const app=express();
require("./event_driven_architecture/event_listener");

app.use(express.json());
const server=http.createServer(app);
const io=socketio(server);
app.use(helmet());

app.use('/api',userRouter);

const dBconnection=new dBConnection();
dBconnection.connect();

app.listen(6000,()=>{
    console.log("server started");
})