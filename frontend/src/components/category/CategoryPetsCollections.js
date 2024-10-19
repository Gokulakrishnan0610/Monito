import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../category/CategoryPetsCollections.css';

const CategoryPetsCollections = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true); 

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then((response) => {
                setProducts(response.data); // set the fetched products
                setLoading(false); // set loading to false after data is fetched
            })
            .catch((error) => {
                console.log(error);
                setLoading(false); // stop loading in case of error
            });
    }, []);

    if (loading) {
        return <div>Loading...</div>; // Show loading message while fetching data
    }

    return (
        <div className='collections flex flex-col gap-1 px-[10px] py-[10px] md:px-[60px] md:py-[20px]'>
            <small className='font-medium px-[10px]'>What's new?</small>
            <div className="collections-box1-1 flex justify-between capitalize items-center px-[10px]">
                <h3 className='font-medium text-[#003459]'>Take a look at some of our pets</h3>
                <button className='px-3 py-1 border-[2px] hover:bg-[#003459] hover:text-white rounded-2xl border-[#003459] text-[#003459]'>
                    View more
                </button>
            </div>
            <div className="pets-collections grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                {
                    products.map((pro, index) => (
                        <div key={index} className="product rounded-lg p-3">
                            <img src={pro.image} alt={pro.name} className='rounded-lg mb-2' />
                            <div className='flex items-center gap-2'>
                                <h5 className='text-base font-medium'>{pro.SKU} - {pro.name}</h5>
                            </div>
                            <div className="details flex gap-4">
                                <small>Gene:  {pro.gender}</small>
                                <small>Age:  {pro.age}</small>
                            </div>
                            <div className="price mt-1 text-base font-medium">
                                ₹ {pro.price}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    );
}

export default CategoryPetsCollections;