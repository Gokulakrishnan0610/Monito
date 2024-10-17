import React, { useState } from 'react';

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

        // Add logic to handle product submission to the backend
    };

    return (
        <div className="overflow-auto max-h-screen p-6 bg-gray-100">
            <form onSubmit={handleSubmit} className="max-w-full w-full overflow-auto bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">Add New Product</h2>

                <input
                    type="text"
                    name="SKU"
                    placeholder="SKU"
                    value={form.SKU}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="name"
                    placeholder="Product Name"
                    value={form.name}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="number"
                    name="price"
                    placeholder="Product Price"
                    value={form.price}
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
                    type="number"
                    name="age"
                    placeholder="Age"
                    value={form.age}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="size"
                    placeholder="Size"
                    value={form.size}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="color"
                    placeholder="Color"
                    value={form.color}
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
                    placeholder="Certification"
                    value={form.cert}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="text"
                    name="location"
                    placeholder="Location"
                    value={form.location}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <input
                    type="date"
                    name="publishedDate"
                    value={form.publishedDate}
                    onChange={handleInputChange}
                    required
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <textarea
                    name="additionalInfo"
                    placeholder="Additional Information"
                    value={form.additionalInfo}
                    onChange={handleInputChange}
                    className="border border-gray-300 p-3 mb-4 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500 h-24"
                />
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded hover:bg-blue-600 transition duration-200">
                    Add Product
                </button>
            </form>
        </div>
    );
};

export default AddProducts;
