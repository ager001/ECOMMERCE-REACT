// Importing the core React library to enable JSX and component creation
import React from 'react'

// Importing custom components for navigation and sidebar layout
import NavBar from './components/NavBar'
import SideBar from './components/SideBar'

// Importing routing utilities from react-router-dom for client-side navigation
import { Routes, Route } from 'react-router-dom'

// Importing page components that will be rendered based on the route
import Add from './pages/Add'
import List from './pages/List'
import Orders from './pages/Orders'
import { useState } from 'react'
import Login from './components/Login'





// Defining the main App component using an arrow function
const App = () => {

  const [token, setToken] = useState('');





  // Returning JSX that defines the structure of the app's UI
  return (
    // Main container with a light gray background and full viewport height
    <div className='bg-gray-50 min-h-screen'>
      {/* If the token is not available the login component is displayed */}
      {token === ""
        ? <Login /> : <>
          {/* Top navigation bar component */}
          <NavBar />

          {/* Horizontal line separator below the navbar */}
          <hr />

          {/* Flex container to arrange sidebar and main content horizontally */}
          <div className='flex w-full'>

            {/* Sidebar component for navigation or additional controls */}
            <SideBar />

            {/* Main content area with responsive width and spacing */}
            <div className='w-[70%] mx-auto ml-[max(5vw, 25px)] my-8 text-emerald-700 text-base'>

              {/* Routing logic: renders different components based on the URL path */}
              <Routes>
                {/* Route for the Add page */}
                <Route path='/add' element={<Add />} />

                {/* Route for the List page */}
                <Route path='/list' element={<List />} />

                {/* Route for the Orders page */}
                <Route path='/orders' element={<Orders />} />
              </Routes>
            </div>
          </div>
        </>}


    </div>
  )
}

// Exporting the App component as the default export so it can be used in index.js
export default App