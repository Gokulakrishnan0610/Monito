import React, { useState, useEffect } from 'react'
import './PetsCollections.css'
import aboutPet from '../../data/petsCollections'
import axios from 'axios'


const PetsCollections = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    useEffect(() => {
        axios.get('http://localhost:5000/api/animal/getanimals')
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
    
        <div className='collections flex flex-col gap-1 px-[10px] py-[10px] md:px-[60px] md:py-[20px]  '>
            <small className='font-medium px-[10px]  '>Whats new?</small>
            <div className="collections-box1-1 flex justify-between capitalize items-center  px-[10px]  ">
                <h3 className='font-medium text-[#003459] '>take a look at some out of pets</h3>
                <button className='px-3 py-1  border-[2px] hover:bg-[#003459] hover:text-white rounded-2xl  border-[#003459] text-[#003459] '>
                    view more
                </button>
            </div>
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
                            <div className="details flex gap-4">
                                <small>Gene:  {data.gender}</small>
                                <small>Age:  {data.age} {data.ageUnit}</small>
                            </div>
                            <div className="price mt-1 text-base font-medium">
                                ₹ {data.price}
                            </div>
                        </div>
                    ))
                }
            </div>
        </div>
    )
}

export default PetsCollections