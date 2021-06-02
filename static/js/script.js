function createEkthemata(ekthemata){

  //var shuffledEkthemata = shuffleArray(ekthemata);
  var shuffledEkthemata=ekthemata;
  var mikrografies = document.querySelector(".mikrografies");
  
  for (let i = 0; i < ekthemata.length; i++) {
    let img = document.createElement("img"); //<img>
    img.setAttribute("src", shuffledEkthemata[i].img);
    img.setAttribute("perigrafh", shuffledEkthemata[i].ex_description);
    img.setAttribute("titlos", shuffledEkthemata[i].object_name);
    img.setAttribute("index", i);
    mikrografies.appendChild(img);
  }
  
  function getRndInteger(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
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
  
    var target = clickEvent.target;
    
  
    window.target = target.style;
  
    for (let i = 0; i < thumbs.length; i++) {
      thumbs[i].style.opacity = 1;
    }
    target.style.opacity = 0.5;

    const main = document.getElementById("selected");
    main.src = shuffledEkthemata[clickEvent.target.getAttribute('index')].img;
    main.title = `${shuffledEkthemata[clickEvent.target.getAttribute('index')].ex_description}`;
    // const description = document.getElementById("description");
    // description.innerHTML = `${shuffledEkthemata[clickEvent.target.getAttribute('index')].ex_description}`;
  
    var imgAct = document.querySelector(".panel-main img");
    imgAct.setAttribute("src", target.getAttribute("src"));
    //imgAct.setAttribute("title", target.getAttribute("title"));
    imgAct.setAttribute("title", clickEvent.target.title);
    //imgAct.setAttribute("titlos", clickEvent.target.titlos);
    var perigrafi = document.getElementById("description");
    perigrafi.innerHTML = `${clickEvent.target.getAttribute("perigrafh")}`;
    const titlos = document.getElementById("Titlos");

    // const main = document.getElementById("selected");
    // main.src = shuffledEkthemata[index].img;
    // main.title = shuffledEkthemata[index].ex_description;
    // const description = document.getElementById("description");
    // description.innerHTML = `${shuffledEkthemata[index].ex_description}`;
    // const titlos = document.getElementById("Titlos");

    // titlos.innerHTML = `${shuffledEkthemata[clickEvent.target.getAttribute('index')].object_name}`;
  if (shuffledEkthemata[clickEvent.target.getAttribute('index')].early_date.length>=2 && shuffledEkthemata[clickEvent.target.getAttribute('index')].late_date.length>=2)
    titlos.innerHTML = `${shuffledEkthemata[clickEvent.target.getAttribute('index')].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[clickEvent.target.getAttribute('index')].object_name.slice(1)+','+shuffledEkthemata[clickEvent.target.getAttribute('index')].early_date+','+shuffledEkthemata[clickEvent.target.getAttribute('index')].late_date}`;
  else if (shuffledEkthemata[clickEvent.target.getAttribute('index')].early_date.length<2 && shuffledEkthemata[clickEvent.target.getAttribute('index')].late_date.length>=2)
    titlos.innerHTML = `${shuffledEkthemata[clickEvent.target.getAttribute('index')].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[clickEvent.target.getAttribute('index')].object_name.slice(1)+','+shuffledEkthemata[clickEvent.target.getAttribute('index')].late_date}`;
  else if (shuffledEkthemata[clickEvent.target.getAttribute('index')].late_date.length<2 && shuffledEkthemata[clickEvent.target.getAttribute('index')].early_date.length>=2)
    titlos.innerHTML = `${shuffledEkthemata[clickEvent.target.getAttribute('index')].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[clickEvent.target.getAttribute('index')].object_name.slice(1)+','+shuffledEkthemata[clickEvent.target.getAttribute('index')].early_date}`;
  else  
    titlos.innerHTML = `${shuffledEkthemata[clickEvent.target.getAttribute('index')].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[clickEvent.target.getAttribute('index')].object_name.slice(1)}`;
    
    //titlos.innerHTML = clickEvent.target.getAttribute('titlos');
  
  }
  
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
  
  function nextbuttonclick(ekthemata){
    var shuffledEkthemata=ekthemata;
  
  
    var imgAct = document.querySelector(".panel-main img");
    let imgsrc = imgAct.src
    imgsrc=imgsrc.slice(imgsrc.indexOf("img"),-1);
    imgsrc= "../"+imgsrc +"g";
    let index=-1;
    for(let i=0; i<shuffledEkthemata.length;i++){
      if(imgsrc==shuffledEkthemata[i].img)
        index=i;
  
    }
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
  if (shuffledEkthemata[index].early_date.length>=2 && shuffledEkthemata[index].late_date.length>=2)
    titlos.innerHTML = `${shuffledEkthemata[index].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[index].object_name.slice(1)+','+shuffledEkthemata[index].early_date+','+shuffledEkthemata[index].late_date}`;
  else if (shuffledEkthemata[index].early_date.length<2 && shuffledEkthemata[index].late_date.length>=2)
    titlos.innerHTML = `${shuffledEkthemata[index].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[index].object_name.slice(1)+','+shuffledEkthemata[index].late_date}`;
  else if (shuffledEkthemata[index].late_date.length<2 && shuffledEkthemata[index].early_date.length>=2)
    titlos.innerHTML = `${shuffledEkthemata[index].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[index].object_name.slice(1)+','+shuffledEkthemata[index].early_date}`;
  else  
    titlos.innerHTML = `${shuffledEkthemata[index].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[index].object_name.slice(1)}`;
  
  }
  
  function prevbuttonclick(ekthemata){
  
    var shuffledEkthemata=ekthemata;
    var imgAct = document.querySelector(".panel-main img");
    let imgsrc = imgAct.src
    imgsrc=imgsrc.slice(imgsrc.indexOf("img"),-1);
    imgsrc= "../"+imgsrc +"g";
    let index=0;
    for(let i=0; i<shuffledEkthemata.length;i++){
      
      if(imgsrc==shuffledEkthemata[i].img){
        index=i;
      }
    }
    if(index==0){
      index=shuffledEkthemata.length-1;
    }
    else
      index--;
    const main = document.getElementById("selected");
    main.src = shuffledEkthemata[index].img;
    main.title = shuffledEkthemata[index].ex_description;
    const description = document.getElementById("description");
    description.innerHTML = `${shuffledEkthemata[index].ex_description}`;
    const titlos = document.getElementById("Titlos");
  if (shuffledEkthemata[index].early_date.length>=2 && shuffledEkthemata[index].late_date.length>=2)
    titlos.innerHTML = `${shuffledEkthemata[index].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[index].object_name.slice(1)+','+shuffledEkthemata[index].early_date+','+shuffledEkthemata[index].late_date}`;
  else if (shuffledEkthemata[index].early_date.length<2 && shuffledEkthemata[index].late_date.length>=2)
    titlos.innerHTML = `${shuffledEkthemata[index].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[index].object_name.slice(1)+','+shuffledEkthemata[index].late_date}`;
  else if (shuffledEkthemata[index].late_date.length<2 && shuffledEkthemata[index].early_date.length>=2)
    titlos.innerHTML = `${shuffledEkthemata[index].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[index].object_name.slice(1)+','+shuffledEkthemata[index].early_date}`;
  else  
    titlos.innerHTML = `${shuffledEkthemata[index].object_name.slice(0,1).toUpperCase()+shuffledEkthemata[index].object_name.slice(1)}`;
    
    // const main = document.getElementById("selected");
    // main.src = shuffledEkthemata[randomindex][1];
    // main.title = shuffledEkthemata[randomindex][0];
    // const description = document.getElementById("description");
    // description.innerHTML = `${shuffledEkthemata[randomindex][0]}`;
  }