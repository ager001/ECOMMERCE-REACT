import React from 'react'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import Title from './Title';

const CartTotal = () => {

  const { currency, delivery_fee, getCartAmount } = useContext(ShopContext);


  return (
    <div className='w-full text-emerald-800'>
      <div className='text-2xl' >
        <Title text1={'CART'} text2={'TOTALS'} />
      </div>
      <div className='flex flex-col gap-2 mt-2 text-sm'>
        <div className='flex justify-between'>
          <p>Subtotal</p>
          <p>{currency} {getCartAmount()}.00</p>

        </div>
        <hr />
        <div className='flex justify-between '>
          <p>Shipping Fee</p>
          <p>{currency} {delivery_fee}</p>

        </div>
        <hr />
        <div className='flex justify-between'>
          <b>Total</b>
          <b>{currency} {getCartAmount() === 0 ? 0 : getCartAmount() + delivery_fee}</b>
        </div>
        <div className='flex justify-center '>
          {/* Section title using your reusable Title component */}
          <Title text1={'DELIVERY'} text2={'DESTINATION'} />

          {/* Responsive dropdown menu for selecting a delivery location */}
          <div className="w-full max-w-md mx-auto mt-4">
            <label htmlFor="delivery-location" className="block mb-2 text-sm font-medium text-emerald-700">
              Choose your delivery town:
            </label>

            <select
              id="delivery-location"
              name="delivery-location"
              className="w-full p-2 border border-gray-300 rounded-md text-emerald-800 focus:outline-none focus:ring-2 focus:ring-gray-400 transition duration-200"
            >
              {/* Placeholder option */}
              <option value="">-- Select Location --</option>

              {/* Major towns in Kenya */}
              <option value="nairobi">Nairobi</option>
              <option value="mombasa">Mombasa</option>
              <option value="kisumu">Kisumu</option>
              <option value="nakuru">Nakuru</option>
              <option value="eldoret">Eldoret</option>
              <option value="thika">Thika</option>
              <option value="malindi">Malindi</option>
              <option value="kitale">Kitale</option>
              <option value="nyeri">Nyeri</option>
              <option value="embu">Embu</option>
              <option value="meru">Meru</option>
              <option value="kericho">Kericho</option>
              <option value="kakamega">Kakamega</option>
              <option value="bungoma">Bungoma</option>
              <option value="machakos">Machakos</option>
              <option value="narok">Narok</option>
              <option value="naivasha">Naivasha</option>
              <option value="garissa">Garissa</option>
              <option value="lodwar">Lodwar</option>
              <option value="wajir">Wajir</option>
              <option value="mandera">Mandera</option>
              <option value="isiolo">Isiolo</option>
              <option value="marsabit">Marsabit</option>
              <option value="lamu">Lamu</option>
              <option value="nyahururu">Nyahururu</option>
            </select>
          </div>

        </div>
        {/*  Section: Delivery details to be written on the parcel */}
        <div className="w-full max-w-md mx-auto mt-6 space-y-4">

          {/* Full Name Input */}
          <div>
            <label htmlFor="fullName" className="block text-sm font-medium text-emerald-700">
              Full Name (as per ID)
            </label>
            <input
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
            <input
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
            <input
              type="text"
              id="idNumber"
              name="idNumber"
              placeholder="ID number"
              className="mt-1 w-full p-2 border border--300 rounded-md focus:outline-none focus:ring-2 focus:ring-gray-400"
            />
          </div>

        </div>
           
           <div className='w-full text-end' >
              <button className='bg-black text-white text-sm my-8 px-8 py-3'>
                Proceed to CheckOut
              </button>
              
           </div>

      </div>

    </div>
  )
}

export default CartTotal
