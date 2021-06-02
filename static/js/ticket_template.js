fetch('/html/ticket_template.html/showticket')
.then(response => response.json())
.then( data => {
    console.log(data);
    document.querySelector('#onoma').innerHTML = data.user_first_name;
    document.querySelector('#epwnimo').innerHTML = data.user_last_name;
    document.querySelector('#hmeromhnia').innerHTML = data.visitday.toString();
    document.querySelector('#kathgoria').innerHTML = data.discount;
    document.querySelector('#ticket_code').innerHTML = data.ticket_code;
    document.querySelector('#email').innerHTML = data.user_mail;
    document.querySelector('.total').innerHTML = data.value;
    
    })

