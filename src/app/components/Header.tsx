'use client'
import { Search } from 'lucide-react';

const Header = () => {

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div className='flex items-center justify-between px-4 sm:px-6 md:px-12 lg:px-20 py-4 sticky top-0 z-50 bg-white/70 backdrop-blur-md'>
        <h1 
          onClick={scrollToTop}
          className='cursor-pointer text-gray-700 hover:text-black text-lg sm:text-xl md:text-xl'>
          NextNews
        </h1>

        <div className='flex items-center justify-end gap-6 sm:gap-6 md:gap-8'>
            <Search 
              className='text-gray-700 hover:text-black cursor-pointer' 
              size={18} 
            /> 

            <div className='text-gray-700 text-lg hover:text-black cursor-pointer'>
              ☰
            </div>      
        </div>
    </div>
  )
}

export default Header
