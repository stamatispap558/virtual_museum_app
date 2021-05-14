var val = localStorage.getItem('dataKey');
console.log('retrievedValue: ', JSON.parse(val));

document.getElementById('onoma').innerHTML=JSON.parse(val).firstData;
document.getElementById('epwnimo').innerHTML=JSON.parse(val).secondData;
document.getElementById('hmeromhnia').innerHTML=JSON.parse(val).thirdData;
document.getElementById('kathgoria').innerHTML=JSON.parse(val).fourthData;
document.getElementById('email').innerHTML=JSON.parse(val).fifthData;

// var lastname = localStorage.getItem('lastname');
// console.log(lastname);
// document.getElementById('epwnimo').innerHTML=lastname;
// console.log(document.getElementById('epwnimo').innerHTML);
// var date = localStorage.getItem('date');
// document.getElementById('hmeromhnia').innerHTML=date;
// var category = localStorage.getItem('category');
// document.getElementById('kathgoria').innerHTML=category;
// var email = localStorage.getItem('email');
// document.getElementById('email').innerHTML=email;

