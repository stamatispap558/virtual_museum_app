
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
  let numberString = Date.now();
  numberString = numberString.toString();
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
  numberString = numberString.slice(0,10);
  let achar = characters.charAt(Math.floor(Math.random() * characters.length));
  let ticketCode = numberString + achar;


    const data = {  
        ticket_code: `${ticketCode}`,
        Issuedate:`${Date.now()}`,
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

// fetch('/ticket_create', {
//   method: 'POST', // or 'PUT'
//   headers: {
//     'Content-Type': 'application/json',
//   },
//   body: JSON.stringify(data),
// })
// .then(response => {response.text()})
// .then(data => {
//   console.log('Success:', data);
// })
// .catch((error) => {
//   console.error('Error:', error);
// });

//  })

