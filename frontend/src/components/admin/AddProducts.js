import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../admin/AddProducts.css"

const AddProducts = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        SKU: '',
        name: '',
        price: '',
        image: '',
        gender: '',
        age: '',
        size: '',
        color: '',
        vaccinated: false, // fixed to match input
        dewormed: false,
        cert: '',
        location: '',
        publishedDate: '',
        additionalInfo: ''
    });
    const [file, setFile] = useState(null);
    const [editMode, setEditMode] = useState(false);
    const [productIdToEdit, setProductIdToEdit] = useState(null);

    useEffect(() => {
        axios.get('http://localhost:5000/products')
            .then((response) => setProducts(response.data))
            .catch((error) => {
                console.log(error);
            });
    }, []);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        setFile(file); // Save the file to state
        const reader = new FileReader();

        reader.onloadend = () => {
            setForm((prevForm) => ({
                ...prevForm,
                image: reader.result, // Set the base64 image data
            }));
        };

        if (file) {
            reader.readAsDataURL(file); // Convert to base64
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const productData = {
            SKU: form.SKU, // corrected to match the input name
            name: form.name,
            price: form.price,
            image: form.image,
            gender: form.gender,
            age: form.age,
            size: form.size,
            color: form.color,
            vaccinated: form.vaccinated,
            dewormed: form.dewormed,
            cert: form.cert,
            location: form.location,
            publishedDate: form.publishedDate,
            additionalInfo: form.additionalInfo,
        };

        console.log(productData); // Log productData for debugging

        try {
            if (editMode) {
                // Update product
                const response = await axios.put(`http://localhost:5000/products/${productIdToEdit}`, productData);
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productIdToEdit ? response.data : product
                    )
                );
                setEditMode(false);
                setProductIdToEdit(null);
            } else {
                // Create new product
                const response = await axios.post('http://localhost:5000/products', productData, {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                });
                setProducts((prevProducts) => [...prevProducts, response.data]);
            }

            // Reset the form
            setForm({
                SKU: '',
                name: '',
                price: '',
                image: '',
                gender: '',
                age: '',
                size: '',
                color: '',
                vaccinated: false,
                dewormed: false,
                cert: '',
                location: '',
                publishedDate: '',
                additionalInfo: ''
            });
            setFile(null);
        } catch (error) {
            console.error('Error adding/updating product:', error);
        }
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
            cert: product.cert,
            location: product.location,
            additionalInfo: product.additionalInfo
        });
        setProductIdToEdit(product._id);
        setEditMode(true);
    };

    return (


        <div className="scroll-container overflow-auto max-h-screen p-6 bg-gray-100 lg:w-full lg:py-10 lg:px-24">
            <form onSubmit={handleSubmit} className="max-w-full w-full overflow-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>

                <input
                    type="text"
                    name="SKU"
                    placeholder="SKU"
                    value={form.SKU || ''}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Name"
                    value={form.name || ''}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Price"
                    value={form.price || ''}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="file"
                    name="image"
                    onChange={handleFileChange}
                    required
                    className="border border-gray-300 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex items-center mb-4">
                    <label className="mr-4">Gender:</label>
                    <label className="flex items-center mr-4">
                        <input
                            type="radio"
                            name="gender"
                            value="Male"
                            checked={form.gender === 'Male'}
                            onChange={handleInputChange}
                            required
                            className="mr-1"
                        />
                        Male
                    </label>
                    <label className="flex items-center">
                        <input
                            type="radio"
                            name="gender"
                            value="Female"
                            checked={form.gender === 'Female'}
                            onChange={handleInputChange}
                            required
                            className="mr-1"
                        />
                        Female
                    </label>
                </div>

                <input
                    type="text"
                    name="age"
                    placeholder="Age"
                    value={form.age || ''}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="size"
                    placeholder="Size"
                    value={form.size || ''}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={form.color || ''}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />

                <div className="flex items-center mb-4">
                    <label className="flex items-center mr-2">
                        <input
                            type="checkbox"
                            name="vaccinated"
                            checked={form.vaccinated}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        Vaccinated
                    </label>
                </div>

                <div className="flex items-center mb-4">
                    <label className="flex items-center mr-2">
                        <input
                            type="checkbox"
                            name="dewormed"
                            checked={form.dewormed}
                            onChange={handleInputChange}
                            className="mr-2"
                        />
                        Dewormed
                    </label>
                </div>

                <input
                    type="text"
                    name="cert"
                    placeholder="Cert"
                    value={form.cert || ''}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location || ''}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="date"
                    name="publishedDate"
                    value={form.publishedDate || ''}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="additionalInfo"
                    placeholder="Additional Information"
                    value={form.additionalInfo || ''}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                />
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200">
                    Add Product
                </button>
            </form>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-20">
                {products.map((product) => (
                    <div key={product._id} className="border p-4 rounded bg-white">
                        <img src={product.image} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
                        <h3 className="text-2xl font-semibold">{product.name}</h3>
                        <p className="text-base font-semibold">Rs. {product.price}</p>
                        <p>SKU: {product.SKU}</p>
                        <p>Gender: {product.gender}</p>
                        <p>Age: {product.age}</p>
                        <p>Size: {product.size}</p>
                        <p>Color: {product.color}</p>
                        <p>Vaccinated: {product.vaccinated ? 'Yes' : 'No'}</p>
                        <p>Dewormed: {product.dewormed ? 'Yes' : 'No'}</p>
                        <p>Cert: {product.cert}</p>
                        <p>Location: {product.location}</p>
                        <p>Published Date: {product.publishedDate}</p>
                        <p>Additional Information: {product.additionalInfo}</p>

                        <button
                            onClick={() => handleDelete(product._id)}
                            className="bg-red-500 text-white px-4 py-2 mt-2 mr-2"
                        >
                            Delete
                        </button>
                        <button
                            onClick={() => handleEdit(product)}
                            className="bg-yellow-500 text-white px-4 py-2 mt-2"
                        >
                            Edit
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default AddProducts;
