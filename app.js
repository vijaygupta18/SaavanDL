const fetch = require("node-fetch");
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
var cors = require('cors')
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
var port = process.env.PORT || 3000;
app.use(express.static('public'));

app.use(cors())
// frontend backend connection

app.get("/", (req, res) => {
  songs="" 
    res.render("index");
 
  });
app.get("/home", (req, res) => {
  songs="" 
    res.render("home");
 
  });
  // app.get("/favicon.ico", (req, res) => {
  //   songs="" 
  //     res.render("home",{songs:songs});
   
  //   });

app.post("/", (req, res) => {
    let user = req.body.username;
    let pass = req.body.pass;
    if (user === "vijaygupta18" && pass==="fasalapp") res.redirect("/home"); 
    else res.redirect("/");
  })
app.post("/search", (req, res) => {
    let movie = req.body.moviename;
    // console.log(movie)
    res.redirect("/movie/"+movie);
  })

  app.get("/movie/:moviename", (req, res) => {
    var name = req.params.moviename;
    // console.log(typeof(name))

    // console.log(name)
    grab(name);
    async function grab(name){
      var movies=  await moviegrabber(name)
      for (let s=0;s<movies.length;s++) {
        if(movies[s]!=undefined)
        console.log(movies[s]);}
      res.render("home",{movies:movies});

    }
  async function moviegrabber(moviename) {
  try{
    let url = "https://www.omdbapi.com/?s="+moviename+"&apikey=afd6951f";
    var response = await fetch(url) //RUN RUN RUN
    var resdata = await response.json();
    // console.log(resdata);
    var moviedata = resdata['Search']
   
  
    return moviedata;
  }catch (error) {}
  }
  
  })
  
  app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`)
  })