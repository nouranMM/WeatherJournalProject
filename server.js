// Setup empty JS object to act as endpoint for all routes
let projectData = {};
let port=3000;

// Require Express to run server and routes
const express=require("express");

// Start up an instance of app
const app=express();

/* Middleware*/
const bodyParser = require("body-parser");

//Here we are configuring express to use body-parser as middle-ware.
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Cors for cross origin allowance
const cors=require("cors");
app.use(cors());

// Initialize the main project folder
app.use(express.static('website'));

// Spin up the server
const server = app.listen(port, ()=>{console.log(`Server is running on ${port}`)});

//Get route
app.get('/all',callBack);

// Callback to debug
function callBack(req,res)
{
    res.send(projectData);

}


// Post Route

app.post('/addData', finalData);

function finalData(req,res){

  projectData = {
    Date: req.body.Date,
    Temperature: req.body.Temperature,
    Content: req.body.Content
  };
  res.send(projectData);
  
}


