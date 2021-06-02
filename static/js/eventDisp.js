const eventTitle = document.querySelector('.eveTitle')
const eventImg = document.querySelector('.eveimg')
const eventText = document.querySelector('.textText')


fetch('/html/event.html/data')
    .then(response => response.json())
    .then(data =>{
        let eventObj = data[0]
        let elTitle = document.createElement('h2')
        eventTitle.appendChild(elTitle);
        elTitle.innerHTML = eventObj.title;
        let elImg = document.createElement('img');
        eventImg.appendChild(elImg);
        elImg.setAttribute('src',eventObj.img)
        let elText = document.createElement('p')
        eventText.appendChild(elText)
        elText.innerHTML = eventObj.text.toString()
        //console.log(eventObj)
        
    })