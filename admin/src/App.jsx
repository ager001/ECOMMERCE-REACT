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
import { ToastContainer } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'
import { useEffect } from 'react'




// Exports a constant named 'backendUrl' that holds the value of the environment variable 'VITE_BACKEND_URL'.
// This allows the frontend to access the backend server URL defined in a .env file (e.g., VITE_BACKEND_URL=http://localhost:5000).
// 'import.meta.env' is Vite's way of exposing environment variables during build and runtime.
export const backendUrl = import.meta.env.VITE_BACKEND_URL;
export const currency = 'kes';



// Defining the main App component using an arrow function
const App = () => {

  // Initializes a state variable 'token' with the value stored in localStorage under the key 'token'.
  // If a token exists in localStorage, it will be used as the initial state; otherwise, the state will be undefined.
  // 'setToken' is the function used to update the token state.
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : '');

  // useEffect runs whenever the 'token' state changes.
  // It updates localStorage with the latest token value, ensuring persistence across page reloads or sessions.
  useEffect(() => {
    localStorage.setItem('token', token);
  }, [token]);




  // Returning JSX that defines the structure of the app's UI
  return (
    // Main container with a light gray background and full viewport height
    <div className='bg-gray-50 min-h-screen'>
      <ToastContainer />
      {/* If the token is not available the login component is displayed */}
      {token === ""
        ? <Login setToken={setToken} /> : 
        <>
          {/* Top navigation bar component */}
          <NavBar setToken={setToken} />

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
                <Route path='/add' element={<Add token={token} />} />

                {/* Route for the List page */}
                <Route path='/list' element={<List token={token} />} />

                {/* Route for the Orders page */}
                <Route path='/orders' element={<Orders token={token} />} />
              </Routes>
            </div>
          </div>
        </>}


    </div>
  )
}

// Exporting the App component as the default export so it can be used in index.js
export default App