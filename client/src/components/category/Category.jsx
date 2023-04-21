import React, { useEffect } from 'react'
import { fetchCategorys } from '../../redux/categorySlice'
import { useDispatch, useSelector } from 'react-redux'
import Loading from '../utility/Loading'

const Category = ({ filterCategory }) => {
    const { categorys, loading, error } = useSelector((state) => state.categorys)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchCategorys())
    }, [dispatch])

    return (
        <div className='max-w-[1640px] px-4 py-12 mx-auto'>
            <h6 className='text-black-600 font-bold text-xl text-left'>Categories</h6>

            {/* Categoties */}
            <Loading loading={loading} error={error}>
                <div className='grid grid-cols-2 md:grid-cols-4 gap-6 py-6'>
                            <div className='bg-white rounded-lg p-4 flex justify-between items-center cursor-pointer' onClick={() => filterCategory("all")}>
                                <h2 className='font-bold sm:text-xl'>All</h2>
                                <img src="/assets/all.png" alt="loading" className='w-10' />
                            </div>
                    {categorys.map((category, index) => (
                        <div key={index}>
                            <div className='bg-white rounded-lg p-4 flex justify-between items-center cursor-pointer' onClick={() => filterCategory(category.name)}>
                                <h2 className='font-bold sm:text-xl'>{category.name}</h2>
                                <img src="https://www.shutterstock.com/image-vector/running-man-athletics-marathon-summer-260nw-1347864386.jpg" alt="loading" className='w-10' />
                            </div>
                        </div>
                    ))}
                </div>
            </Loading>
        </div>
    )
}

export default Category
