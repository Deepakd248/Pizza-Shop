//Product Controller-It is a glue between view and model
//Controller - i/o view layer
//Data exchange bw view and model
//import Product from '../models/product.js';
//import makeNetworkCall from './api-client.js-'

import productOperations from "../services/product-operations.js";
async function loadPizzas(){
        const pizzas= await productOperations.loadProducts();
        console.log('Pizzas are ', pizzas);
        for(let pizza of pizzas){
            preparePizzaCard(pizza);
        }
    }
    loadPizzas();

/*function addtoCart(){
    console.log(this.getAttribute("product-id"));
    const currentButton=this;
    const pizzaId=currentButton.getAttribute("product-id");
    console.log('Pizza Id is',pizzaId);
    productOperations.search(pizzaId);
    printBasket();
    
}*/

function preparePizzaCard(pizza){
    const outputDiv = document.querySelector('#output');
    const colDiv = document.createElement('div');
    colDiv.className = 'col-4';
    const cardDiv = document.createElement('div');
    cardDiv.className = 'card';
    cardDiv.style = "width: 18rem;";
    colDiv.appendChild(cardDiv);
    const img = document.createElement('img');
    img.src = pizza.url;
    img.className = 'card-img-top';
    cardDiv.appendChild(img);
    const cardBody = document.createElement('div');
    cardBody.className = 'card-body';
    cardDiv.appendChild(cardBody);
    const h5 = document.createElement('h5');
    h5.className = 'card-title';
    h5.innerText = pizza.name;
    const pTag = document.createElement('p');
    pTag.className = 'card-text';
    pTag.innerText = pizza.desc;
    const button = document.createElement('button');

    button.innerText = 'Add to Cart';
    button.className = 'btn btn-primary';
    button.setAttribute("product-id",pizza.id)
    button.addEventListener("click",addPizzaToCart);
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    cardBody.appendChild(button);
    outputDiv.appendChild(colDiv);
}
function addPizzaToCart(){
    const pizzaId= this.getAttribute('product-id');
    console.log('Current Button Clicked',pizzaId);
    productOperations.search(pizzaId);
printCart();
sum();
gst();
}
function printCart(){
    const cartProducts = productOperations.getProductsInCart();
    const basket = document.querySelector('#basket');
    basket.innerHTML = '';
    for(let product of cartProducts){
        const li = document.createElement('li');
        li.innerText = `${product.name} ${product.price}`;
        basket.appendChild(li);
    }
  }
function sum(){
const sumarray=productOperations.getProductsInCart();
console.log(sumarray);
const value=sumarray.reduce((sum,x)=>sum=sum+parseFloat(x.price),0);
console.log(value);
const val=document.createElement('h5');
val.innerText=`  Total value :${value}`;
const ul=document.getElementById('basket');
ul.appendChild(val);
}
function gst(){
    const Array=productOperations.getProductsInCart();
    const value2=Array.reduce((sum,x)=>sum= sum+ 1.18*parseFloat(x.price),0);
    console.log(value2);
    const val2=document.createElement('h5');
    val2.innerText=`Total value after GST:${value2}`;
    const u2=document.getElementById("basket");
    u2.appendChild(val2);
}
//const value=reduce((pizza.pr,curr)=>( pizza.price)