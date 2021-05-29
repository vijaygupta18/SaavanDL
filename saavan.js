const fetch = require("node-fetch");
const express = require('express')
const app = express()

var port = process.env.PORT || 3009;
app.use(express.static('dist'));



async function songidgrabber(songname) {
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
        songs.push(song)
    }
    return songs
  }


async function singleidurl(id){
    let url = "https://www.jiosaavn.com/api.php?__call=song.getDetails&cc=in&_marker=0%3F_marker%3D0&_format=json&pids=" + id
    let response = await fetch(url)
    let resdata = await response.json()
    return helper(resdata[id])
}



function helper(data){
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
}

