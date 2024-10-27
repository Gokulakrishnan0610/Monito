// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "../admin/AddProducts.css";

// const AddProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [form, setForm] = useState({
//         name: '',
//         price: '',
//         seller: '',
//         stock: '',
//         image: [],
//         description: '',
//         quantity: '',
//     });

//     const [editMode, setEditMode] = useState(false);
//     const [productIdToEdit, setProductIdToEdit] = useState(null);

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setForm((prevForm) => ({
//             ...prevForm,
//             [name]: type === 'checkbox' ? checked : value,
//         }));
//     };

//     const handleFileChange = (e) => {
//         const files = e.target.files;
//         const newImages = Array.from(files).map((file) => {
//             const reader = new FileReader();
//             reader.onloadend = () => {
//                 setForm((prevForm) => ({
//                     ...prevForm,
//                     image: [...prevForm.image, reader.result],
//                 }));
//             };
//             reader.readAsDataURL(file);
//             return reader.result;
//         });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();
//         const productData = { ...form };

//         try {
//             if (editMode) {
//                 const response = await axios.put(`http://localhost:5000/products/${productIdToEdit}`, productData);
//                 setProducts((prevProducts) =>
//                     prevProducts.map((product) =>
//                         product._id === productIdToEdit ? response.data : product
//                     )
//                 );
//                 setEditMode(false);
//                 setProductIdToEdit(null);
//             } else {
//                 const response = await axios.post('http://localhost:5000/products', productData, {
//                     headers: { 'Content-Type': 'application/json' }
//                 });
//                 setProducts((prevProducts) => [...prevProducts, response.data]);
//             }
//             resetForm();
//         } catch (error) {
//             console.error('Error adding/updating product:', error);
//         }
//     };

//     const resetForm = () => {
//         setForm({
           
//             name: '',
//             price: '',
//             seller: '',
//             stock: '',
//             image: [],
//             quantity: '',
//             description: '',
//         });
//     };

//     const handleDelete = (id) => {
//         axios.delete(`http://localhost:5000/products/${id}`)
//             .then(() => setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)))
//             .catch((error) => console.error('Error deleting product:', error));
//     };

//     const handleEdit = (product) => {
//         setForm({ ...product });
//         setProductIdToEdit(product._id);
//         setEditMode(true);
//     };

//     return (
//         <div className="overflow-scroll min-h-screen w-screen py-6 bg-gray-100 ">
//             <form onSubmit={handleSubmit} className="m-auto w-[90%] md:max-w-[50%] bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Product' : 'Add Product'}</h2>

            

//                 {/* Name Input */}
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block mb-2">Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={form.name}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>

//                 {/* Price Input */}
//                 <div className="mb-4">
//                     <label htmlFor="price" className="block mb-2">Price</label>
//                     <input
//                         type="number"
//                         name="price"
//                         value={form.price}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>

//                 {/* Quantity Selection */}
//                 <div className="mb-4 w-full">
//                     <label htmlFor="quantity" className="block mb-2 text-gray-700 font-medium">Quantity (grams)</label>
//                     <select
//                         id="quantity"
//                         name="quantity"
//                         value={form.quantity}
//                         onChange={handleInputChange}
//                         className="border w-full border-gray-300 rounded px-3 py-2 h-12 focus:outline-none focus:border-blue-500"
//                     >
//                         <option value="">Select quantity in grams</option>
//                         {Array.from({ length: 20 }, (_, i) => 50 * (i + 1)).map((value) => (
//                             <option key={value} value={value}>
//                                 {value} grams
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Additional Info Input */}
//                 <div className="mb-4">
//                     <label htmlFor="description" className="block mb-2">description</label>
//                     <textarea
//                         name="description"
//                         value={form.additionalInfo}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     ></textarea>
//                 </div>

//                 {/* Images */}
//                 <div className="mb-4">
//                     <label className="text-gray-700 font-medium">Images</label>
//                     <div className="flex mt-2 items-center border border-gray-300 rounded-md overflow-hidden">
//                         <span className="flex-1 px-3 text-gray-500">Choose Image</span>
//                         <label className="px-4 py-2 bg-gray-200 text-gray-600 cursor-pointer" htmlFor="customFile">
//                             Add
//                         </label>
//                         <input
//                             type="file"
//                             id="customFile"
//                             name="image"
//                             multiple
//                             onChange={handleFileChange}
//                             className="hidden"
//                         />
//                     </div>
//                     <div className="flex w-full items-center gap-2 mt-3">
//                         {form.image.map((img, index) => (
//                             <img key={index} src={img} alt={`Image Preview ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
//                         ))}
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//                     {editMode ? 'Update Product' : 'Add Product'}
//                 </button>
//             </form>

//             {/* Product List */}
//             <h2 className="text-xl font-bold mt-6">Product List</h2>
//             <ul className="mt-4">
//                 {products.map((product) => (
//                     <li key={product._id} className="flex justify-between items-center mb-2 p-4 border-b">
//                         <div>
//                             <h3 className="font-semibold">{product.name}</h3>
//                             <p>SKU: {product.SKU}</p>
//                             <p>Price: ${product.price}</p>
//                         </div>
//                         <div>
//                             <button
//                                 onClick={() => handleEdit(product)}
//                                 className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(product._id)}
//                                 className="bg-red-500 text-white py-1 px-2 rounded"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AddProducts;


// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import "../admin/AddProducts.css";

// const AddProducts = () => {
//     const [products, setProducts] = useState([]);
//     const [form, setForm] = useState({
//         name: '',
//         price: '',
//         seller: '',
//         stock: '',
//         image: [], // Keep image as an array to hold File objects
//         description: '',
//         quantity: '',
//     });
//     useEffect(()=>{console.log(form)},[form])

//     const [editMode, setEditMode] = useState(false);
//     const [productIdToEdit, setProductIdToEdit] = useState(null);

//     const handleInputChange = (e) => {
//         const { name, value, type, checked } = e.target;
//         setForm((prevForm) => ({
//             ...prevForm,
//             [name]: type === 'checkbox' ? checked : value,
//         }));
//     };

  
//     const handleFileChange = (e) => {
//         const newFiles = Array.from(e.target.files);
//         setForm((prevForm) => ({
//             ...prevForm,
//             image: [...(prevForm.image || []), ...newFiles], // Merge existing images with new ones
//         }));
//     };
    

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         const formData = new FormData();
//         formData.append("name", form.name);
//         formData.append("price", form.price);
//         formData.append("seller", form.seller);
//         formData.append("stock", form.stock);
//         formData.append("quantity", form.quantity);
//         formData.append("description", form.description);

//         // Append each image file to the FormData
//         form.image.forEach((file) => {
//             formData.append("image", file);
//         });

//         try {
//             let response;
//             if (editMode) {
//                 response = await axios.put(`http://localhost:5000/products/${productIdToEdit}`, formData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 setProducts((prevProducts) =>
//                     prevProducts.map((product) =>
//                         product._id === productIdToEdit ? response.data : product
//                     )
//                 );
//                 setEditMode(false);
//                 setProductIdToEdit(null);
//             } else {
//                 response = await axios.post('http://localhost:5000/api/products', formData, {
//                     headers: { 'Content-Type': 'multipart/form-data' }
//                 });
//                 setProducts((prevProducts) => [...prevProducts, response.data]);
//             }
//             resetForm();
//         } catch (error) {
//             console.error('Error adding/updating product:', error);
//         }
//     };

//     const resetForm = () => {
//         setForm({
//             name: '',
//             price: '',
//             seller: '',
//             stock: '',
//             image: [],
//             quantity: '',
//             description: '',
//         });
//     };

//     const handleDelete = (id) => {
//         axios.delete(`http://localhost:5000/products/${id}`)
//             .then(() => setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)))
//             .catch((error) => console.error('Error deleting product:', error));
//     };

//     const handleEdit = (product) => {
//         setForm({ ...product });
//         setProductIdToEdit(product._id);
//         setEditMode(true);
//     };

//     return (
//         <div className="overflow-scroll min-h-screen w-screen py-6 bg-gray-100 ">
//             <form onSubmit={handleSubmit} className="m-auto w-[90%] md:max-w-[50%] bg-white rounded-lg shadow-md p-6">
//                 <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Product' : 'Add Product'}</h2>

//                 {/* Name Input */}
//                 <div className="mb-4">
//                     <label htmlFor="name" className="block mb-2">Name</label>
//                     <input
//                         type="text"
//                         name="name"
//                         value={form.name}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>

//                 {/* Price Input */}
//                 <div className="mb-4">
//                     <label htmlFor="price" className="block mb-2">Price</label>
//                     <input
//                         type="number"
//                         name="price"
//                         value={form.price}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>
//                 {/* stock */}
//                 <div className="mb-4">
//                     <label htmlFor="stock" className="block mb-2">stock</label>
//                     <input
//                         type="number"
//                         name="stock"
//                         value={form.stock}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>

//                 {/* seller */}
//                 <div className="mb-4">
//                     <label htmlFor="seller" className="block mb-2">seller</label>
//                     <input
//                         type="text"
//                         name="seller"
//                         value={form.seller}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                         required
//                     />
//                 </div>

//                 {/* Quantity Selection */}
//                 <div className="mb-4 w-full">
//                     <label htmlFor="quantity" className="block mb-2 text-gray-700 font-medium">Quantity (grams)</label>
//                     <select
//                         id="quantity"
//                         name="quantity"
//                         value={form.quantity}
//                         onChange={handleInputChange}
//                         className="border w-full border-gray-300 rounded px-3 py-2 h-12 focus:outline-none focus:border-blue-500"
//                     >
//                         <option value="">Select quantity in grams</option>
//                         {Array.from({ length: 20 }, (_, i) => 50 * (i + 1)).map((value) => (
//                             <option key={value} value={value}>
//                                 {value} grams
//                             </option>
//                         ))}
//                     </select>
//                 </div>

//                 {/* Additional Info Input */}
//                 <div className="mb-4">
//                     <label htmlFor="description" className="block mb-2">Description</label>
//                     <textarea
//                         name="description"
//                         value={form.description}
//                         onChange={handleInputChange}
//                         className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
//                     ></textarea>
//                 </div>

//                 {/* Images */}
//                 <div className="mb-4">
//                     <label className="text-gray-700 font-medium">Images</label>
//                     <div className="flex mt-2 items-center border border-gray-300 rounded-md overflow-hidden">
//                         <span className="flex-1 px-3 text-gray-500">Choose Image</span>
//                         <label className="px-4 py-2 bg-gray-200 text-gray-600 cursor-pointer" htmlFor="customFile">
//                             Add
//                         </label>
//                         <input
//                             type="file"
//                             id="customFile"
//                             name="image"
//                             multiple
//                             onChange={handleFileChange}
//                             className="hidden"
//                         />
//                     </div>
//                     <div className="flex w-full items-center gap-2 mt-3">
//                         {form.image.map((img, index) => (
//                             <img key={index} src={URL.createObjectURL(img)} alt={`Image Preview ${index + 1}`} className="w-20 h-20 object-cover rounded-md" />
//                         ))}
//                     </div>
//                 </div>

//                 {/* Submit Button */}
//                 <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
//                     {editMode ? 'Update Product' : 'Add Product'}
//                 </button>
//             </form>

//             {/* Product List */}
//             <h2 className="text-xl font-bold mt-6">Product List</h2>
//             <ul className="mt-4">
//                 {products.map((product) => (
//                     <li key={product._id} className="flex justify-between items-center mb-2 p-4 border-b">
//                         <div>
//                             <h3 className="font-semibold">{product.name}</h3>
//                             <p>SKU: {product.SKU}</p>
//                             <p>Price: ${product.price}</p>
//                         </div>
//                         <div>
//                             <button
//                                 onClick={() => handleEdit(product)}
//                                 className="bg-yellow-500 text-white py-1 px-2 rounded mr-2"
//                             >
//                                 Edit
//                             </button>
//                             <button
//                                 onClick={() => handleDelete(product._id)}
//                                 className="bg-red-500 text-white py-1 px-2 rounded"
//                             >
//                                 Delete
//                             </button>
//                         </div>
//                     </li>
//                 ))}
//             </ul>
//         </div>
//     );
// };

// export default AddProducts;



import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "../admin/AddProducts.css";

const AddProducts = () => {
    const [products, setProducts] = useState([]);
    const [form, setForm] = useState({
        name: '',
        price: '',
        seller: '',
        stock: '',
        image: [], // Keep image as an array to hold File objects
        description: '',
        quantity: '',
    });

    const [editMode, setEditMode] = useState(false);
    const [productIdToEdit, setProductIdToEdit] = useState(null);

    const handleInputChange = (e) => {
        const { name, value, type, checked } = e.target;
        setForm((prevForm) => ({
            ...prevForm,
            [name]: type === 'checkbox' ? checked : value,
        }));
    };

    const handleFileChange = (e) => {
        const newFiles = Array.from(e.target.files);
        setForm((prevForm) => ({
            ...prevForm,
            image: [...(prevForm.image || []), ...newFiles], // Merge existing images with new ones
        }));
    };

    // Function to remove an image from the image array
    const handleImageRemove = (index) => {
        setForm((prevForm) => {
            const updatedImages = prevForm.image.filter((_, i) => i !== index);
            return { ...prevForm, image: updatedImages };
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append("name", form.name);
        formData.append("price", form.price);
        formData.append("seller", form.seller);
        formData.append("stock", form.stock);
        formData.append("quantity", form.quantity);
        formData.append("description", form.description);

        // Append each image file to the FormData
        form.image.forEach((file) => {
            formData.append("image", file);
        });

        try {
            let response;
            if (editMode) {
                response = await axios.put(`http://localhost:5000/products/${productIdToEdit}`, formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
                });
                setProducts((prevProducts) =>
                    prevProducts.map((product) =>
                        product._id === productIdToEdit ? response.data : product
                    )
                );
                setEditMode(false);
                setProductIdToEdit(null);
            } else {
                response = await axios.post('http://localhost:5000/api/products', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' }
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
            name: '',
            price: '',
            seller: '',
            stock: '',
            image: [],
            quantity: '',
            description: '',
        });
    };

    const handleDelete = (id) => {
        axios.delete(`http://localhost:5000/products/${id}`)
            .then(() => setProducts((prevProducts) => prevProducts.filter((product) => product._id !== id)))
            .catch((error) => console.error('Error deleting product:', error));
    };

    const handleEdit = (product) => {
        setForm({ ...product });
        setProductIdToEdit(product._id);
        setEditMode(true);
    };

    return (
        <div className="overflow-scroll min-h-screen w-screen py-6 bg-gray-100 ">
            <form onSubmit={handleSubmit} className="m-auto w-[90%] md:max-w-[50%] bg-white rounded-lg shadow-md p-6">
                <h2 className="text-xl font-bold mb-4">{editMode ? 'Edit Product' : 'Add Product'}</h2>

                {/* Name Input */}
                <div className="mb-4">
                    <label htmlFor="name" className="block mb-2">Name</label>
                    <input
                        type="text"
                        name="name"
                        value={form.name}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Price Input */}
                <div className="mb-4">
                    <label htmlFor="price" className="block mb-2">Price</label>
                    <input
                        type="number"
                        name="price"
                        value={form.price}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Stock Input */}
                <div className="mb-4">
                    <label htmlFor="stock" className="block mb-2">Stock</label>
                    <input
                        type="number"
                        name="stock"
                        value={form.stock}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Seller Input */}
                <div className="mb-4">
                    <label htmlFor="seller" className="block mb-2">Seller</label>
                    <input
                        type="text"
                        name="seller"
                        value={form.seller}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                        required
                    />
                </div>

                {/* Quantity Selection */}
                <div className="mb-4 w-full">
                    <label htmlFor="quantity" className="block mb-2 text-gray-700 font-medium">Quantity (grams)</label>
                    <select
                        id="quantity"
                        name="quantity"
                        value={form.quantity}
                        onChange={handleInputChange}
                        className="border w-full border-gray-300 rounded px-3 py-2 h-12 focus:outline-none focus:border-blue-500"
                    >
                        <option value="">Select quantity in grams</option>
                        {Array.from({ length: 20 }, (_, i) => 50 * (i + 1)).map((value) => (
                            <option key={value} value={value}>
                                {value} grams
                            </option>
                        ))}
                    </select>
                </div>

                {/* Description Input */}
                <div className="mb-4">
                    <label htmlFor="description" className="block mb-2">Description</label>
                    <textarea
                        name="description"
                        value={form.description}
                        onChange={handleInputChange}
                        className="border border-gray-300 p-3 w-full rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    ></textarea>
                </div>

                {/* Images */}
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
                    <div className="flex w-full items-center gap-2 mt-3">
                        {form.image.map((img, index) => (
                            <div key={index} className="relative">
                                <img
                                    src={URL.createObjectURL(img)}
                                    alt={`Image Preview ${index + 1}`}
                                    className="w-20 h-20 object-cover rounded-md"
                                />
                                <button
                                    onClick={() => handleImageRemove(index)}
                                    className="absolute top-1 right-1  bg-red-500 text-white text-xs  w-4 h-4 flex justify-center items-center  rounded-full"
                                >
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Submit Button */}
                <button type="submit" className="bg-blue-500 text-white py-2 px-4 rounded hover:bg-blue-600">
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
                            <p>Price: ${product.price}</p>
                            <p>Seller: {product.seller}</p>
                        </div>
                        <div>
                            <button onClick={() => handleEdit(product)} className="bg-yellow-500 text-white px-2 py-1 rounded mr-2">Edit</button>
                            <button onClick={() => handleDelete(product._id)} className="bg-red-500 text-white px-2 py-1 rounded">Delete</button>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default AddProducts;
