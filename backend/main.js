var express = require('express');
var app = express();
var mongoose = require('mongoose');
var bodyparser = require('body-parser');
var cors = require('cors');
// To add route
const route = require("./route/routes");

mongoose.connect("mongodb://localhost:27017/multiplex");
mongoose.connection.on('connected', ()=>{
  console.log("MongoDb is connected on port 27017");
})
mongoose.connection.on('error', (err)=>{
  console.error(err);
})

const PORT = 3000;
app.listen(PORT, ()=>{
  console.log("Server has been started on PORT "+ PORT);
})

/* Adding middlewares
  1. cors (co-ordinate between all the running ports)
  2. BODY_PARSER
*/
app.use(cors());
app.use(bodyparser.json());

// To route all the request with /api in them.
app.use("/api", route);

app.get('/',(req,res)=>{
  res.send("Hello World, Again");
})
