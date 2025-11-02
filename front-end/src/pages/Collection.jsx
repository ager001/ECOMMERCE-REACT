// Importing React and necessary hooks for state and lifecycle management
import React, { useContext, useState, useEffect } from 'react';

// Importing shared context to access global product and search state
import { ShopContext } from '../context/ShopContext';

// Importing static assets like icons
import { assets } from '../assets/assets';

// Importing reusable UI components
import Title from '../components/Title';
import ProductItem from '../components/ProductItem';

// Defining the main Collection component
const Collection = () => {

  // Accessing shared state from ShopContext
  const { products, search, showSearch } = useContext(ShopContext);

  // Local state to toggle filter visibility (especially on small screens)
  const [showFilter, setShowFilter] = useState(false);

  // Local state to store filtered and sorted products
  const [filterProducts, setFilterProducts] = useState([]);

  // Local state to track selected category filters (e.g., Men, Women)
  const [category, setCategory] = useState([]);

  // Local state to track selected subcategory filters (e.g., Topwear)
  const [subCategory, setSubCategory] = useState([]);

  // Local state to track selected sort type (e.g., low-high)
  const [sortType, setSortType] = useState('relevant');

  // Function to toggle category selection when a checkbox is clicked
  const toggleCategory = (e) => {
    // If the category is already selected, remove it
    if (category.includes(e.target.value)) {
      setCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      // Otherwise, add it to the selected list
      setCategory(prev => [...prev, e.target.value]);
    }
  };

  // Function to toggle subcategory selection when a checkbox is clicked
  const toggleSubCategory = (e) => {
    // If the subcategory is already selected, remove it
    if (subCategory.includes(e.target.value)) {
      setSubCategory(prev => prev.filter(item => item !== e.target.value));
    } else {
      // Otherwise, add it to the selected list
      setSubCategory(prev => [...prev, e.target.value]);
    }
  };

  // Function to apply filters based on search, category, and subcategory
  const applyFilter = () => {
    // Create a copy of the original products array
    let productsCopy = products.slice();

    // If search is active, filter products by name match
    if (showSearch && search) {
      productsCopy = productsCopy.filter(item =>
        item.name.toLowerCase().includes(search.toLowerCase())
      );
    }

    // If any categories are selected, filter by category
    if (category.length > 0) {
      productsCopy = productsCopy.filter(item =>
        category.includes(item.category)
      );
    }

    // Update the filtered products state
    setFilterProducts(productsCopy);

    // If any subcategories are selected, filter by subcategory
    if (subCategory.length > 0) {
      productsCopy = productsCopy.filter(item =>
        subCategory.includes(item.subCategory)
      );
    }

    // Update the filtered products again after subcategory filtering
    setFilterProducts(productsCopy);
  };

  // Function to sort products based on selected sort type
  const sortProduct = () => {
    // Create a copy of the current filtered products
    let filterProductCopy = [...filterProducts];

    // Apply sorting logic based on sortType
    switch (sortType) {
      case 'low-high':
        // Sort by price ascending
        setFilterProducts(filterProductCopy.sort((a, b) => a.price - b.price));
        break;
      case 'high-low':
        // Sort by price descending
        setFilterProducts(filterProductCopy.sort((a, b) => b.price - a.price));
        break;
      default:
        // If 'relevant', just reapply filters without sorting
        applyFilter();
        break;
    }
  };

  // Reapply filters whenever category, subcategory, search, or showSearch changes
  useEffect(() => {
    applyFilter();
  }, [category, subCategory, search, showSearch]);

  // Re-sort products whenever sortType changes
  useEffect(() => {
    sortProduct();
  }, [sortType]);

  // JSX layout for the Collection component
  return (
    <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t border-amber-300 text-emerald-700'>

      {/* Left panel: Filter options */}
      <div className='min-w-60'>

        {/* Toggle filter visibility on small screens */}
        <p onClick={() => setShowFilter(!showFilter)} className='my-2 text-xl flex items-center cursor-pointer gap-2'>
          FILTERS
          {/* Dropdown icon rotates when filter is shown */}
          <img src={assets.dropdown_icon} alt=""
            className={`h-3 sm:hidden ${showFilter ? 'rotate-90' : ''}`} />
        </p>

        {/* Category filter section */}
        <div className={`border border-amber-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>CATEGORIES</p>
          <div className='flex flex-col gap-2 text-sm font-light'>
            {/* Checkbox for 'Men' category */}
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Men'} onChange={toggleCategory} />Men
            </label>
            {/* Checkbox for 'Women' category */}
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Women'} onChange={toggleCategory} />Women
            </label>
            {/* Checkbox for 'Kids' category */}
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Kids'} onChange={toggleCategory} />Kids
            </label>
          </div>
        </div>

        {/* Subcategory filter section */}
        <div className={`border border-amber-300 pl-5 py-3 my-5 ${showFilter ? '' : 'hidden'} sm:block`}>
          <p className='mb-3 text-sm font-medium'>TYPE</p>
          <div className='flex flex-col gap-2 text-sm font-light'>
            {/* Checkbox for 'Topwear' subcategory */}
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Topwear'} onChange={toggleSubCategory} />Top Wear
            </label>
            {/* Checkbox for 'Bottomwear' subcategory */}
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Bottomwear'} onChange={toggleSubCategory} />Bottom Wear
            </label>
            {/* Checkbox for 'Winterwear' subcategory */}
            <label className='flex gap-2'>
              <input type="checkbox" className='w-3' value={'Winterwear'} onChange={toggleSubCategory} />Winter Wear
            </label>
          </div>
        </div>
      </div>

      {/* Right panel: Product display */}
      <div className='flex-1'>

        {/* Header with title and sort dropdown */}
        <div className='flex justify-between text-base sm:text-2xl mb-4'>
          {/* Title component displays "ALL COLLECTIONS" */}
          <Title text1={'ALL'} text2={'COLLECTIONS'} />

          {/* Dropdown to select sort type */}
          <select onChange={(e) => setSortType(e.target.value)} className='border-2 border-amber-300 text-sm px-2'>
            <option value="relevant">Sort by: Relevant</option>
            <option value="low-high">Sort by: Low to High</option>
            <option value="high-low">Sort by: High to Low</option>
          </select>
        </div>

        {/* Grid layout to display filtered products */}
        <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
          {/* Mapping over filtered products and rendering each with ProductItem */}
          {
            filterProducts.map((item, index) => (
              <ProductItem
                key={index}
                id={item._id}
                name={item.name}
                price={item.price}
                image={item.image}
              />
            ))
          }
        </div>
      </div>
    </div>
  );
};

// Exporting the Collection component for use in other parts of the app
export default Collection;