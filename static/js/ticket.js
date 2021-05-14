
document.getElementById("book").addEventListener("click", function(event){
    event.preventDefault()
    var firstname = document.getElementById("firstname").value
    var lastname = document.getElementById("lastname").value
    var visitdate = document.getElementById("visitdate").value
    var category = document.getElementById("category").value
    var email = document.getElementById("email").value
    var value;
    if(category=="Child under 18"){
        var value="10 euro";
    }
    else if (category=="Adult"){
        var value="15 euro";

    }
    else if (category=="Disabled"){
        var value="10 euro";
    }
    else if (category=="Student"){
        var value="8 euro";
    }


    const data = {  
        Issuedate:"2018-03-02",
        visitday:`${visitdate}`, 
        value:"10 euro",  
        discount:`${category}`, 
        user_mail:`${email}`, 
        user_first_name:`${firstname}`,
        user_last_name:`${lastname}`
         };
    var getData = 
        {
            "firstData":`${firstname}`,
            "secondData":`${lastname}`,
            "thirdData":`${visitdate}`,
            "fourthData":`${category}`,
            "fifthData":`${email}`
        };

localStorage.setItem('dataKey',JSON.stringify( getData));
// localStorage.setItem('lastname', lastname);  
// localStorage.setItem('date', visitdate);
// localStorage.setItem('category', category); 
// localStorage.setItem('email', email);    

fetch('http://localhost:8080/ticket_create', {
  method: 'POST', // or 'PUT'
  headers: {
    'Content-Type': 'application/json',
  },
  body: JSON.stringify(data),
})
.then(response => response.text())
.then(data => {
  console.log('Success:', data);
})
.catch((error) => {
  console.error('Error:', error);
});

    fetch('http://localhost:8080/Stamatis')
  .then(response => response.text())
  .then(data => console.log(data));

window.location="ticket_template.html";
 })

