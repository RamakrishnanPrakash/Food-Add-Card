class Product {
  id = 0;
  productArray = [];

  //fetch the data from product.json

  async fetchData() {
    try {

      var responce = await fetch('./product.json');
      var products = await responce.json();
      return products;
      // console.log(products.product[0]);

    }

    catch {
      window.alert('Data fetching was failure');
    }
  }


  async productLoaded() {
    try {
      var products = await this.fetchData();
      let result = " ";
      products.product.forEach((ele) => {

        result = result + `
        <div class="product" id="${ele.fid}">
        <div class="image-container">
         <img src="${ele.fimage}" 
         alt="" class="" ></div>
         <h4 id="Fid-${ele.fid}">${ele.fname}</h4>
         <p>Rate: Rs.₹${ele.frate}</p>
         <button class="card-btn" id='addcart'><i class="fa-solid fa-cart-shopping"></i> Add Card</button>
         <button class="fav-btn"><i class="fa-solid fa-heart"></i></button>
     </div> ` ;
      })



      let parent = document.getElementById("product-container");
      parent.innerHTML = result;
      document.querySelectorAll('#addcart').forEach((parent) => {
        parent.addEventListener('click', () => {
          this.addCart('active', '.add-card');//this statement active the addcard menu in browser.
          //  console.log("data")
          //  console.log(parent.parentElement.id);
          this.id = parent.parentElement.id;
          this.productArray.push(products.product[this.id - 1]);
       //   console.log(this.productArray[0].fid);
          this.showAddCard(this.productArray);

        });

      })


    }
    catch (error) {
      window.alert(error);
    }

  }
  addCart(active, classname) {
    document.querySelector(classname).classList.add(active);
  }
  deleteCart(active, classname) {
    document.querySelector(classname).classList.remove(active);
  }

  showAddCard(arrays){
   var template='';
  arrays.forEach((eles)=>{
     template=template+`
     <div class="product-1">

     <img src="${eles.fimage}">
     
 
     <div class="product-1-details">
         <h4>${eles.fname}</h4>
         <h6 >Rs:₹<span id="rupees">${eles.frate}</span> </h6>
         <button>remove</button>
     </div>
 
     <div>
         <i class="fa fa-plus" id="plus"></i>
         <h5 class="item-amount" id="item-amount">
           1
         </h5>
         <i class="fa fa-minus" id="minus"></i>
       </div>
 
    </div> `
  })
   
  document.querySelector('.products').innerHTML=template;

  }

  plusIncrement() {
    var ruppes = parseInt(document.getElementById('rupees').textContent);
    var total = document.getElementById('Total');
    var value = parseInt(document.querySelector('#item-amount').textContent);
    total.innerHTML = parseInt(total.textContent) + ruppes;

    document.querySelector('#item-amount').innerHTML = value + 1;

  }

  minusDecrement() {
    var ruppes = parseInt(document.getElementById('rupees').textContent);
    var total = document.getElementById('Total');
    var value = parseInt(document.querySelector('#item-amount').textContent);
    if (value <= 1) {
      document.querySelector('#item-amount').innerHTML = value;
      total.innerHTML = parseInt(total.textContent);
    }
    else {
      total.innerHTML = parseInt(total.textContent) - ruppes;
      document.querySelector('#item-amount').innerHTML = value - 1;
      // total.innerHTML=total.textContent-ruppes*value;
    }
  }


}

/*********************************************************************************************************************
 ************************* Class Object Creation And Call It's Methods************************************************
 **********************************************************************************************************************
 */

var product = new Product();
product.productLoaded();
document.getElementById('card').addEventListener('click', () => {

  product.addCart('active', '.add-card');
})

document.getElementById('xmark').addEventListener('click', () => {
  product.deleteCart('active', '.add-card');
})

document.getElementById('plus').addEventListener('click', () => {
  // console.log('clicked');
  product.plusIncrement();
})

document.getElementById('minus').addEventListener('click', () => {
  //console.log('clicked');
  product.minusDecrement();
})







