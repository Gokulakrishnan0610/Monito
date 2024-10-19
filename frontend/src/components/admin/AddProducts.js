import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../admin/AddProducts.css"

const AddProducts = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        SKU: '',
        name: '',
        price: '',
        image: [],
        gender: '',
        age: '',
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
        // setForm({
        //     SKU: '',
        //     name: '',
        //     price: '',
        //     image: [],
        //     gender: '',
        //     age: '',
        //     size: '',
        //     color: '',
        //     vaccinated: false,
        //     dewormed: false,
        //     phoneNumber: '',
        //     location: '',
        //     publishedDate: '',
        //     additionalInfo: ''
        // });
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
            image: product.image,
            gender: product.gender,
            age: product.age,
            size: product.size,
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

    return (
        <div className="scroll-container overflow-auto max-h-screen p-6 bg-gray-100 lg:w-full lg:py-10 lg:px-24">
            <form onSubmit={handleSubmit} className="max-w-full w-full overflow-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>

                {/* SKU Input */}
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

                {/* Name Input */}
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

                {/* Price Input */}
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

                {/* Gender Input */}
                <div className="mb-4">
                    <label htmlFor="gender" className="block mb-2">Gender</label>
                    <input
                        type="text"
                        name="gender"
                        placeholder="Gender"
                        value={form.gender}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Age Input */}
                <div className="mb-4">
                    <label htmlFor="age" className="block mb-2">Age</label>
                    <input
                        type="number"
                        name="age"
                        placeholder="Age"
                        value={form.age}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Size Input */}
                <div className="mb-4">
                    <label htmlFor="size" className="block mb-2">Size</label>
                    <input
                        type="text"
                        name="size"
                        placeholder="Size"
                        value={form.size}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Color Input */}
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

                {/* Vaccinated Input */}
                <div className="mb-4">
                    <label className="block mb-2">Vaccinated</label>
                    <input
                        type="checkbox"
                        name="vaccinated"
                        checked={form.vaccinated}
                        onChange={handleInputChange}
                        className="mr-2"
                    /> Vaccinated
                </div>

                {/* Dewormed Input */}
                <div className="mb-4">
                    <label className="block mb-2">Dewormed</label>
                    <input
                        type="checkbox"
                        name="dewormed"
                        checked={form.dewormed}
                        onChange={handleInputChange}
                        className="mr-2"
                    /> Dewormed
                </div>

                
                <div className="mb-4">
                    <label htmlFor="number" className="block mb-2">Mobile Number</label>
                    <input
                        type="text" 
                        name="phoneNumber"
                        placeholder="Mobile Number"
                        value={form.number}
                        onChange={(e) => {
                            // Limit input to 10 digits and allow only numeric values
                            const value = e.target.value;
                            if (/^\d{0,10}$/.test(value)) { 
                                handleInputChange(e);
                            }
                        }}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>



                {/* Location Input */}
                <div className="mb-4">
                    <label htmlFor="location" className="block mb-2">Location</label>
                    <input
                        type="text"
                        name="location"
                        placeholder="Location"
                        value={form.location}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Published Date Input */}
                {/* <div className="mb-4">
                    <label htmlFor="publishedDate" className="block mb-2">Published Date</label>
                    <input
                        type="date"
                        name="publishedDate"
                        value={form.publishedDate}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div> */}

                {/* Additional Info Input */}
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


                <div className="mb-4 ">
                    <label className="text-gray-700 font-medium">Images</label>
                    <div className="flex mt-2 items-center border border-gray-300 rounded-md overflow-hidden">
                        <span className="flex-1 px-3 text-gray-500">Choose Image</span>
                        <label
                            className="px-4 py-2 bg-gray-200 text-gray-600 cursor-pointer"
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
                        />
                    </div>
                    <div className="div flex w-full  items-center gap-2 ">
                        {form.image.map((img, index) => (
                            <div key={index} className="mt-3 ">
                                <img src={img} alt={`Image Preview ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>


                {/* Submit Button */}
                <button
                    type="submit"
                    className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600"
                >
                    {editMode ? 'Update Product' : 'Add Product'}
                </button>
            </form>

            {/* Product List */}
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

export default AddProducts;


