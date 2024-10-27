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
     
        <div className='collections flex flex-col gap-1 px-[10px] py-[10px] md:px-[60px] md:py-[20px]  '>
           
           
            <div className="pets-collections grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2  ">
                {
                    products.map((data, index) => (
                        <div key={index} className="product  rounded-lg p-3">
                            <img
                                src={`data:image/jpeg;base64,${data.images[0]}`}
                                alt="" className='rounded-lg w-full h-[250px]' />

                            <h5>{data.name
                            }</h5>
                            <div className="details">
                                <small>
                                    Genter : {data.genter}
                                </small>
                                <small>
                                    Age : {data.age}{data.ageUnit}
                                </small>

                            </div>
                            <div className="price">
                                ₹{data.price}
                            </div>
                        </div>
                    ))

                }

            </div>

        </div>
    );
}

export default CategoryPetsCollections;