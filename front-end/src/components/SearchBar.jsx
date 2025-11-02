// Importing React and necessary hooks from the React library
import React, { useContext, useEffect, useState } from 'react'

// Importing the ShopContext to access shared state across components
import { ShopContext } from '../context/ShopContext'

// Importing asset references such as icons
import { assets } from '../assets/assets'

// Importing useLocation hook to access the current URL path
import { useLocation } from 'react-router-dom'

/*
  SearchBar component:
  - Displays a search input when the user is on a specific route (e.g., '/collection')
  - Uses context to manage search input and visibility state
*/
const SearchBar = () => {

    // Destructuring values from ShopContext: search text, setters, and visibility flags
    const { search, setSearch, setShowSearch, showSearch } = useContext(ShopContext)

    // Getting the current route location using React Router's useLocation hook
    const location = useLocation();

    // Local state to control visibility of the search bar based on route
    const [visible, setVisible] = useState(false);

    // useEffect runs whenever the location changes
    useEffect(() => {
        // If the current path includes 'collection', show the search bar
        if (location.pathname.includes('collection')) {
            setVisible(true);
        } else {
            // Otherwise, hide the search bar
            setVisible(false);
        }
    }, [location]); // Dependency array ensures effect runs on location change

    // Render the search bar only if both showSearch and visible are true
    return showSearch && visible ? (
        // Container div with top and bottom borders and centered emerald text
        <div className='border-t border-b text-center text-emerald-800 border-amber-300'>

            {/* Inner container for the input and search icon, styled with padding and rounded edges */}
            <div className='inline-flex items-center justify-center border border-amber-300 px-5 py-2 my-5 mx-3 rounded-full w-3/4 sm:w-1/2'>

                {/* Search input field with placeholder and styling */}
                <input
                    type="text"
                    placeholder='Search'
                    className='flex-1 outline-none bg-inherit text-sm'
                    value={search} // Controlled input value from context
                    onChange={(e) => setSearch(e.target.value)} // Updates search value on input change
                />

                {/* Search icon displayed next to the input field */}
                <img src={assets.search_icon} alt="" className='w-4' />
            </div>

            {/* Cross icon to close the search bar; clicking sets showSearch to false */}
            <img
                onClick={() => setShowSearch(false)}
                src={assets.cross_icon}
                alt=""
                className='inline w-3 cursor-pointer'
            />
        </div>
    ) : null // If not visible, render nothing
}

// Exporting the SearchBar component for use in other parts of the app
export default SearchBar