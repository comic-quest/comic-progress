

(function() {
  var requestAnimationFrame = window.requestAnimationFrame || window.mozRequestAnimationFrame ||
                              window.webkitRequestAnimationFrame || window.msRequestAnimationFrame;
  window.requestAnimationFrame = requestAnimationFrame;
})();

window.cancelAnimationFrame = window.cancelAnimationFrame ||
        window.mozCancelAnimationFrame || window.webkitCancelAnimationFrame ||
        window.msCancelAnimationFrame;


var lastsecond;

var flashtime = new Date();

flashtime.setUTCFullYear(2018);
flashtime.setUTCMonth(9);
flashtime.setUTCDate(12);
flashtime.setUTCHours(21,0,0,0);

console.log(flashtime.toString())

var time = new Date()
var reqanim;


var zerotime=new Date();

zerotime.setUTCFullYear(2018);
zerotime.setUTCMonth(8);
zerotime.setUTCDate(30);
zerotime.setUTCHours(9,0,0,0);

if(zerotime.getTime()>time.getTime()){
  
  var isready = false;
   
   }else{
   var isready = true;
   }

console.log(zerotime.toString())

var timedisplay = document.getElementById("timedisplay")
var percentage = document.getElementById("percentage")

var canvas = document.getElementById("canvas")

canvas.width=450;
canvas.height=75;

var ctx = canvas.getContext("2d");


  var socket = io('https://comic-progress2.glitch.me/');
  socket.on('yeet', function (data) {
    console.log(data);
    socket.emit('my other event', { my: 'data' });
  });




function drawBar(percent){
  
ctx.clearRect(0,0,canvas.width,canvas.height)
  
  ctx.beginPath();
ctx.arc(37.5,37.5,37.5,0,2*Math.PI);
  ctx.fillStyle="rgb(127,127,127)"
ctx.fill();

  ctx.fillRect(37.5,0,375,75);
  
  ctx.beginPath();

ctx.arc(412.5,37.5,37.5,0,2*Math.PI);

ctx.fill();
  
  
  
ctx.save();
  ctx.beginPath();
  ctx.rect(0,0,450*percent,75);
  ctx.clip()
  
  ctx.beginPath();
ctx.arc(37.5,37.5,37.5,0,2*Math.PI);
  ctx.fillStyle="green"
ctx.fill();

  ctx.fillRect(37.5,0,375,75);
  
  ctx.beginPath();
ctx.arc(412.5,37.5,37.5,0,2*Math.PI);
ctx.fill();
  
  ctx.restore();

}

function getPercent(min,max,value){

 return ((value - min) / (max - min))

}

drawBar(getPercent(zerotime.getTime(),flashtime.getTime(),new Date().getTime()));

function getTime(millisecs){

  if (isNaN(millisecs) || millisecs < 0) {
    return undefined;
  }

  var d, h, m, s, ms;
  s = Math.floor(millisecs / 1000);
  m = Math.floor(s / 60);
  s = s % 60;
  if(lastsecond){
     if(lastsecond===s){
        return undefined
        }
     }
  lastsecond=s;
  h = Math.floor(m / 60);
  m = m % 60;
  d = Math.floor(h / 24);
  h = h % 24;
  ms = Math.floor((millisecs % 1000) * 1000) / 1000;
  return { d: d, h: h, m: m, s: s, ms: ms };

  
}



 

reqanim = requestAnimationFrame(main);

function main(){
  reqanim = requestAnimationFrame(main)
  var now = new Date()

  if((flashtime.getTime()-now.getTime())>=0){
     
     
     
  
  var showtime = getTime(flashtime.getTime()-now.getTime())
if(showtime){
   
  timedisplay.innerHTML=showtime.d+" Días "+showtime.h+" Horas "+showtime.m+" Minutos "+showtime.s+" Segundos ";
  var numb = getPercent(zerotime.getTime(),flashtime.getTime(),now.getTime())*100
  //numb = numb.toFixed(2);
  var temp = "";
  var arr = (numb+"").split(".");
    temp+=arr[0]
    if(arr.length>1){
       temp+=",";
    temp+=arr[1].substring(0,2)
       }
  
       

  temp+="%"
  
  percentage.innerHTML=temp
  
}else{
   return
   }
   
    
}else{
    
     cancelAnimationFrame(reqanim)
      percentage.innerHTML="100%"
      timedisplay.innerHTML="El flash está listo."
    drawBar(1);
    
}
    
}

setInterval(function(){

  drawBar(getPercent(zerotime.getTime(),flashtime.getTime(),new Date().getTime()));
  
},30000);




