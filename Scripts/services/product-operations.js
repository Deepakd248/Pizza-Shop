

import Product from '../models/product.js';
import  makeNetworkCall from  '../services/api-client.js';
const productOperations={
    products:[], // Key:value
    search(pizzaId){
        const product = this.products.
        find(currentProduct=>currentProduct.id==pizzaId);
        console.log('Product Found ', product);
        product.isAddedInCart = true;
        console.log('Array ', this.products);
    },
    getProductsInCart(){
        const productInBasket = this.products.filter(product=>product.isAddedInCart);
        return productInBasket;
    },


   async loadProducts(){
   const pizzas =await makeNetworkCall();
   console.log(pizzas);
   const pizzaArray= pizzas['Vegetarian'];
   const productsArray=pizzaArray.map(pizzas=>{
    const currentPizza = new Product(pizzas.id, pizzas.name,
         pizzas.menu_description, pizzas.price, pizzas.assets.product_details_page[0].url);
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