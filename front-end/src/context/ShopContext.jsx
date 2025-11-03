import { createContext, useState, useEffect } from "react"
{/*I have created a shopContext that can be imported anywhere in the app
     */}
import { products } from "../assets/assets"
import { toast } from "react-toastify";

export const ShopContext = createContext();
const ShopContextProvider = (props) => {

     const currency = 'Kes';
     const delivery_fee = 10;
     const [search, setSearch] = useState('');
     const [showSearch, setShowSearch] = useState(false);
     const [cartItems, setCartItems] = useState({});

   // Define an asynchronous function to add a product to the cart
const addToCart = async (itemId, size) => {
  
  if (!size) {
    toast.error('Select Product Size')
    return;
  }
  // Create a deep copy of the current cartItems to avoid direct mutation
  // This ensures React state updates correctly and avoids side effects
  let cartData = structuredClone(cartItems);

  // Check if the item already exists in the cart
  if (cartData[itemId]) {
    
    // If the item exists, check if the selected size already has a quantity
    if (cartData[itemId][size]) {
      // If so, increment the quantity by 1
      cartData[itemId][size] += 1;
    } else {
      // If the size doesn't exist yet, initialize it with quantity 1
      cartData[itemId][size] = 1;
    }

  } else {
    // If the item doesn't exist in the cart, initialize it as an empty object
    cartData[itemId] = {};

    // Then set the selected size with quantity 1
    cartData[itemId][size] = 1;
  }

  // Update the cartItems state with the modified cartData
  setCartItems(cartData);
};


// Function to calculate the total number of items in the cart
const getCartCount = () => {
  let totalCount = 0; // Initialize total count to zero

  // Loop through each product ID in the cartItems object
  for (const itemId in cartItems) {
    // Loop through each size variant for the current product
    for (const size in cartItems[itemId]) {
      // Check if the quantity is greater than zero
      if (cartItems[itemId][size] > 0) {
        // Add the quantity to the total count
        totalCount += cartItems[itemId][size];
      }
    }
  }

  // Return the final total count of all items in the cart
  return totalCount;
};

     // ✅ This is where you'd define shared state and functions

     const value = {
          products, currency, delivery_fee, search, setSearch, 
          showSearch, setShowSearch, cartItems, addToCart, getCartCount
     }

     return (
          // ✅ The Provider wraps children and passes down the context value
          // This is the most basic way of creating context in react

          <ShopContext.Provider value={value}>
               {props.children}
          </ShopContext.Provider>



     )




}

export default ShopContextProvider;