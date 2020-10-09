const view = document.querySelector(".product_feature_slide").getElementsByClassName("view");
const remote = document.getElementsByClassName("product_feature_remote_item");

function setLeft(left) {
	for(let i of view){
		i.style.left = left+'%';
		left+=100;
	}
	remote[0].style.boxShadow = '0 0 0 2px #444';
}
setLeft(0);

for(let i in remote){
	remote[i].onclick = () =>{
		setLeft(i*-100);
		for(let e of remote){
			e.style.boxShadow = '';
		}	
		remote[i].style.boxShadow = '0 0 0 2px #444';
	};
}
