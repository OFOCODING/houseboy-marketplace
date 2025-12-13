import React, { useState, useEffect } from 'react';
import { productAPI, cartAPI } from '../utils/api';
import ProductCard from '../components/ProductCard';
import { useAuth } from '../utils/AuthContext';

const ProductsPage = () => {
    const [products, setProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [category, setCategory] = useState('');
    const [search, setSearch] = useState('');
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        fetchProducts();
    }, [category]);

    const fetchProducts = async () => {
        try {
            setLoading(true);
            const res = await productAPI.getAll({ category, search });
            setProducts(res.data.data);
        } catch (error) {
            console.error('Error fetching products:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleSearch = (e) => {
        e.preventDefault();
        fetchProducts();
    };

    const handleAddToCart = async (product) => {
        if (!isAuthenticated) {
            alert('Please login to add items to cart');
            return;
        }
        
        try {
            await cartAPI.addToCart({ productId: product._id, quantity: 1 });
            alert(`${product.name} added to cart!`);
        } catch (error) {
            alert('Failed to add to cart: ' + (error.response?.data?.message || error.message));
        }
    };

    const categories = ['all', 'hotel', 'apartment', 'farm', 'dispatch', 'ride', 'general'];

    return (
        <div>
            <div className="bg-primary text-white py-4">
                <div className="container">
                    <h2>Browse Products & Services</h2>
                    <p className="mb-0">Find what you need from our marketplace</p>
                </div>
            </div>

            <div className="container py-4">
                <div className="row mb-4">
                    <div className="col-md-8">
                        <form onSubmit={handleSearch}>
                            <div className="input-group">
                                <input
                                    type="text"
                                    className="form-control"
                                    placeholder="Search products..."
                                    value={search}
                                    onChange={(e) => setSearch(e.target.value)}
                                />
                                <button className="btn btn-primary" type="submit">
                                    <i className="bi bi-search"></i> Search
                                </button>
                            </div>
                        </form>
                    </div>
                    <div className="col-md-4">
                        <select 
                            className="form-select"
                            value={category}
                            onChange={(e) => setCategory(e.target.value === 'all' ? '' : e.target.value)}
                        >
                            {categories.map(cat => (
                                <option key={cat} value={cat === 'all' ? '' : cat}>
                                    {cat.charAt(0).toUpperCase() + cat.slice(1)}
                                </option>
                            ))}
                        </select>
                    </div>
                </div>

                {loading ? (
                    <div className="text-center py-5">
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : products.length === 0 ? (
                    <div className="alert alert-info text-center">
                        <h4>No products found</h4>
                        <p>Try adjusting your search or filters</p>
                    </div>
                ) : (
                    <div className="row g-4">
                        {products.map(product => (
                            <div key={product._id} className="col-md-4">
                                <ProductCard product={product} onAddToCart={handleAddToCart} />
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductsPage;
