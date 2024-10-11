import React from 'react'
import './Products.css'
import products from '../../data/outProducts'
const Products = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]
    return (
        <div className='products px-[10px] md:px-[60px] py-[20px] '>
            <small className='capitalize '>hard to choose right product for your pets?</small>
            <div className="box  flex justify-between text-[#003459] items-center capitalize">
                <h3 className='font-medium'>our products</h3>
                <button className='border-[#003459] border-[1px] rounded-2xl px-2 py-1 '>
                view more >
                </button>
            </div>
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2  ">
                {
                    arr.map((pro, index) => (
                        <div key={index} className="  rounded-lg p-3 product">
                            <img src={products.product} alt="" className='shadow-none' />
                            <h5 className='font-medium capitalize'>reflect adult food </h5>
                            <div className="details flex gap-2 text-[#6f7d81] capitalize ">
                                <small >
                                    product : dog food
                                </small>
                                <small>
                                    size : 300gm
                                </small>

                            </div>
                            <div className="price font-medium">
                                50000
                            </div>
                            <div className="gift font-medium bg-[#fceed5] px-2 py-1 rounded-sm text-center capitalize flex gap-2 items-center ">
                              <img src=  {products.gift} alt="" />
                              free toy and ree shake 
                            </div>
                        </div>
                    ))

                }

            </div>

        </div>
    )
}

export default Products