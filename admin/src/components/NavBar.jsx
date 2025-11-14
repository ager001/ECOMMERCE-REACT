// Importing the React library to use JSX and React components
import React from 'react'

// Importing assets (likely images or icons) from a relative path
import { assets } from '../assets/assets'

// Defining a functional component called NavBar
// It receives a prop called setToken, typically used to manage authentication state
const NavBar = ({ setToken }) => {
  return (
    // A flex container with padding and space between items
    <div className='flex items-center py-2 px-[4%] justify-between'>
      
      {/* Displaying a logo image from the imported assets */}
      {/* The width is responsive: minimum 10% of container width or 80px */}
      <img 
        src={assets.logo} 
        alt="" 
        className='w-[max(10%,80px)]' 
      />

      {/* A logout button that clears the token when clicked */}
      {/* Styled with background color, text color, padding, and rounded corners */}
      <button 
        onClick={() => setToken('')} 
        className='bg-gray-600 text-white px-5 py-2 sm:px-7 sm:py-2 rounded-full'
      >
        Log Out
      </button>
    </div>
  )
}

// Exporting the NavBar component so it can be used in other parts of the app
export default NavBar