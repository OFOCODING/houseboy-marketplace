import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI } from '../utils/api';

const CartPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await cartAPI.getCart();
            setCart(res.data.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const updateQuantity = async (itemId, newQuantity) => {
        if (newQuantity < 1) return;
        try {
            const res = await cartAPI.updateItem(itemId, { quantity: newQuantity });
            setCart(res.data.data);
        } catch (error) {
            alert('Failed to update quantity');
        }
    };

    const removeItem = async (itemId) => {
        if (!window.confirm('Remove this item from cart?')) return;
        try {
            const res = await cartAPI.removeItem(itemId);
            setCart(res.data.data);
        } catch (error) {
            alert('Failed to remove item');
        }
    };

    const clearCart = async () => {
        if (!window.confirm('Clear entire cart?')) return;
        try {
            const res = await cartAPI.clearCart();
            setCart(res.data.data);
        } catch (error) {
            alert('Failed to clear cart');
        }
    };

    if (loading) {
        return (
            <div className="container py-5 text-center">
                <div className="spinner-border text-primary"></div>
            </div>
        );
    }

    return (
        <div>
            <div className="bg-primary text-white py-4">
                <div className="container">
                    <h2><i className="bi bi-cart3"></i> Shopping Cart</h2>
                    <p className="mb-0">Review your items before checkout</p>
                </div>
            </div>

            <div className="container py-4">
                {!cart || cart.items.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="bi bi-cart-x" style={{ fontSize: '5rem', color: '#ccc' }}></i>
                        <h3 className="mt-3">Your cart is empty</h3>
                        <p className="text-muted">Add some products to get started!</p>
                        <button className="btn btn-primary" onClick={() => navigate('/products')}>
                            <i className="bi bi-shop"></i> Browse Products
                        </button>
                    </div>
                ) : (
                    <div className="row">
                        <div className="col-lg-8">
                            <div className="d-flex justify-content-between align-items-center mb-3">
                                <h4>Cart Items ({cart.items.length})</h4>
                                <button className="btn btn-outline-danger btn-sm" onClick={clearCart}>
                                    <i className="bi bi-trash"></i> Clear Cart
                                </button>
                            </div>

                            {cart.items.map(item => (
                                <div key={item._id} className="card mb-3">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-md-2">
                                                <img 
                                                    src={item.product.image} 
                                                    alt={item.product.name}
                                                    className="img-fluid rounded"
                                                />
                                            </div>
                                            <div className="col-md-4">
                                                <h6>{item.product.name}</h6>
                                                <small className="text-muted">{item.product.category}</small>
                                            </div>
                                            <div className="col-md-2">
                                                <strong>₦{item.price.toLocaleString()}</strong>
                                            </div>
                                            <div className="col-md-3">
                                                <div className="input-group input-group-sm">
                                                    <button 
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => updateQuantity(item._id, item.quantity - 1)}
                                                    >
                                                        <i className="bi bi-dash"></i>
                                                    </button>
                                                    <input 
                                                        type="text" 
                                                        className="form-control text-center" 
                                                        value={item.quantity}
                                                        readOnly
                                                    />
                                                    <button 
                                                        className="btn btn-outline-secondary"
                                                        onClick={() => updateQuantity(item._id, item.quantity + 1)}
                                                    >
                                                        <i className="bi bi-plus"></i>
                                                    </button>
                                                </div>
                                            </div>
                                            <div className="col-md-1 text-end">
                                                <button 
                                                    className="btn btn-sm btn-outline-danger"
                                                    onClick={() => removeItem(item._id)}
                                                >
                                                    <i className="bi bi-trash"></i>
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>

                        <div className="col-lg-4">
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="mb-4">Order Summary</h5>
                                    
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Subtotal:</span>
                                        <strong>₦{cart.subtotal.toLocaleString()}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Delivery Fee:</span>
                                        <span>₦{cart.deliveryFee.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>Service Charge:</span>
                                        <span>₦{cart.serviceCharge.toLocaleString()}</span>
                                    </div>
                                    
                                    <hr />
                                    
                                    <div className="d-flex justify-content-between mb-4">
                                        <h5>Total:</h5>
                                        <h5 className="text-success">₦{cart.total.toLocaleString()}</h5>
                                    </div>

                                    <button 
                                        className="btn btn-success w-100 btn-lg"
                                        onClick={() => navigate('/checkout')}
                                    >
                                        <i className="bi bi-lock"></i> Proceed to Checkout
                                    </button>

                                    <button 
                                        className="btn btn-outline-secondary w-100 mt-2"
                                        onClick={() => navigate('/products')}
                                    >
                                        <i className="bi bi-arrow-left"></i> Continue Shopping
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default CartPage;
