// show softbar
	var softBtn = document.querySelector(".product_actionBar_soft");
	var softMenu = document.querySelector(".product_actionBar_soft_menu");
	console.log(softBtn);
	var toggleSoftMenu = () =>{
		softMenu.style.opacity = softMenu.style.opacity == 0 ? 1 : 0;
		softMenu.style.zIndex = softMenu.style.zIndex == "999" ? "-999" : "999";
	}
	softBtn.onclick = ()=>{
		toggleSoftMenu();
		console.log(softMenu.style.zIndex);
	}