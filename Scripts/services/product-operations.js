

import Product from '../models/product.js';
import  makeNetworkCall from  '../services/api-client.js';
const productOperations={
    products:[], // Key:value
    search(pizzaId){
        const product = this.products.
        find(currentProduct=>currentProduct.id==pizzaId);
        console.log('Product Found ', product);
        product.quantity += 1;
        console.log('Product Quantity:', product.quantity);
        console.log('Array ', this.products);
    },
    removeProduct(pizzaId){
        const product = this.products.find(currentProduct => currentProduct.id == pizzaId);
        if(product && product.quantity > 0){
            product.quantity -= 1;
            console.log('Product Quantity Reduced:', product.quantity);
        }
    },
    getProductsInCart(){
        const productInBasket = this.products.filter(product => product.quantity > 0);
        return productInBasket;
    },


   async loadProducts(){
   const pizzas =await makeNetworkCall();
   console.log(pizzas);
     const pizzaArray= pizzas['Vegetarian'];
     const productsArray=pizzaArray.map(pizzas=>{
        // Prefer https images; fall back across known asset buckets
        const rawUrl = pizzas?.assets?.product_details_page?.[0]?.url
            || pizzas?.assets?.menu?.[0]?.url
            || pizzas?.assets?.master?.[0]?.url
            || pizzas?.imageUrl
            || '';
        const safeUrl = rawUrl.replace(/^http:\/\//i, 'https://');

        const currentPizza = new Product(
            pizzas.id,
            pizzas.name,
            pizzas.menu_description,
            pizzas.price,
            safeUrl || 'https://via.placeholder.com/300?text=Pizza'
        );
                return currentPizza;
        })
    console.log('Product Array ', productsArray);
    this.products = productsArray
                return productsArray;  // Wrap in Promise
            },
    sortProducts(){

    },
    searchProducts(id){
        const searched=this.products.find(pizza=>pizza.id==id)
        searched.isAddedInCart = true;
        console.log(searched);
    }
}
export default productOperations;