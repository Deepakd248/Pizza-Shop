//HTTP/HTTPS Call
import URL from "../utils/constants.js";
/*async function makeNetworkCall(){
     const promise =await fetch("https://gist.githubusercontent.com/kshirsagarps/36fade16fa39202715656ef487aaf7b0/raw/2b682e589ef283f06be42d2799dfa54f57794a6e/Pizza.json");
     const data=await promise.json();
     console.log('data is',data);
}
makeNetworkCall();*/
//function makeNetworkCall(){
//  console.log('Promise is',promise);
//  promise.then(response=>{
//     console.log('response is', response);
//   const promise2= response.json();//Deserialization
// promise2.then(data=>console.log('Data is '))
//}
//}
async function makeNetworkCall() {
  try {
    console.log("Fetching pizzas from:", URL);
    const response = await fetch(URL, {
      headers: {
        'Accept': 'application/json',
      },
      mode: 'cors'
    });
    
    if (!response.ok) {
      throw new Error(`API Error: ${response.status} ${response.statusText}`);
    }
    
    const object = await response.json();
    console.log("Pizza data loaded successfully:", object);
    
    // Validate image URLs
    if(object.Vegetarian) {
      object.Vegetarian.forEach(pizza => {
        if(pizza.assets && pizza.assets.product_details_page && pizza.assets.product_details_page[0]) {
          console.log(`Pizza: ${pizza.name}, Image URL: ${pizza.assets.product_details_page[0].url}`);
        }
      });
    }
    
    return object;
  } catch (err) {
    console.error("Error in API Call:", err);
    console.error("Failed URL:", URL);
    throw err;
  }
}
export default makeNetworkCall;
