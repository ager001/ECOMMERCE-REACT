import { createContext, useState } from "react"
{/*I have created a shopContext that can be imported anywhere in the app
     */}
import { products } from "../assets/assets"

export const ShopContext = createContext();
const ShopContextProvider = (props) => {

     const currency = 'Kes';
     const delivery_fee = 10;
     const [search, setSearch] = useState('');
     const [showSearch, setShowSearch] = useState(false);


     // ✅ This is where you'd define shared state and functions

     const value = {
          products, currency, delivery_fee, search,setSearch, showSearch, setShowSearch
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