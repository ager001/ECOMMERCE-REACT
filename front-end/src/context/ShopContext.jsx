import { createContext, useState } from "react"
{/*I have created a shopContext that can be imported anywhere in the app
     */}
import { products } from "../assets/assets"
import { toast } from "react-toastify";
import {useNavigate} from "react-router-dom"




export const ShopContext = createContext();
const ShopContextProvider = (props) => {

     const currency = 'Kes';
     const delivery_fee = 400;
     const [search, setSearch] = useState('');
     const [showSearch, setShowSearch] = useState(false);
     const [cartItems, setCartItems] = useState({});
     const navigate = useNavigate();




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

    const updateQuantity = async (itemId, size, quantity)=>{
            let cartData = structuredClone(cartItems);
            cartData[itemId][size] = quantity;
            setCartItems (cartData);
    }

    // Define a function to calculate the total cost of items in the cart
       // ✅ This function calculates the total cost of all items in the cart.
// It loops through each product and its size variants, multiplying quantity by price.

const getCartAmount = () => {
  // Initialize totalAmount to 0 — this will hold the final cart total
  let totalAmount = 0;

  // Loop through each product ID stored in the cartItems object
  for (const productId in cartItems) {

    // Find the product details (e.g., price) using the product ID
    const itemInfo = products.find((product) => product._id === productId);

    // If the product is not found (e.g., deleted or missing), skip to next item
    if (!itemInfo) {
      console.warn(`Product with ID ${productId} not found in products list.`);
      continue;
    }

    // Loop through each size variant of the current product
    for (const size in cartItems[productId]) {
      try {
        // Get the quantity for this size
        const quantity = cartItems[productId][size];

        // Only add to total if quantity is greater than 0
        if (quantity > 0) {
          // Multiply price by quantity and add to totalAmount
          totalAmount += itemInfo.price * quantity;
        }

      } catch (error) {
        // Log any unexpected errors (e.g., missing price or invalid data)
        console.error(`Error calculating amount for product ${productId}, size ${size}:`, error.message);
      }
    }
  }

  // Return the final total amount for all items in the cart
  return totalAmount;
};



     // ✅ This is where you'd define shared state and functions

     const value = {
          products, currency, delivery_fee, search, setSearch, 
          showSearch, setShowSearch, cartItems, addToCart, getCartCount, updateQuantity,
          getCartAmount, navigate
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