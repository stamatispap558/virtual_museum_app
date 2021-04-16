var signin = document.getElementById("signin");
var signup =  document.getElementById("signup");
var noaccount = document.getElementById("noaccount");
var yesaccount = document.getElementById("yesaccount");
noaccount.onclick = function() {
    signin.classList.add("hidden");
    signup.classList.remove("hidden");
};

yesaccount.onclick = function() {
    
    signup.classList.add("hidden");
    signin.classList.remove("hidden");
};




