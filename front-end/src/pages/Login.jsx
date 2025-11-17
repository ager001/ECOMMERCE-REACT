// Import React and the useState hook for managing local component state
import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext';
import axios from 'axios';
import { toast } from 'react-toastify';




// Define the Login component
const Login = () => {

  // Declare a state variable `currentSate` (likely a typo, should be `currentState`)
  // It determines whether the form is in "Sign Up" or "Login" mode
  const [currentState, setCurrentState] = useState('Login');

  const {token, setToken, navigate, backendUrl } = useContext(ShopContext)

  const [name, setName] = useState('');
  const [password, setPassword] = useState('');
  const [email, setEmail] = useState('');




  // Define a form submission handler function
  const onSubmitHandler = async (event) => {
    event.preventDefault(); // Prevent the default form submission behavior (page reload)
    // Placeholder for future logic (e.g., authentication, API call)
    try {
      if (currentState === 'Sign Up') {
        
        const response = await axios.post(backendUrl + '/api/user/register', {name, email, password})
       if (response.data.success) {
          setToken(response.data.token);
          localStorage.setItem('token', response.data.token);

       }else{
        toast.error(response.data.message)
       }

        
      }else{
       
        const response = await axios.post(backendUrl + '/api/user/login', {email, password})
        if (response.data.success) {
          setToken(response.data.token);
           localStorage.setItem('token', response.data.token);
        }else{
           toast.error(response.data.message)
        }

      }



    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(()=>{
      if (token){
        navigate('/')
      }
  },[token])



  // Return the JSX layout for the login/signup form
  return (
    // Form element with submission handler and Tailwind CSS styling
    <form
      onSubmit={onSubmitHandler}
      className='flex flex-col items-center w-[90%] sm:max-w-96 m-auto mt-14 gap-4 text-emerald-800'
    >

      {/* Header section with title and decorative line */}
      <div className='inline-flex items-center gap-2 mb-2 mt-10'>
        {/* Display the current form mode: "Sign Up" or "Login" */}
        <p className='quintessential-regular text-3xl'>{currentState}</p>

        {/* Horizontal line for visual separation */}
        <hr className='border-none h-[1.5px] w-8 bg-gray-800' />
      </div>

      {/* Conditionally render the Name input field only if in "Sign Up" mode */}
      {
        currentState === 'Login'
          ? '' // If in "Login" mode, don't show the Name field
          : <input onChange={(e)=>setName(e.target.value)} value={name}
              type="text" // Input type: text
              className='w-full px-3 py-2 border border-amber-300' // Styling
              placeholder='Name' // Placeholder text
              required // Field is required
            />
      }

      {/* Email input field (always shown) */}
      <input onChange={(e)=>setEmail(e.target.value)} value={email}
        type="email" // Input type: email
        className='w-full px-3 py-2 border border-amber-300' // Styling
        placeholder='Email' // Placeholder text
        required // Field is required
      />

      {/* Password input field (always shown) */}
      <input onChange={(e)=>setPassword(e.target.value)} value={password}
        type="password" // Input type: password (hides characters)
        className='w-full px-3 py-2 border border-amber-300' // Styling
        placeholder='Password' // Placeholder text
        required // Field is required
      />

      {/* Row for "Forgot password?" and toggle between Login/Sign Up */}
      <div className='w-full flex justify-between text-sm mt-2]'>
        {/* Static text for password recovery (not yet functional) */}
        <p className='cursor-pointer'>Forgot your password?</p>

        {/* Conditional toggle between Login and Sign Up modes */}
        {
          currentState === 'Login'
            ? (
              // If in "Login" mode, show "Create Account" link
              <p
                onClick={() => setCurrentState('Sign Up')} // Switch to Sign Up mode
                className='cursor-pointer'
              >
                Create Account
              </p>
            )
            : (
              // If in "Sign Up" mode, show "Login Here" link
              <p
                onClick={() => setCurrentState('Login')} // Switch to Login mode
                className='cursor-pointer'
              >
                Login Here
              </p>
            )
        }
      </div>

      {/* Submit button with dynamic label based on current mode */}
      <button
      type='submit'
        className='bg-black text-white font-light px-8 py-2 mt-4 cursor-pointer'
      >
        {currentState === 'Login' ? 'Sign In' : 'Sign Up'} {/* Button text changes with mode */}
      </button>
    </form>
  )
}

// Export the Login component so it can be used in routing or other parts of the app
export default Login