const eveTitle = document.querySelector('#showFEvents');
const eveImg = document.querySelector('#showFImg');
fetch('/api/homePage/Eventsimg')
.then(response => response.json())
.then( data => {

    //console.log(data);
    eveTitle.innerHTML = data.title;
    eveImg.src = data.img;

})