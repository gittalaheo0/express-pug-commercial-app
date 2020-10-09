var listProductHtml = document.querySelector(".product_all");
var viewMoreBtn = document.querySelector(".product_all_more");
var page = Math.floor(document.querySelector(".product_all").children.length/30+1);
var data;
var infor;
// find infor to send request
var sendInfor = (typeProduct) => {
  infor= typeProduct;
}

function loadDoc() {
  var xhttp = new XMLHttpRequest();
  xhttp.onreadystatechange = function() {
    if (this.readyState == 4) {
      data = JSON.parse(this.responseText)
      appendToList();
      page++;
      console.log(page);
    }
  };
  xhttp.open("GET", `http://localhost:3000/api/${infor}?page=${page}`, true);
  xhttp.send();
}

// append to html
function appendToList() {
  let i = 1;
  let productListAdd = data.productData.map(e=>{
    return `
      <a href="/catelogry/product/${e.id}">
          <div class="product_all_item"><img src="http://lorempixel.com/300/${++i + 300}/cats" alt="" />
              <p class="product_all_item_name">${e.name}</p>
              <div class="product_all_item_pricebox">
                  <p class="product_all_item_price" style="text-decoration:line-through">${e.price}</p>
                  <p>-</p>
                  <p class="product_all_item_price_discount">${e.price*(1-e.salePricePercent)}</p>
              </div>
              <div class="product_all_item_decoration"><span class="product_all_item_decoration_discount">-${e.salePricePercent}$</span></div>
          </div>
      </a>
    `
  })
  productListAdd.forEach( function(element, index) {
    listProductHtml.insertAdjacentHTML( 'beforeend', element );
  });
}

window.onscroll = function(e) {
  if(window.scrollY + 1000 > document.body.scrollHeight){
    viewMoreBtn.style.bottom = '2rem'
  }else {
    viewMoreBtn.style.bottom = '-4rem'
  }
}

viewMoreBtn.addEventListener("click", function() {
	loadDoc();
  viewMoreBtn.style.bottom = '-4rem'
})

