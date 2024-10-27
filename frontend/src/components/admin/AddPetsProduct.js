import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./AddPetsProduct.css";

const AddPetsProduct = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        brand: '',
        productName: '',
        price: '',
        size: '',
        category: '',
        image: []
    });

    const [editMode, setEditMode] = useState(false);
    const [productIdToEdit, setProductIdToEdit] = useState(null);

    // Fetch pet products on component load
    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/PetsProduct');
                setProducts(response.data);
            } catch (error) {
                console.error('Error fetching products:', error);
            }
        };

        fetchProducts();
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const files = e.target.files;
        Array.from(files).forEach((file) => {
            const reader = new FileReader();
            reader.onloadend = () => {
                setForm((prevForm) => ({
                    ...prevForm,
                    image: [...prevForm.image, reader.result],
                }));
            };
            reader.readAsDataURL(file);
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const productData = { ...form };

        try {
            if (editMode) {
                const response = await axios.put(`http://localhost:5000/PetsProduct/${productIdToEdit}`, productData);
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productIdToEdit ? response.data : product
                    )
                );
                setEditMode(false);
                setProductIdToEdit(null);
            } else {
                const response = await axios.post('http://localhost:5000/PetsProduct', productData, {
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
            brand: '',
            productName: '',
            price: '',
            size: '',
            category: '',
            image: []
        });
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`http://localhost:5000/PetsProduct/${id}`);
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    };

    const handleEdit = (product) => {
        setForm({
            brand: product.brand,
            productName: product.productName,
            price: product.price,
            size: product.size,
            category: product.category,
            image: product.image
        });
        setProductIdToEdit(product._id);
        setEditMode(true);
    };

    return (
        <div className="overflow-scroll min-h-screen w-screen py-6 bg-gray-100 scroll-container">
            <form onSubmit={handleSubmit} className="m-auto w-[90%] md:max-w-[50%] overflow-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">{editMode ? 'Update Pet Product' : 'Add Pet Product'}</h2>

                <div className="mb-4">
                    <label htmlFor="brand" className="block mb-2">Brand</label>
                    <input
                        type="text"
                        name="brand"
                        placeholder="Brand"
                        value={form.brand}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    />
                </div>

                {/* Product Name Input */}
                <div className="mb-4">
                    <label htmlFor="productName" className="block mb-2">Product Name</label>
                    <input
                        type="text"
                        name="productName"
                        placeholder="Product Name"
                        value={form.productName}
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

                {/* Product Category Input */}
                <div className="mb-4">
                    <label htmlFor="category" className="block mb-2">Product Category</label>
                    <select
                        name="category"
                        value={form.category}
                        onChange={handleInputChange}
                        required
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                        <option value="">Select Category</option>
                        <option value="Dog Food">Dog Food</option>
                        <option value="Cat Food">Cat Food</option>
                        <option value="costume">Costume</option>
                    </select>
                </div>

                {/* Image Upload */}
                <div className="mb-4">
                    <label className="text-gray-700 font-medium">Images</label>
                    <div className="flex mt-2 items-center border border-gray-300 rounded-md overflow-hidden">
                        <span className="flex-1 px-3 text-gray-500">Choose Image</span>
                        <label className="px-4 py-2 bg-gray-200 text-gray-600 cursor-pointer" htmlFor="customFile">
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
                    <div className="flex w-full items-center gap-2">
                        {form.image.map((img, index) => (
                            <div key={index} className="mt-3">
                                <img src={img} alt={`Image Preview ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
                            </div>
                        ))}
                    </div>
                </div>


                {/* Submit Button */}
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
                    {editMode ? 'Update Pet Product' : 'Add Pet Product'}
                </button>
            </form>

            {/* Product List */}
            <h2 className="text-xl font-bold mt-6">Pet Product List</h2>
            <ul className="mt-4">
                {products.map((product) => (
                    <li key={product._id} className="flex justify-between items-center mb-2 p-4 border-b">
                        <div>
                            <h3 className="font-semibold">{product.brand}</h3>
                            <p>Product: {product.productName}</p>
                            <p>Price: ₹{product.price}</p>
                            <p>Size: {product.size}</p>
                            <p>Category: {product.category}</p>
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

export default AddPetsProduct;

