import React, { useState, useEffect } from 'react';
import axios from 'axios';
import "./PetsDetails.css";

const ProductDetails = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await axios.get('http://localhost:5000/api/products/getproduct')
                setProducts(response.data.allPets);
            } catch (error) {
                setError('Error fetching productDetails');
                console.error(error);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, []);

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <p>{error}</p>;
    }

    return (
        <div className="h-screen overflow-y-auto p-4 no-scrollbar">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {products.map((product) => (
                    <div key={product._id} className="border p-4 rounded">
                        <img src={`data:image/jpeg;base64,${product.images[0]}`} alt={product.name} className="w-full h-64 object-cover mb-4 rounded" />
                        <h3 className="text-2xl font-semibold">{product.brand}</h3>
                        <p className="text-base font-semibold">{product.productName}</p>
                        <p className="text-base font-semibold">Rs. {product.price}</p>
                        <p>Size: {product.size}</p>
                        <p>Category: {product.category}</p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDetails;