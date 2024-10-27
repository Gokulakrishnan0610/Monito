import React, { useEffect, useState } from 'react'
import './Products.css'
import axios from 'axios'
const Products = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7, 8]
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:5000/api/products/getproduct')
            .then((response) => {
                console.log(response.data.allPets);
                setProducts(response.data.allPets);
                setLoading(false);
            })
            .catch((error) => {
                console.log(error);
                setLoading(false);
            });
    }, []);
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
                    products.map((pro, index) => (
                        <div key={index} className="  rounded-lg p-3 product">
                            <img
                                src={`data:image/jpeg;base64,${pro.images[0]}`}
                                alt="" className='rounded-lg w-full h-[250px]' />
                            <h5 className='font-medium capitalize'>{pro.name.slice(0, 10)}...</h5>
                            <div className="details flex flex-col gap- text-[#6f7d81] capitalize ">
                                <small >
                                    Seller: {pro.seller}
                                </small>
                                <small>
                                    size : {pro.quantity}gm
                                </small>

                            </div>
                            <div className="price font-medium">
                                ₹{pro.price}
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