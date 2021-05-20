var val = localStorage.getItem('dataKey');
console.log('retrievedValue: ', JSON.parse(val));

document.getElementById('onoma').innerHTML=JSON.parse(val).firstData;
document.getElementById('epwnimo').innerHTML=JSON.parse(val).secondData;
document.getElementById('hmeromhnia').innerHTML=JSON.parse(val).thirdData;
document.getElementById('kathgoria').innerHTML=JSON.parse(val).fourthData;
document.getElementById('email').innerHTML=JSON.parse(val).fifthData;


