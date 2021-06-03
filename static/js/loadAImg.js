const eveTitle = document.querySelector('#showFEvent');
const eveImg = document.querySelector('#showFImg');
fetch('/api/homePage/eventimg')
.then(response => response.json())
.then( data => {

    //console.log(data);
    eveTitle.innerHTML = data.title;
    eveImg.src = data.img;

})