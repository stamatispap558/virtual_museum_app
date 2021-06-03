let carouselPos = 0;
let linkText = "subcollectionA1.html#TITLE" + `${carouselPos+1}`;
//const photoCarousel = [];
const panelCarousel = document.querySelector("#photos1");
const clink = document.querySelector("#collink1");
const butLeft = document.querySelector("#butleft");

const imgpanel = document.createElement("img");
const aToColl = document.createElement("a");

fetch('/api/homePage/ekthemata_load')
.then(response => response.json())
.then( data => {

    //console.log(data);
    photoCarousel = data;
    butLeft.disabled = false;
    imgpanel.setAttribute("src",photoCarousel[carouselPos].img);
    panelCarousel.appendChild(imgpanel);
    clink.appendChild(aToColl);
    aToColl.setAttribute("href",linkText);
    aToColl.classList.add("awhiteline");
    // aToColl.innerHTML = photoCarousel[carouselPos].coll_name;
})