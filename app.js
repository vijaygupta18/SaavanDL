const fetch = require("node-fetch");
const express = require('express')
const bodyParser = require("body-parser");
const app = express()
app.set("view engine", "ejs");
app.use(bodyParser.urlencoded({
  extended: true
}));
var port = process.env.PORT || 3000;
app.use(express.static('public'));



// frontend backend connection

app.get("/", (req, res) => {
  songs="" 
    res.render("home",{songs:songs});
 
  });
  app.get("/favicon.ico", (req, res) => {
    songs="" 
      res.render("home",{songs:songs});
   
    });

app.post("/", (req, res) => {
    let song = req.body.song;
    if (song === "") res.redirect("/"); 
    else res.redirect("/songname/"+song);
  })
app.post("/:song", (req, res) => {
    let song = req.body.song;
    res.redirect("/songname/"+song);
  })

  app.get("/songname/:song", (req, res) => {
    var name = req.params.song;
    // console.log(typeof(name))

    console.log(name)
    grab(name);
    async function grab(name){
      var songs=  await songgrabber(name)
      for (let s=0;s<songs.length;s++) {
        if(songs[s]!=undefined)
        console.log(songs[s].song);}
      res.render("home",{songs:songs});

    }
  async function songgrabber(songname) {
  try{
    let url = "https://www.jiosaavn.com/api.php?__call=autocomplete.get&_format=json&_marker=0&cc=in&includeMetaTags=1&query=" + songname;
    var response = await fetch(url) //RUN RUN RUN
    var resdata = await response.json();
    var songdata = resdata['songs']['data']
    var songids = []
    var songs=[]
    
    for (let index = 0; index < songdata.length; index++) {
        const id = songdata[index]['id'];
        songids.push(id)
    }
    // console.log(songids)
    for(var i=0;i<songids.length;i++){
        let song= await singleidurl(songids[i])
        if(song!=undefined)
        songs.push(song);
    }
    return songs
  }catch (error) {}
  }


async function singleidurl(id){
  try{
    let url = "https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=" + id
    let response = await fetch(url)
    let resdata = await response.json()
    return helper(resdata[id])
  }catch (error) {}
}



function helper(data){
  try{
        if('media_preview_url' in data){
           var url = data['media_preview_url'];
           url = url.replace('preview', 'aac');
        }
  
        if(data['320kbps'] == 'true'){
            url = url.replace("_96_p.mp4", "_320.mp4")
        }
        else{
            url = url.replace("_96_p.mp4", "_160.mp4")
        }
        var dict = { 'song': data['song'], 'singers': data['singers'],'thumbnail':data['image'] ,'url': url}
        return dict
      }catch (error) {}
}

    
    
  })
  


  app.listen(port, () => {
    console.log(`Server Started at http://localhost:${port}`)
  })