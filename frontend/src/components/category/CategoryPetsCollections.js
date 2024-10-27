import React, { useState, useEffect } from 'react';
import axios from 'axios';
import '../category/CategoryPetsCollections.css';

const CategoryPetsCollections = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        axios.get('http://localhost:5000/api/animal/getanimals')
            .then((response) => {
                setProducts(response.data.allPets);
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
        <div className='collections flex flex-col gap-1 px-[10px] py-[10px] md:px-[60px] md:py-[20px]'>
           
            <div className="pets-collections grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2">
                {
                    products.map((pro, index) => (
                        <div key={index} className="product rounded-lg p-3">
                            <img src={pro.images[0]} alt={pro.name} className='rounded-lg mb-2 w-full h-[250px]' />
                            <div className='flex items-center gap-2'>
                                <h5 className='text-base font-medium'>{pro.SKU} - {pro.name}</h5>
                            </div>
                            <div className="details flex gap-4">
                                <small>Gene:  {pro.gender}</small>
                                <small>Age:  {pro.age} {pro.ageUnit}</small>
                            </div>
                            <div className="price mt-1 text-base font-medium">
                                ₹{pro.price}
                            </div>
                        </div>
                    ))

                }

            </div>

        </div>
    );
}

export default CategoryPetsCollections;