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
    img.alt = pizza.name;
    img.style.height = '200px';
    img.style.objectFit = 'cover';
    
    // Add error handling for images
    img.addEventListener('error', function() {
        console.warn('Image failed to load:', pizza.url);
        this.src = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" width="200" height="200"%3E%3Crect fill="%23f5f5f5" width="200" height="200"/%3E%3Ctext x="50%25" y="50%25" dominant-baseline="middle" text-anchor="middle" font-family="Arial" font-size="16" fill="%23999"%3E🍕 Pizza%3C/text%3E%3C/svg%3E';
    });
    
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
    
    const buttonsContainer = document.createElement('div');
    buttonsContainer.className = 'pizza-actions';
    
    const addButton = document.createElement('button');
    addButton.innerText = 'Add to Cart';
    addButton.className = 'btn btn-primary add-to-cart-btn';
    addButton.setAttribute("product-id", pizza.id);
    addButton.addEventListener("click", addPizzaToCart);
    
    const removeButton = document.createElement('button');
    removeButton.innerText = 'Remove';
    removeButton.className = 'btn btn-danger remove-btn';
    removeButton.setAttribute("product-id", pizza.id);
    removeButton.setAttribute("title", "Remove from cart");
    removeButton.addEventListener("click", removePizzaFromCart);
    
    cardBody.appendChild(h5);
    cardBody.appendChild(pTag);
    buttonsContainer.appendChild(addButton);
    buttonsContainer.appendChild(removeButton);
    cardBody.appendChild(buttonsContainer);
    outputDiv.appendChild(colDiv);
}
function addPizzaToCart(){
    const pizzaId= this.getAttribute('product-id');
    console.log('Current Button Clicked',pizzaId);
    productOperations.search(pizzaId);
    printCart();
    updateTotal();
}

function removePizzaFromCart(){
    const pizzaId = this.getAttribute('product-id');
    console.log('Remove Button Clicked', pizzaId);
    productOperations.removeProduct(pizzaId);
    printCart();
    updateTotal();
}
function printCart(){
    const cartProducts = productOperations.getProductsInCart();
    const basket = document.querySelector('#basket');
    basket.innerHTML = '';
    for(let product of cartProducts){
        const li = document.createElement('li');
        li.className = 'basket-item';
        li.innerHTML = `
            <div class="basket-item-details">
                <span class="basket-item-name">${product.name}</span>
                <span class="basket-item-quantity">Qty: ${product.quantity}</span>
            </div>
            <span class="basket-item-price">₹${(product.price * product.quantity).toFixed(2)}</span>
        `;
        basket.appendChild(li);
    }
}

function updateTotal(){
    const cartProducts = productOperations.getProductsInCart();
    // Calculate total with GST (18%)
    const subtotal = cartProducts.reduce((sum, x) => sum + (parseFloat(x.price) * x.quantity), 0);
    const totalWithGST = subtotal * 1.18;
    
    // Update the total price element
    const totalPriceElement = document.getElementById('totalPrice');
    if (totalPriceElement) {
        totalPriceElement.innerText = `₹${totalWithGST.toFixed(2)}`;
    }
    
    console.log('Subtotal:', subtotal.toFixed(2));
    console.log('Total with GST:', totalWithGST.toFixed(2));
}

function sum(){
    const sumarray=productOperations.getProductsInCart();
    console.log(sumarray);
    const value=sumarray.reduce((sum,x)=>sum=sum+(parseFloat(x.price)*x.quantity),0);
    console.log(value);
    const val=document.createElement('h5');
    val.className = 'basket-subtotal';
    val.innerText=`Subtotal: ₹${value.toFixed(2)}`;
    const ul=document.getElementById('basket');
    ul.appendChild(val);
}
function gst(){
    const Array=productOperations.getProductsInCart();
    const value2=Array.reduce((sum,x)=>sum= sum+ (1.18*parseFloat(x.price)*x.quantity),0);
    console.log(value2);
    const val2=document.createElement('h5');
    val2.className = 'basket-total-gst';
    val2.innerText=`Total (with GST): ₹${value2.toFixed(2)}`;
    const u2=document.getElementById("basket");
    u2.appendChild(val2);
}
//const value=reduce((pizza.pr,curr)=>( pizza.price)