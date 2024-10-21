import React, { useState, useEffect } from 'react';
import axios from 'axios';
// import "./AddPetsProducts.css"
import { FaTrash } from 'react-icons/fa';
import './AddPets.css'
const AddPets = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        SKU: '',
        name: '',
        animalType: '',
        breadType:'',
        price: '',
        image: [],
        gender: '',
        age: '',
        ageUnit: '',
        size: '',
        color: '',
        vaccinated: false,
        dewormed: false,
        phoneNumber: '',
        location: '',
        publishedDate: '',
        additionalInfo: ''
    });

    const [editMode, setEditMode] = useState(false);
    const [productIdToEdit, setProductIdToEdit] = useState(null);

    useEffect(() => {
        console.log(form.image);
    }, [form]);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        const newImages = Array.from(files).map((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prevForm) => ({
                    ...prevForm,
                    image: [...prevForm.image, reader.result],
                }));
            };
            reader.readAsDataURL(file);
            return reader.result;
        });
        console.log(form.image);
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = {
            ...form
        };

        try {
            if (editMode) {
                const response = await axios.put(`http://localhost:5000/products/${productIdToEdit}`, productData);
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productIdToEdit ? response.data : product
                    )
                );
                setEditMode(false);
                setProductIdToEdit(null);
            } else {
                console.log(productData)
                const response = await axios.post('http://localhost:5000/products', productData, {
                    headers: { 'Content-Type': 'application/json' }
                });
                setProducts((prevProducts) => [...prevProducts, response.data]);
            }
            resetForm();
        } catch (error) {
            console.error('Error adding/updating product:', error);
        }
    };

    const resetForm = () => {
        setForm({
            SKU: '',
            name: '',
            animalType: '',
            breadType:'',
            price: '',
            image: [],
            gender: '',
            age: '',
            ageUnit: '',
            size: '',
            color: '',
            vaccinated: false,
            dewormed: false,
            phoneNumber: '',
            location: '',
            publishedDate: '',
            additionalInfo: ''
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/products/${id}`)
            .then(() => setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)))
            .catch((error) => console.error('Error deleting product:', error));
    };

    const handleEdit = (product) => {
        setForm({
            SKU: product.SKU,
            name: product.name,
            price: product.price,
            animalType: product.animalType,
            breadType:product.breadType,
            image: product.image,
            gender: product.gender,
            age: product.age,
            ageUnit: product.age,
            size: product.ageUnit,
            color: product.color,
            vaccinated: product.vaccinated,
            dewormed: product.dewormed,
            phoneNumber: product.phoneNumber,
            location: product.location,
            publishedDate: product.publishedDate,
            additionalInfo: product.additionalInfo
        });
        setProductIdToEdit(product._id);
        setEditMode(true);
    };

    const handleDeleteImage = (index) => {
        const updatedImages = form.image.filter((_, i) => i !== index);
        setForm({ ...form, image: updatedImages });
    };

    return (
        <div className=" overflow-scroll min-h-screen w-screen py-6 bg-gray-100 ">


            <form onSubmit={handleSubmit} className=" m-auto w-[90%] md:max-w-[50%]  overflow-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Add New Adoption</h2>


                <div className="mb-4">
                    <label htmlFor="SKU" className="block mb-2">SKU</label>
                    <input
                        type="text"
                        name="SKU"
                        placeholder="SKU"
                        value={form.SKU}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>


                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        placeholder="Name"
                        value={form.name}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Animal Type Input */}
                <div className="mb-4 w-full">
                    <label htmlFor="animalType" className="block mb-2 text-gray-700 font-medium">
                        Animal Type
                    </label>
                    <select
                        id="animalType"
                        name="animalType"
                        value={form.animalType} // Ensure form.animalType holds the current type
                        onChange={handleInputChange} // Update this to handle the change
                        className="border w-full border-gray-300 rounded px-3 py-2 focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select an animal type</option>
                        <option value="Dog">Dog</option>
                        <option value="Cat">Cat</option>
                        <option value="Bird">Bird</option>
                        <option value="Reptile">Reptile</option>
                        <option value="Fish">Fish</option>
                        <option value="Other">Other</option>
                    </select>
                </div>

                <div className="mb-4">
                    <label htmlFor="breadType" className="block mb-2">Bread Type</label>
                    <input
                        type="text"
                        name="breadType"
                        placeholder="Enter Bread Type"
                        value={form.breadType}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>




                <div className="mb-4">
                    <label htmlFor="price" className="block mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        placeholder="Price"
                        value={form.price}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>






                <div className="mb-4">
                    <label htmlFor="gender" className="block mb-2">Gender</label>
                    <select
                        name="gender"
                        value={form.gender}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Gender</option>
                        <option value="Male">Male</option>
                        <option value="Female">Female</option>
                    </select>
                </div>






                <div className="mb-4">
                    <label htmlFor="age" className="block mb-2">Age</label>
                    <div className="flex gap-3">

                        <input
                            type="number"
                            name="age"
                            placeholder="Age"
                            value={form.age}
                            onChange={handleInputChange}
                            required
                            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        />

                        <select
                            name="ageUnit"
                            value={form.ageUnit}
                            onChange={handleInputChange}
                            required
                            className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        >
                            <option value="">Select</option>
                            <option value="years">Years</option>
                            <option value="months">Months</option>
                        </select>
                    </div>
                </div>



                <div className="mb-4">
                    <label htmlFor="size" className="block mb-2">Size</label>
                    <select
                        name="size"
                        value={form.size}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Size</option>
                        <option value="Small">Small</option>
                        <option value="Medium">Medium</option>
                        <option value="Large">Large</option>
                    </select>
                </div>
                {/* Location Input */}
                <div className="mb-4">
                    <label htmlFor="location" className="block mb-2">Location (Select State)</label>
                    <select
                        name="location"
                        value={form.location}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select State</option> {/* Placeholder option */}
                        <option value="Tamil Nadu">Tamil Nadu</option>
                        <option value="Tamil Nadu - Chennai">Chennai</option>
                        <option value="Tamil Nadu - Coimbatore">Coimbatore</option>
                        <option value="Tamil Nadu - Madurai">Madurai</option>
                        <option value="Tamil Nadu - Tiruchirappalli">Tiruchirappalli</option>
                        <option value="Tamil Nadu - Salem">Salem</option>
                        <option value="Tamil Nadu - Tirunelveli">Tirunelveli</option>
                        <option value="Tamil Nadu - Erode">Erode</option>
                        <option value="Tamil Nadu - Vellore">Vellore</option>
                        <option value="Tamil Nadu - Kanyakumari">Kanyakumari</option>
                        <option value="Tamil Nadu - Thanjavur">Thanjavur</option>
                        <option value="Tamil Nadu - Dindigul">Dindigul</option>
                        {/* Add more states or districts as needed */}
                    </select>
                </div>




                <div className="mb-4">
                    <label htmlFor="color" className="block mb-2">Color</label>
                    <input
                        type="text"
                        name="color"
                        placeholder="Color"
                        value={form.color}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>




                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        name="vaccinated"
                        checked={form.vaccinated}
                        onChange={handleInputChange}
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200 transition duration-200"
                    />
                    <label className="ml-2 block text-gray-700 font-medium">
                        Vaccinated
                    </label>
                </div>


                <div className="mb-4 flex items-center">
                    <input
                        type="checkbox"
                        name="dewormed"
                        checked={form.dewormed}
                        onChange={handleInputChange}
                        className="form-checkbox h-5 w-5 text-blue-600 border-gray-300 rounded focus:ring focus:ring-blue-200 transition duration-200"
                    />
                    <label className="ml-2 block text-gray-700 font-medium">
                        Dewormed
                    </label>
                </div>



                <div className="mb-4">
                    <label htmlFor="number" className="block mb-2">Mobile Number</label>
                    <input
                        type="text"
                        name="phoneNumber"
                        placeholder="Mobile Number"
                        value={form.number}
                        onChange={(e) => {

                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) {
                                handleInputChange(e);
                            }
                        }}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>
                <div className="mb-4">
                    <label className="block mb-2 text-gray-700 font-medium">Images</label>
                    <div className="flex items-center border border-gray-300 rounded-md overflow-hidden"> {/* Change rounded-lg to rounded-md for same radius */}
                        <span className="flex-1 px-3 text-gray-500">Choose Images</span>
                        <label
                            className="px-4 py-3 bg-gray-200 text-gray-600 cursor-pointer hover:bg-gray-300 transition"
                            htmlFor="customFile"
                        >
                            Add
                        </label>
                        <input
                            type="file"
                            id="customFile"
                            name="image"
                            multiple
                            onChange={handleFileChange}
                            className="hidden"
                            disabled={form.image.length >= 5}
                        />
                    </div>
                    <div className="flex flex-wrap mt-3 gap-2">
                        {form.image.map((img, index) => (
                            <div
                                key={index}
                                className="relative w-20 h-20 border border-gray-300 rounded-md overflow-hidden transition duration-300 ease-in-out hover:bg-gray-200"
                            >
                                <img
                                    src={img}
                                    alt={`Image Preview ${index + 1}`}
                                    className="w-full h-full object-cover"
                                />
                                <button
                                    onClick={() => handleDeleteImage(index)}
                                    className="absolute inset-0 flex items-center justify-center bg-gray-200 transition-opacity duration-300 opacity-0 hover:opacity-100"
                                    title="Delete Image"
                                >
                                    <FaTrash className="text-red-700" />
                                </button>
                            </div>
                        ))}
                    </div>
                    {form.image.length >= 5 && (
                        <span className="text-red-500 text-sm mt-2">You can only upload a maximum of 5 images.</span>
                    )}
                </div>






                <div className="mb-4">
                    <label htmlFor="additionalInfo" className="block mb-2">Additional Info</label>
                    <textarea
                        name="additionalInfo"
                        placeholder="Additional Information"
                        value={form.additionalInfo}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    {editMode ? 'Update Product' : 'Add Product'}
                </button>
            </form>

            <h2 className="text-xl font-bold mt-6">Product List</h2>
            <ul className="mt-4">
                {products.map((product) => (
                    <li key={product._id} className="flex justify-between items-center mb-2 p-4 border-b">
                        <div>
                            <h3 className="font-semibold">{product.name}</h3>
                            <p>SKU: {product.SKU}</p>
                            <p>Price: ${product.price}</p>
                        </div>
                        <div>
                            <button
                                onClick={() => handleEdit(product)}
                                className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
                            >
                                Edit
                            </button>
                            <button
                                onClick={() => handleDelete(product._id)}
                                className="bg-red-500 text-white py-1 px-2 rounded"
                            >
                                Delete
                            </button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddPets;

