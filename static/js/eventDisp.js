const EventsTitle = document.querySelector('.eveTitle')
const EventsImg = document.querySelector('.eveimg')
const EventsText = document.querySelector('.textText')


fetch('/html/events.html/data')
    .then(response => response.json())
    .then(data =>{
        let EventsObj = data[0]
        let elTitle = document.createElement('h2')
        EventsTitle.appendChild(elTitle);
        elTitle.innerHTML = EventsObj.title;
        let elImg = document.createElement('img');
        EventsImg.appendChild(elImg);
        elImg.setAttribute('src',EventsObj.img)
        let elText = document.createElement('p')
        EventsText.appendChild(elText)
        elText.innerHTML = EventsObj.text.toString()
        //console.log(EventsObj)
        
    })