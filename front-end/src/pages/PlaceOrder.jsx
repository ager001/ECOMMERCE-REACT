

// Import a reusable Title component for section headings
import Title from '../components/Title';

// Import CartTotal component to display the cart summary and total price
import CartTotal from '../components/CartTotal';

// Import static assets like logos or icons
import { assets } from '../assets/assets';

// Import useState hook for managing local component state
import { useState } from 'react';

// Import ShopContext to access shared global state and functions like navigation
import { ShopContext } from '../context/ShopContext';
import { useContext } from 'react';
import axios from 'axios'
import { toast } from 'react-toastify';





// Define the PlaceOrder component
const PlaceOrder = () => {

  // Local state to track selected payment method (e.g., 'mpesa')
  const [method, setMethod] = useState('');
  const { navigate, backendUrl, token, cartItems, setCartItems, getCartAmount, delivery_fee, products } = useContext(ShopContext);



  const [formData, setFormData] = useState({
    fullName: '',
    town: '',
    idNumber: '',
    phoneNumber: ''
  })

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value

    setFormData(data => ({ ...data, [name]: value }))


  }

  const onSubmitHandler = async (event) => {
    event.preventDefault();
    try {

      let orderItems = []
      for (const items in cartItems) {
        for (const item in cartItems[items]) {
          if (cartItems[items][item] > 0) {
            const itemInfo = structuredClone(products.find(product => product._id === items));
            if (itemInfo) {
              itemInfo.size = item
              itemInfo.quantity = cartItems[items][item]
              orderItems.push(itemInfo)
            }
          }
        }
      }
      
      
      let orderData = {
        address: formData,
        items: orderItems,
        amount: getCartAmount() + delivery_fee
      }

    switch (method) {
  case 'cod': {
    // API call for Cash on Delivery
    const response = await axios.post(
      `${backendUrl}/api/order/place`,
      orderData,
      { headers: { token } }
    );
    console.log(response.data);
    
    // You can handle the response here if needed
    if (response.data.success) {
      setCartItems({})
      navigate('/orders')
    } else{
      toast.error(response.data.message)
    }
    break;
  }

  default:
    break;
}

    } catch (error) {
         console.log(error);
         
    }
  }





  // Return the JSX layout for the PlaceOrder page
  return (
    // Main container with responsive layout and styling
    <form onSubmit={onSubmitHandler} className='flex flex-col sm:flex-row justify-between gap-4 pt-5 sm:pt-14 min-h-[80vh] border-t text-emerald-700'>

      {/* Left Side: Delivery Information Section */}
      <div className='flex flex-col gap-4 w-full sm:max-w-[480px]'>

        {/* Section heading using Title component */}
        <div className='text-xl sm:text-2xl my-3'>
          <Title text1={'DELIVERY'} text2={'INFORMATION'} />
        </div>

        {/* Town input field container */}
        <div className='flex justify-center '>

          {/* Responsive input field for delivery town */}
          <div className="w-full max-w-md mx-auto mt-4">

            {/* Label for town input */}
            <label htmlFor="delivery-location" className="block mb-2 text-sm font-medium text-emerald-700">
              Input your delivery town:
            </label>

            {/* Input field for town name */}
            <input onChange={onChangeHandler} value={formData.town}
              required
              type="text"
              name='town'
              placeholder='Enter your Town'
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>

        {/* Section: Delivery details to be written on the parcel */}
        <div className="w-full max-w-md mx-auto mt-6 space-y-4">

          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-emerald-700">
              Full Name (as per ID)
            </label>
            <input onChange={onChangeHandler} value={formData.fullName}
              required
              type="text"
              id="fullName"
              name="fullName"
              placeholder="Full name"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* Phone Number Input */}
          <div>
            <label htmlFor="phoneNumber" className="block text-sm font-medium text-emerald-700">
              Phone Number
            </label>
            <input onChange={onChangeHandler} value={formData.phoneNumber}
              required
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              placeholder="Phone number"
              className="mt-1 w-full p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

          {/* ID Number Input */}
          <div>
            <label htmlFor="idNumber" className="block text-sm font-medium text-emerald-700">
              National ID Number
            </label>
            <input onChange={onChangeHandler} value={formData.idNumber}
              required
              type="text"
              id="idNumber"
              name="idNumber"
              placeholder="ID number"
              className="mt-1 w-full p-2 border border--300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>
        </div>
      </div>

      {/* Right Side: Cart Summary and Payment Method */}
      <div className='mt-8'>

        {/* Cart summary section */}
        <div className='mt-8 min-w-80'>
          <CartTotal /> {/* Displays total price and cart items */}
        </div>

        {/* Payment method section */}
        <div className='mt-12'>

          {/* Section heading using Title component */}
          <Title text1={'PAYMENT'} text2={'METHOD'} />

          {/* Payment method options */}
          <div className='flex gap-3 flex-col lg:flex-row'>

            {/* Mpesa option with clickable selection */}
            <div onClick={() => setMethod('mpesa')} className='flex items-center gap-3 border p-2 px-3 cursor-pointer'>

              {/* Radio button indicator for selected method */}
              <p className={`min-w-3.5 h-3.5 border rounded-full ${method === 'mpesa' ? 'bg-green-600' : ''}`}></p>

              {/* Mpesa logo  */}
              <img src={assets.stripe_logo} alt="" className='h-15 mx-4 ' />
            </div >
            {/*Cash on Delivery */}
            <div
              onClick={() => setMethod('cod')}
              className="flex items-center gap-3 border p-3 px-4 cursor-pointer rounded-md hover:shadow-md transition"
            >
              <div
                className={`w-4 h-4 border rounded-full ${
                  method === 'cod' ? 'bg-green-600' : ''
                }`}
              ></div>
              <span className="text-sm font-medium">Cash on Delivery</span>
            </div>
          </div>

          {/* Place Order button */}
          <div className='w-full text-end mt-8'>
            <button type='submit'

              className='bg-black text text-white px-16 py-3 text-sm cursor-pointer'
            >
              PLACE ORDER
            </button>
          </div>
        </div>
      </div>
    </form>
  )
}

// Export the PlaceOrder component for use in routing or other parts of the app
export default PlaceOrder;