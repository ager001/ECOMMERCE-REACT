import React from 'react'
import {NavLink} from 'react-router-dom'
import { assets } from '../assets/assets'




const SideBar = () => {
  return (
    <div className="w-[20%] min-h-screen border-r-2">
      <div className="flex flex-col gap-6 pt-8 pl-6 text-[17px]">
        {/* Add Items */}
        <NavLink
          to="/add"
          className="flex items-center gap-4 border border-gray-300 border-r-0 px-4 py-3 rounded"
        >
          <img src={assets.add_icon} alt="Add Icon" className="w-6 h-6" />
          <p className="text-emerald-700 hidden md:block">Add Items</p>
        </NavLink>

        {/* List Items */}
        <NavLink
          to="/list"
          className="flex items-center gap-4 border border-gray-300 border-r-0 px-4 py-3 rounded"
        >
          <img src={assets.order_icon} alt="List Icon" className="w-6 h-6" />
          <p className="text-emerald-700 hidden md:block">List Items</p>
        </NavLink>

        {/* Orders */}
        <NavLink
          to="/orders"
          className="flex items-center gap-4 border border-gray-300 border-r-0 px-4 py-3 rounded"
        >
          <img src={assets.order_icon} alt="Orders Icon" className="w-6 h-6" />
          <p className="text-emerald-700 hidden md:block">Orders</p>
        </NavLink>
      </div>
    </div>
  );
};
export default SideBar
