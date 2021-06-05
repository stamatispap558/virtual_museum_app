const exImg1 = document.querySelector("#ex1");
const exImg2 = document.querySelector("#ex2");
const exImg3 = document.querySelector("#ex3");
const exImg4 = document.querySelector("#ex4");

fetch('/api/homePage/ekthemata_load')
.then(response => response.json())
.then( data => {

    //console.log(data);
    exImg1.src = data[0].img;
    exImg1.title = data[0].object_name;
    exImg2.src = data[1].img;
    exImg2.title = data[1].object_name;
    exImg3.src = data[2].img;
    exImg3.title = data[2].object_name;
    exImg4.src = data[3].img;
    exImg4.title = data[3].object_name;

 })