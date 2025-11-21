import React from 'react'
import { Search } from 'lucide-react';

const Header = () => {
  return (
    <div className='flex items-center justify-between mt-4'>
        <h1 className='ml-12 cursor-pointer text-gray-700 hover:text-black'>NextNews</h1>

        <div className='flex items-center justify-end gap-8 mr-24'>
            <Search className='text-gray-700 hover:text-black cursor-pointer' size={18} /> 

            <div className='text-gray-700 text-lg hover:text-black cursor-pointer'>☰</div>      
        </div>
    </div>
  )
}

export default Header