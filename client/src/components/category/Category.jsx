import React from 'react'

const Category = () => {
  return (
    <div className='max-w-[1640px] px-4 py-12 mx-auto'>
    <h6 className='text-black-600 font-bold text-xl text-left'>Categories</h6>
    {/* Categoties */}
    <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-6'>
        
            <div  className='bg-white rounded-lg p-4 flex justify-between items-center'>
                <h2 className='font-bold sm:text-xl'>Sport</h2>
                <img src="https://www.shutterstock.com/image-vector/running-man-athletics-marathon-summer-260nw-1347864386.jpg" alt="loading" className='w-10'/>
            </div>
            <div  className='bg-white rounded-lg p-4 flex justify-between items-center'>
                <h2 className='font-bold sm:text-xl'>Education</h2>
                <img src="https://cdn-icons-png.flaticon.com/512/4117/4117763.png" alt="loading" className='w-10'/>
            </div>
            <div  className='bg-white rounded-lg p-4 flex justify-between items-center'>
                <h2 className='font-bold sm:text-xl'>Festival</h2>
                <img src="https://cdn-icons-png.flaticon.com/512/147/147144.png" alt="loading" className='w-10'/>
            </div>
            <div  className='bg-white rounded-lg p-4 flex justify-between items-center'>
                <h2 className='font-bold sm:text-xl'>Night</h2>
                <img src="https://cdn-icons-png.flaticon.com/512/5900/5900426.png" alt="loading" className='w-10'/>
            </div>
      
      
    </div>
</div>
  )
}

export default Category