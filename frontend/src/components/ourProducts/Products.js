import React from 'react'
import './Products.css'
import { useState, useEffect } from 'react';
import axios from 'axios';

const Products = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/PetsProduct')
            .then((response) => {
                setProducts(response.data);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>
    }

    return (
        <div className='products px-[10px] md:px-[60px] py-[20px] '>
            <small className='capitalize '>hard to choose right product for your pets?</small>
            <div className="box  flex justify-between text-[#003459] items-center capitalize">
                <h3 className='font-medium'>our products</h3>
                <button className='border-[#003459] border-[1px] rounded-2xl px-2 py-1 '>
                    view more
                </button>
            </div>
            <div className=" grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2  ">
                {
                    products.map((products, index) => (
                        <div key={index} className="  rounded-lg p-3 product">
                            <img src={products.image[0]}  alt="" className='rounded-lg mb-2 w-full h-[250px]'/>
                            <h5 className='font-bold capitalize mt-2'>{products.brand}</h5>
                            <p className='font-medium'>{products.productName}</p>
                            <div className="details flex gap-2 text-[#6f7d81] capitalize ">
                                <small >
                                    Product: {products.category}
                                </small>
                                <small>
                                    size: {products.size}
                                </small>

                            </div>
                            <div className="price font-medium">
                                ₹ {products.price}
                            </div>
                            <div className="gift font-medium bg-[#fceed5] px-2 py-1 rounded-sm text-center capitalize flex gap-2 items-center ">
                                <img src={products.gift} alt="" />
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