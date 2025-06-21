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
    const response = await fetch(URL);
    const object = await response.json();
    return object // Block
  } catch (err) {
    console.log("Some problem in API Call", err);
    throw err;
  }
}
export default makeNetworkCall;
