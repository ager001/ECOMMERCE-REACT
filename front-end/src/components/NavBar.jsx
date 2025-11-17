import React, { useContext, useState } from 'react';
import { assets } from '../assets/assets';
import { NavLink, Link } from 'react-router-dom';
import { ShopContext } from '../context/ShopContext';

const NavBar = () => {
  // State to control the visibility of the mobile side menu
  const [visible, setVisible] = useState(false);

  // Destructure context values
  const { setShowSearch, getCartCount, navigate, token, setToken, setCartItems } = useContext(ShopContext);

  // Log out function
  const logout = () => {
    // Log out order adjusted for better flow: Clear state, clear storage, then navigate
    setToken('');
    setCartItems({});
    localStorage.removeItem('token');
    navigate('/login');
  }

  return (
    <div className='flex items-center justify-between py-5 font-medium'>
      <Link to={'/'}><img src={assets.logo} alt="Brand logo" className='w-36' /></Link>

      {/* Main Navigation Links (Desktop) */}
      <ul className='hidden sm:flex gap-5 text-sm text-emerald-800 pl-7 pr-7'>
        <li>
          <NavLink to='/' className='flex flex-col items-center gap-1'>
            <p>HOME</p>
            <hr className='w-3/4 border-none h-[1.5px] bg-amber-200 hidden' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/collection' className='flex flex-col items-center gap-1'>
            <p>COLLECTION</p>
            <hr className='w-3/4 border-none h-[1.5px] bg-amber-200 hidden' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/about' className='flex flex-col items-center gap-1'>
            <p>ABOUT</p>
            <hr className='w-3/4 border-none h-[1.5px] bg-amber-200 hidden' />
          </NavLink>
        </li>
        <li>
          <NavLink to='/contact' className='flex flex-col items-center gap-1'>
            <p>CONTACT</p>
            <hr className='w-3/4 border-none h-[1.5px] bg-amber-200 hidden' />
          </NavLink>
        </li>
      </ul>

      <div className='flex items-center gap-5'>
        {/* Search Icon */}
        <img onClick={() => setShowSearch(true)} src={assets.search_icon} alt="Search icon" className='w-5 cursor-pointer' />

        {/* Profile Icon and Dropdown Menu */}
        <div className='group relative'>
          {/* Profile Icon Click Handler: navigate to login if no token, otherwise do nothing */}
          <img
            onClick={() => !token && navigate('/login')}
            src={assets.profile_icon}
            alt="Profile icon"
            className='w-5 cursor-pointer'
          />

          {/* Drop down Menu (Visible only when token exists) */}
          {token &&
            <div className='group-hover:block hidden absolute right-0 pt-4 z-10'> {/* Added z-10 for layering consistency */}
              <div className='flex flex-col gap-2 w-40 py-3 px-5 bg-amber-50 text-gray-500 rounded shadow-md'>
                <p className='cursor-pointer hover:text-black'>My Profile</p>
                <p onClick={()=>navigate('/orders')} className='cursor-pointer hover:text-black'>Orders</p>
                <p onClick={logout} className='cursor-pointer hover:text-black'>Logout</p>
              </div>
            </div> /* <-- **FIXED INCONSISTENCY:** Added missing closing </div> tag */
          }
        </div>

        {/* Cart Icon */}
        <Link to='/cart' className='relative'>
          <img src={assets.cart_icon} alt="Cart icon" className='w-5 min-w-5' />
          <p className='absolute -right-[5px] -bottom-[5px] w-4 text-center leading-4 bg-amber-950 text-white aspect-square rounded-full text-[8px]'>
            {getCartCount()}
          </p>
        </Link>

        {/* Mobile Menu Icon */}
        <img onClick={() => setVisible(true)} src={assets.menu_icon} alt="Menu icon" className='w-5 cursor-pointer sm:hidden' />

        {/* Side bar menu for small screen */}
        <div className={`fixed top-0 right-0 bottom-0 overflow-hidden bg-amber-50 transition-all z-20 
              ${visible ? 'w-3/4 max-w-xs' : 'w-0'}`}> {/* Adjusted class to use fixed and controlled width */}
          <div className='flex flex-col text-emerald-800 h-full'>
            <div onClick={() => setVisible(false)} className='flex items-center gap-4 p-3 cursor-pointer bg-amber-100'> {/* Added background for clarity */}
              <img src={assets.dropdown_icon} alt="Back arrow" className='h-4 rotate-180' />
              <p>Back</p>
            </div>
            <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-emerald-200 hover:bg-amber-100' to='/'>HOME</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-emerald-200 hover:bg-amber-100' to='/collection'>COLLECTION</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-emerald-200 hover:bg-amber-100' to='/about'>ABOUT</NavLink>
            <NavLink onClick={() => setVisible(false)} className='py-3 pl-6 border-b border-emerald-200 hover:bg-amber-100' to='/contact'>CONTACT</NavLink>
          </div>
        </div>

      </div>
    </div>
  );
};

export default NavBar;