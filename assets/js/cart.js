var cart = document.querySelector("#quantityInCart");
var x = document.cookie.split("..").splice(1);
cart.innerText = x.length;