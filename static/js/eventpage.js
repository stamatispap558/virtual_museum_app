const Eventslist = document.querySelector('#EventsList');
const buttonSeeMore = document.querySelector('#show_more');
Events = [];
let EventsListLen = -1;

let ndisplayEventss = 0;

fetch('/api/give_EventsTable')
.then(response => response.json())
.then( data => {
    console.log(data);
    Events = data;
    EventsListLen = Events.length;
    for ( let i = ndisplayEventss; i < ndisplayEventss + 2; i++){
        let listElem = document.createElement("li");
        Eventslist.appendChild(listElem);
        
        let alistElem = document.createElement("a")
        listElem.appendChild(alistElem);
        alistElem.setAttribute("href", "./events.html"+ '?title=' + Events[i].title);
        
        let imglistElem = document.createElement("img");
        alistElem.appendChild(imglistElem);
        imglistElem.setAttribute("src",Events[i].img);
        imglistElem.setAttribute("alt", "Photo of " + Events[i].title);
        imglistElem.setAttribute("title", Events[i].title);
        
        let divlistElem = document.createElement("div");
        listElem.appendChild(divlistElem);
        divlistElem.classList.add("Events-info");
    
        let titlelistElem = document.createElement("h2");
        divlistElem.appendChild(titlelistElem);
        titlelistElem.innerHTML = Events[i].title;
        
        let startlistElem = document.createElement("p");
        divlistElem.appendChild(startlistElem);
        console.log(Events[i].start_day);
        startlistElem.innerHTML = Events[i].start_day;
    
        let endlistElem = document.createElement("p");
        divlistElem.appendChild(endlistElem);
        endlistElem.innerHTML = Events[i].expire_day;
    
      
    }
    ndisplayEventss = 2;
})

// if( ndisplayEventss >= EventsListLen){

//     buttonSeeMore.style.display = 'none';

// }


function ShowmeMore(){
    let clistend = ndisplayEventss + 2; 
    if(ndisplayEventss > EventsListLen - 2){
        clistend = EventsListLen;

    }
    for (let i= ndisplayEventss; i< clistend; i++){
        let listElem = document.createElement("li");
        Eventslist.appendChild(listElem);
        
        let alistElem = document.createElement("a")
        listElem.appendChild(alistElem);
        alistElem.setAttribute("href",  "./events.html"+ '?title=' + Events[i].title);
        
        let imglistElem = document.createElement("img");
        alistElem.appendChild(imglistElem);
        imglistElem.setAttribute("src",Events[i].img);
        imglistElem.setAttribute("alt", "Photo of " + Events[i].title);
        imglistElem.setAttribute("title", Events[i].title);
        
        let divlistElem = document.createElement("div");
        listElem.appendChild(divlistElem);
        divlistElem.classList.add("Events-info");
    
        let titlelistElem = document.createElement("h2");
        divlistElem.appendChild(titlelistElem);
        titlelistElem.innerHTML = Events[i].title;
        
        let startlistElem = document.createElement("p");
        divlistElem.appendChild(startlistElem);
        startlistElem.innerHTML = Events[i].start_day;
    
        let endlistElem = document.createElement("p");
        divlistElem.appendChild(endlistElem);
        endlistElem.innerHTML = Events[i].expire_day;

    }
    
    ndisplayEventss = ndisplayEventss + 2;
    console.log(ndisplayEventss);
    if(ndisplayEventss > EventsListLen -1){
        buttonSeeMore.style.display = 'none';
    }
    

}