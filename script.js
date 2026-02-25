const canvas=document.getElementById("carCanvas");
const ctx=canvas.getContext("2d");

const carType=document.getElementById("carType");
const colorPicker=document.getElementById("colorPicker");
const wheelSize=document.getElementById("wheelSize");
const heightAdjust=document.getElementById("heightAdjust");
const spoiler=document.getElementById("spoiler");
const ledLights=document.getElementById("ledLights");

let premium=false;
let rotation=0;

function drawBackground(){
let gradient=ctx.createLinearGradient(0,0,0,600);
gradient.addColorStop(0,"#1c1f26");
gradient.addColorStop(1,"#0f1115");
ctx.fillStyle=gradient;
ctx.fillRect(0,0,canvas.width,canvas.height);
}

function drawShadow(baseY){
ctx.fillStyle="rgba(0,0,0,0.4)";
ctx.beginPath();
ctx.ellipse(580,baseY+30,350,40,0,0,Math.PI*2);
ctx.fill();
}

function drawWheel(x,y,r){
ctx.fillStyle="#111";
ctx.beginPath();
ctx.arc(x,y,r,0,Math.PI*2);
ctx.fill();

ctx.strokeStyle="#888";
ctx.lineWidth=3;
for(let i=0;i<6;i++){
let angle=rotation+i*Math.PI/3;
ctx.beginPath();
ctx.moveTo(x,y);
ctx.lineTo(x+r*Math.cos(angle),y+r*Math.sin(angle));
ctx.stroke();
}

ctx.fillStyle="#222";
ctx.beginPath();
ctx.arc(x,y,r/3,0,Math.PI*2);
ctx.fill();
}

function drawCar(){
drawBackground();

let wheelRadius=parseInt(wheelSize.value);
let heightOffset=parseInt(heightAdjust.value);
let baseY=380+heightOffset;

drawShadow(baseY);

ctx.fillStyle=colorPicker.value;

if(carType.value==="sedan"){
ctx.fillRect(300,baseY-120,500,120);
}else if(carType.value==="sport"){
ctx.beginPath();
ctx.moveTo(300,baseY);
ctx.lineTo(820,baseY);
ctx.lineTo(750,baseY-150);
ctx.lineTo(420,baseY-110);
ctx.closePath();
ctx.fill();
}else{
ctx.fillRect(280,baseY-160,560,160);
}

ctx.fillStyle="rgba(200,220,255,0.4)";
ctx.fillRect(420,baseY-140,250,60);

if(spoiler.checked){
ctx.fillStyle="#333";
ctx.fillRect(750,baseY-160,100,12);
}

if(ledLights.checked && premium){
ctx.shadowColor="cyan";
ctx.shadowBlur=20;
ctx.fillStyle="cyan";
ctx.fillRect(280,baseY-50,40,12);
ctx.shadowBlur=0;
}

drawWheel(380,baseY,wheelRadius);
drawWheel(760,baseY,wheelRadius);

rotation+=0.05;
requestAnimationFrame(drawCar);
}

function saveProject(){
const data={
carType:carType.value,
color:colorPicker.value,
wheel:wheelSize.value,
height:heightAdjust.value,
spoiler:spoiler.checked
};
localStorage.setItem("autoProject",JSON.stringify(data));
alert("Guardado");
}

function loadProject(){
const data=JSON.parse(localStorage.getItem("autoProject"));
if(!data) return alert("No hay proyecto");
carType.value=data.carType;
colorPicker.value=data.color;
wheelSize.value=data.wheel;
heightAdjust.value=data.height;
spoiler.checked=data.spoiler;
alert("Cargado");
}

function downloadImage(){
const link=document.createElement("a");
link.download="AutoDesign.png";
link.href=canvas.toDataURL("image/png");
link.click();
}

function unlockPremium(){
let code=prompt("Código:");
if(code==="PRO2026"){
premium=true;
alert("Premium activado");
}else{
alert("Incorrecto");
}
}

drawCar();
