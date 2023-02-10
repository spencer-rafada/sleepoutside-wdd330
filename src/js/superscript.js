// import {
//     setLocalStorage,
//     getLocalStorage,
//     renderWithTemplate,
//   } from "./utils.mjs";
  
//   export default class Super {
//     constructor(productId, dataSource) {
//       this.productId = productId;
//       this.dataSource = dataSource;
//       this.product = {};
//       this.products =
//         getLocalStorage(`so-cart`) === null ? [] : getLocalStorage(`so-cart`);
//     this.init();
//     }
//     init(){
//         fun();
//     }
//     fun(){
//         this.products = [...this.products, this.product];
//         const badge = document.getElementById('total').innerHTML = this.products.length
//         renderWithTemplate(
//             badge
//           );
//     }
    
//   }