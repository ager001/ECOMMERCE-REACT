import React, { useContext, useState, useEffect } from 'react';
import { ShopContext } from '../context/ShopContext';
import { assets } from '../assets/assets';
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

const Collection = () => {
  const { products } = useContext(ShopContext);
  const [showFilter, setShowFilter] = useState(false);
  const [filterProducts, setFilterProducts] = useState([]);

  const [category, setCategory]= useState([]);
  const [subCategory, setSubCategory] = useState([])
  const [sortType, setSortType] = useState('relevant')

  
  const toggleCategory = (e)=>{
    //This is to provide functionality of the filter
    
    // Check if the selected category already exists in the current list

    if (category.includes(e.target.value)) {
    // If it exists, remove it from the list by filtering it out
      setCategory(prev=> prev.filter(item=> item !== e.target.value))
    }
    else{// If it doesn't exist, add it to the list
      setCategory(prev=> [...prev, e.target.value])
    }

  }


  // Function to toggle a subcategory in the filter list
  const toggleSubCategory = (e) =>{
    // Check if the selected subcategory is already in the list
    if (subCategory.includes(e.target.value)){
      // If it is, remove it from the list
      setSubCategory(prev=> prev.filter(item=> item !== e.target.value))
    }
    else{
      // If it isn't, add it to the list
      setSubCategory(prev=> [...prev, e.target.value])
    }
  }

  // Function to apply the selected category filters to the product list
  const applyFilter = ()=>{
     // Create a shallow copy of the original products array
    let productsCopy = products.slice();
    // If any categories are selected, filter the products by those categories
    if (category.length > 0){
      productsCopy = productsCopy.filter(item => category.includes(item.category));
    }
      // Update the filtered products state with the filtered list
    setFilterProducts(productsCopy)
    
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item => subCategory.includes(item.subCategory));
    }

    setFilterProducts(productsCopy)
  }

// Function to sort the filtered products based on selected sort type
const sortProduct = () => {
  // Create a copy of the current filtered products to avoid mutating state directly
  let filterProductCopy = [...filterProducts];

  // Apply sorting logic based on the selected sort type
  switch (sortType) {
    case 'low-high':
      // Sort products by price in ascending order
      setFilterProducts(filterProductCopy.sort((a, b) => a.price - b.price));
      break;

    case 'high-low':
      // Sort products by price in descending order
      setFilterProducts(filterProductCopy.sort((a, b) => b.price - a.price));
      break;

    default:
      // If sort type is 'relevant' or unrecognized, reapply the filter without sorting
      applyFilter();
      break;
  }
};

// Reapply filters whenever category or subcategory selections change
useEffect(() => {
  applyFilter();
}, [category, subCategory]);

// Re-sort products whenever the sort type changes
useEffect(() => {
  sortProduct();
}, [sortType]);
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-amber-300 text-emerald-700'>
      
      {/* Filter Options on the left side */}
      <div className='min-w-60'>
        {/*Hide and display of the filter area only works on small screen only */}
        <p onClick={()=>setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>FILTERS
          <img src={assets.dropdown_icon} alt="" 
          className={`h-3 sm:hidden ${showFilter ? 'rotate-90' :'' }`}/>
        </p>

        {/* Category Filter */}
        <div className={`border border-amber-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light'>
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory}/>Men
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} />Women
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} />Kids
            </label>
          </div>
        </div>

        {/* Type Filter */}
        <div className={`border border-amber-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light'>
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} />Top Wear
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory}  />Bottom Wear
            </label>
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'}  onChange={toggleSubCategory} />Winter Wear
            </label>
          </div>
        </div>
      </div>
      {/*Right Side  */}
      <div className='flex-1'>
          <div className='flex justify-between text-base sm:text-2xl mb-4'>
                <Title text1={'ALL'} text2={'COLLECTIONS'}/>
                {/*Product Sort */}
                <select onChange={(e)=>setSortType(e.target.value)} className='border-2 border-amber-300 text-sm px-2'>
                      <option value="relevant">Sort by: Relevant</option>
                      <option value="low-high">Sort by: Low to High</option>
                      <option value="high-low">Sort by: High to Low</option>
                </select>
          </div>

          {/*Map Products */}

          <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                {
                  filterProducts.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image} />
                  ))
                }
          </div>


      </div>


    </div>
  );
};

export default Collection;