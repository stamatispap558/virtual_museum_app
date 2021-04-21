function createEkthemata(ekthemata){

var shuffledEkthemata = shuffleArray(ekthemata);
var mikrografies = document.querySelector(".mikrografies");

for (let i = 0; i < ekthemata.length; i++) {
  let img = document.createElement("img"); //<img>
  img.setAttribute("src", shuffledEkthemata[i].img);
  img.setAttribute("alt", shuffledEkthemata[i].ex_description);
  img.setAttribute("title", shuffledEkthemata[i].ex_description);
  img.setAttribute("titlos", shuffledEkthemata[i].object_name);
  img.setAttribute("index", i);
  //img.titlos = "123fsdf";
  //{titlos: 123}
  console.log("img.titlos", img.getAttribute("titlos"));
  mikrografies.appendChild(img);
}



function getRndInteger(min, max) {
  return Math.floor(Math.random() * (max - min)) + min;
}

function prevbuttonclick(){

  var imgAct = document.querySelector(".panel-main img");
  let imgsrc = imgAct.src
  imgsrc=imgsrc.slice(imgsrc.indexOf("img"),-1);
  imgsrc= "./"+imgsrc +"g";
  console.log(imgsrc);
  let index=-1;
  for(let i=0; i<shuffledEkthemata.length;i++){
    console.log(shuffledEkthemata[i].img);
    if(imgsrc==shuffledEkthemata[i].img)
      index=i;

  }
  console.log(index);
  if(index==0)
    index=shuffledEkthemata.length-1;
  else
    index--;
  const main = document.getElementById("selected");
  main.src = shuffledEkthemata[index].img;
  main.title = shuffledEkthemata[index].ex_description;
  const description = document.getElementById("description");
  description.innerHTML = `${shuffledEkthemata[index].ex_description}`;
  const titlos = document.getElementById("Titlos");
  titlos.innerHTML = `${shuffledEkthemata[index].object_name}`;
  
  // const main = document.getElementById("selected");
  // main.src = shuffledEkthemata[randomindex][1];
  // main.title = shuffledEkthemata[randomindex][0];
  // const description = document.getElementById("description");
  // description.innerHTML = `${shuffledEkthemata[randomindex][0]}`;
}

function nextbuttonclick(){
  var imgAct = document.querySelector(".panel-main img");
  let imgsrc = imgAct.src
  imgsrc=imgsrc.slice(imgsrc.indexOf("img"),-1);
  imgsrc= "./"+imgsrc +"g";
  console.log(imgsrc);
  let index=-1;
  for(let i=0; i<shuffledEkthemata.length;i++){
    console.log(shuffledEkthemata[i].img);
    if(imgsrc==shuffledEkthemata[i].img)
      index=i;

  }
  console.log(index);
  if(index==shuffledEkthemata.length-1)
    index=0;
  else
    index++;
  const main = document.getElementById("selected");
  main.src = shuffledEkthemata[index].img;
  main.title = shuffledEkthemata[index].ex_description;
  const description = document.getElementById("description");
  description.innerHTML = `${shuffledEkthemata[index].ex_description}`;
  const titlos = document.getElementById("Titlos");
  titlos.innerHTML = `${shuffledEkthemata[index].object_name}`;


}



const thumbs = document.querySelectorAll(".mikrografies img");

const main = document.getElementById("selected");
main.src = shuffledEkthemata[0].img;
main.title = shuffledEkthemata[0].ex_description;
main.titlos = shuffledEkthemata[0].object_name;

const description = document.getElementById("description");
description.innerHTML = `${shuffledEkthemata[0].ex_description}`;
const titlos1 = document.getElementById("Titlos");
titlos1.innerHTML = `${shuffledEkthemata[0].object_name}`;

for (let i = 0; i < thumbs.length; i++) {
  thumbs[i].addEventListener("click", imgActivate);
}
function imgActivate(clickEvent) {
  console.log("imgActivate", clickEvent);
  var target = clickEvent.target;
  console.log("clickEvent.target", clickEvent.target);
  console.log(clickEvent.target.titlos);
  

  window.target = target.style;

  for (let i = 0; i < thumbs.length; i++) {
    thumbs[i].style.opacity = 1;
  }
  target.style.opacity = 0.5;

  var imgAct = document.querySelector(".panel-main img");
  imgAct.setAttribute("src", target.getAttribute("src"));
  //imgAct.setAttribute("title", target.getAttribute("title"));
  imgAct.setAttribute("title", clickEvent.target.title);
  //imgAct.setAttribute("titlos", clickEvent.target.titlos);
  var perigrafi = document.getElementById("description");
  perigrafi.innerHTML = `${clickEvent.target.alt}`;
  const titlos = document.getElementById("Titlos");
  titlos.innerHTML = `${shuffledEkthemata[clickEvent.target.getAttribute('index')].object_name}`;
  
  //titlos.innerHTML = clickEvent.target.getAttribute('titlos');

}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * i);
    const temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  return array;
}

}
