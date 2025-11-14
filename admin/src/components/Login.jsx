// Importing the core React library to enable JSX and component creation
import React from 'react'

// Importing the useState hook to manage component-level state
import { useState } from 'react'
import axios from 'axios'
import { backendUrl } from '../App';
import { toast } from 'react-toastify'




// Defining the Login component using an arrow function
const Login = ({ setToken }) => {

    // Declaring a state variable 'email' with its updater function 'setEmail'
    const [email, setEmail] = useState('');

    // Declaring a state variable 'password' with its updater function 'setPassword'
    const [password, setPassword] = useState('');

    // Function to handle form submission
    const onSubmitHandler = async (e) => {
        try {
            // Prevents the default form submission behavior (page reload)
            e.preventDefault();

            // Sends a POST request to the backend server using Axios and waits for the response.
            // 'backendUrl' should be a string containing the endpoint URL (e.g., 'https://api.example.com/login').
            // The 'await' keyword pauses execution until the server responds, storing the result in 'response'.
            const response = await axios.post(backendUrl + '/api/user/admin', { email, password });
            
            
            // Check if the response from the server indicates a successful operation
            if (response.data.success) {

                // If successful, store the received token (e.g., for authentication) in state or local storage
                setToken(response.data.token);

            } else {

                // If not successful, display an error message from the server using a toast notification
                toast.error(response.data.message);
            }

            // Catch block handles any unexpected errors during the request (e.g., network failure, server crash)
        } catch (error) {

            // Log the full error object to the console for debugging purposes
            console.log(error);

            // Show a user-friendly error message using a toast notification
            toast.error(error.message);
        }
    }

    // JSX returned by the component to render the login form
    return (
        // Full-screen container centered both vertically and horizontally
        <div className='min-h-screen flex items-center justify-center w-full'>

            {/* Card-like container for the form with padding, shadow, and rounded corners */}
            <div className='bg-white shadow-md rounded-lg px-8 py-6 max-w-md'>

                {/* Title of the login form */}
                <h1 className='text-2xl font-bold mb-4'>Admin Panel</h1>

                {/* Form element with a submit handler */}
                <form onSubmit={onSubmitHandler}>

                    {/* Email input field container */}
                    <div className='mb-3 min-w-72'>
                        {/* Label for the email input */}
                        <p className='text-sm font-medium text-emerald-700 mb-2'>Email Address</p>

                        {/* Controlled input for email with styling and validation */}
                        <input
                            onChange={(e) => setEmail(e.target.value)} // Updates email state on change
                            value={email} // Binds input value to email state
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type="email"
                            placeholder='your@email.com'
                            required
                        />
                    </div>

                    {/* Password input field container */}
                    <div className='mb-3 min-w-72'>
                        {/* Label for the password input */}
                        <p className='text-sm font-medium text-emerald-700 mb-2'>Password</p>

                        {/* Controlled input for password with styling and validation */}
                        <input
                            onChange={(e) => setPassword(e.target.value)} // Updates password state on change
                            value={password} // Binds input value to password state
                            className='rounded-md w-full px-3 py-2 border border-gray-300 outline-none'
                            type="password"
                            placeholder='Enter your Password'
                            required
                        />
                    </div>

                    {/* Submit button with styling */}
                    <button
                        className='mt-2 w-full py-2 px-4 rounded-md text-white bg-emerald-800 cursor-pointer'
                        type='submit'
                    >
                        LOGIN
                    </button>
                </form>
            </div>
        </div>
    )
}

// Exporting the Login component for use in other parts of the application
export default Login