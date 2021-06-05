const getInput = document.querySelector("#myInput");
const sugBox = document.querySelector(".exlist");

let ekthemata = []

fetch('/search/initialized')
.then(response => response.json())
.then(data =>{
    ekthemata = data;
    //console.log(ekthemata);
    getInput.addEventListener("keyup", helpWithSearch);
})


//getInput.addEventListener("keyup", helpWithSearch);
sugBox.addEventListener("click", function(e){ 
    getInput.value = e.target.textContent});

let resultList;

function helpWithSearch( e ){
    //console.log(ekthemata[1]);
    let CapsInput = e.target.value.toUpperCase();
    let strLen = CapsInput.length;
    while (sugBox.firstChild) {
        sugBox.removeChild(sugBox.firstChild);
    }  
    if(CapsInput !== ""){
    for (let index=0; index < ekthemata.length; index++){
        if( CapsInput == ekthemata[index].object_name.toUpperCase().slice(0,strLen).toString()){
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
    //console.log(filter);
    filterLen = filter.length;
    for (j=0;j< ekthemata.length;j++){
        let name = ekthemata[j].object_name.toUpperCase();
        if (filter == name.slice(0,filterLen ).toString()){
          resultList.push(ekthemata[j].object_name);
          //console.log(resultList);  
        } 
    }
    while (sugBox.firstChild) {
        sugBox.removeChild(sugBox.firstChild);
    }
     
    if (resultList.length > 0) {
        fetch('/search/result' + '?object_name=' + resultList[0].toString())
        .then(response => response.json())
        .then(data =>{ 
        //console.log(data);
       
        const titlos = document.getElementById("Titlos");
        if (data[0].early_date.length>=2 && data[0].late_date.length>=2)
            titlos.innerHTML = `${data[0].object_name.slice(0,1).toUpperCase()+data[0].object_name.slice(1)+','+data[0].early_date+','+data[0].late_date}`;
        else if (data[0].early_date.length<2 && data[0].late_date.length>=2)
            titlos.innerHTML = `${data[0].object_name.slice(0,1).toUpperCase()+data[0].object_name.slice(1)+','+data[0].late_date}`;
         else if (data[0].late_date.length<2 && data[0].early_date.length>=2)
            titlos.innerHTML = `${data[0].object_name.slice(0,1).toUpperCase()+data[0].object_name.slice(1)+','+data[0].early_date}`;
        else  
            titlos.innerHTML = `${data[0].object_name.slice(0,1).toUpperCase()+data[0].object_name.slice(1)}`;
        
        const image = document.getElementById("image");
        image.src = data[0].img;
        
        const perigrafh = document.getElementById("description");
        perigrafh.innerHTML = data[0].ex_description;    
        
    });
    }
}