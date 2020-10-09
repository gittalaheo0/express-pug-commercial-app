// animation for sidebar
	var sidebarActiver = document.querySelector("#sidebar");
	var sideBar = document.querySelector(".sidebar_menu");
	var toggler = document.querySelector("#show_navbar");
	sideBar.style.left = "-20rem";
	var toggleSideBar = () =>{
		sideBar.style.left = sideBar.style.left == '' ? '-20rem' : '';
		toggler.children[0].className = toggler.children[0].className == '' ? 'lean1' : '';		
		toggler.children[1].className = toggler.children[1].className == '' ? 'lean2' : '';		
		toggler.children[2].className = toggler.children[2].className == '' ? 'lean3' : '';		
	}
	toggler.onclick = () =>{
		toggleSideBar();
		setTimeout(()=>{
			if(sideBar.style.left !== "-20rem"){
				toggleSideBar();
			}
		},10000)
	}
	sidebarActiver.onclick = () =>{
		toggleSideBar();
		setTimeout(()=>{
			if(sideBar.style.left !== "-20rem"){
				toggleSideBar();
			}
		},10000)
	}