import React from 'react';
import { Link } from 'react-router-dom';

const ProductCard = ({ product, onAddToCart }) => {
    return (
        <div className="card h-100 shadow-sm">
            <img 
                src={product.image} 
                className="card-img-top" 
                alt={product.name}
                style={{ height: '200px', objectFit: 'cover' }}
            />
            <div className="card-body d-flex flex-column">
                <span className="badge bg-primary mb-2 w-50">{product.category}</span>
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text text-muted small">{product.description.substring(0, 80)}...</p>
                <div className="mt-auto">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <span className="h5 mb-0 text-success">₦{product.price.toLocaleString()}</span>
                        <small className="text-muted">Stock: {product.stock}</small>
                    </div>
                    <div className="d-flex gap-2">
                        <Link to={`/products/${product._id}`} className="btn btn-outline-primary btn-sm flex-grow-1">
                            View Details
                        </Link>
                        <button 
                            className="btn btn-primary btn-sm"
                            onClick={() => onAddToCart(product)}
                            disabled={product.stock === 0}
                        >
                            <i className="bi bi-cart-plus"></i>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductCard;
