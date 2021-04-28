const getInput = document.querySelector("#myInput");
const sugBox = document.querySelector(".exlist");


getInput.addEventListener("keyup", helpWithSearch);
sugBox.addEventListener("click", function(e){ 
    getInput.value = e.target.textContent});

let resultList;

function helpWithSearch( e ){
    let CapsInput = e.target.value.toUpperCase();
    let strLen = CapsInput.length;
    while (sugBox.firstChild) {
        sugBox.removeChild(sugBox.firstChild);
    }  
    if(CapsInput !== ""){
    for (let index=0; index < ekthemata.length; index++){
        if(CapsInput === ekthemata[index].object_name.toUpperCase().slice(0,strLen)){
            let newSugItem = document.createElement("li");
            sugBox.appendChild(newSugItem);
            newSugItem.innerHTML = ekthemata[index].object_name;

        }
    }
    }
}


function myFunction2(){
    let resultList = [];
    let filter, index, j, filterLen;
    filter = getInput.value.toUpperCase();
    filterLen = filter.length;
    for (j=0;j< ekthemata.length;j++){
        let name = ekthemata[j].object_name.toUpperCase();
        if (filter === name.slice(0,filterLen)){
          resultList.push(j);  
        } 
    }
    while (sugBox.firstChild) {
        sugBox.removeChild(sugBox.firstChild);
    }  
    if (resultList.length > 0) {
        index = resultList[0];
        
        const titlos = document.getElementById("Titlos");
        titlos.innerHTML = ekthemata[index].object_name;
        
        const image = document.getElementById("image");
        image.src = ekthemata[index].img;
        
        const perigrafh = document.getElementById("description");
        perigrafh.innerHTML = ekthemata[index].ex_description;    
        
    }
        
}