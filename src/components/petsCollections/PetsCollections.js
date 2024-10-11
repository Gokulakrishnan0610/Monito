import React from 'react'
import './PetsCollections.css'
import aboutPet from '../../data/petsCollections'


const PetsCollections = () => {
    const arr = [1, 2, 3, 4, 5, 6, 7,8]
    return (
        <div className='collections flex flex-col gap-1 px-[10px] py-[10px] md:px-[60px] md:py-[20px]  '>
            <small className='font-medium px-[10px]  '>Whats new?</small>
            <div className="collections-box1-1 flex justify-between capitalize items-center  px-[10px]  ">
                <h3 className='font-medium text-[#003459] '>take a look at some out of pets</h3>
                <button className='px-3 py-1  border-[2px] hover:bg-[#003459] hover:text-white rounded-2xl  border-[#003459] text-[#003459] '>
                view more >
                </button>
            </div>
            <div className="pets-collections grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4 mt-2  ">
                {
                    arr.map((pro, index) => (
                        <div key={index} className="product  rounded-lg p-3">
                            <img src={aboutPet.image} alt="" className='rounded-lg' />
                            <h5>Mo235- pomeranian White</h5>
                            <div className="details">
                                <small>
                                    Genter : Male
                                </small>
                                <small>
                                    Age : 02 month
                                </small>

                            </div>
                            <div className="price">
                                50000
                            </div>
                        </div>
                    ))

                }

            </div>

        </div>
    )
}

export default PetsCollections