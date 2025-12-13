import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { cartAPI, orderAPI } from '../utils/api';
import { useAuth } from '../utils/AuthContext';

const CheckoutPage = () => {
    const [cart, setCart] = useState(null);
    const [loading, setLoading] = useState(true);
    const [submitting, setSubmitting] = useState(false);
    const { user } = useAuth();
    const navigate = useNavigate();

    const [deliveryInfo, setDeliveryInfo] = useState({
        fullName: user?.fullName || '',
        phone: user?.phone || '',
        email: user?.email || '',
        address: '',
        city: '',
        state: '',
        zipCode: '',
        deliveryNote: ''
    });

    const [paymentMethod, setPaymentMethod] = useState('cash');

    useEffect(() => {
        fetchCart();
    }, []);

    const fetchCart = async () => {
        try {
            const res = await cartAPI.getCart();
            if (res.data.data.items.length === 0) {
                alert('Your cart is empty!');
                navigate('/products');
                return;
            }
            setCart(res.data.data);
        } catch (error) {
            console.error('Error fetching cart:', error);
        } finally {
            setLoading(false);
        }
    };

    const handleChange = (e) => {
        setDeliveryInfo({
            ...deliveryInfo,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (!deliveryInfo.fullName || !deliveryInfo.phone || !deliveryInfo.address || !deliveryInfo.city || !deliveryInfo.state) {
            alert('Please fill in all required fields');
            return;
        }

        setSubmitting(true);

        try {
            const res = await orderAPI.create({ deliveryInfo, paymentMethod });
            
            alert(`🎉 Order placed successfully!\nOrder Number: ${res.data.data.orderNumber}`);
            navigate('/orders');
        } catch (error) {
            alert('Failed to place order: ' + (error.response?.data?.message || error.message));
        } finally {
            setSubmitting(false);
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
            <div className="bg-success text-white py-4">
                <div className="container">
                    <h2><i className="bi bi-check-circle"></i> Checkout</h2>
                    <p className="mb-0">Complete your order</p>
                </div>
            </div>

            <div className="container py-4">
                <form onSubmit={handleSubmit}>
                    <div className="row">
                        {/* Delivery Information */}
                        <div className="col-lg-7">
                            <div className="card shadow mb-4">
                                <div className="card-body">
                                    <h5 className="mb-4"><i className="bi bi-truck"></i> Delivery Information</h5>
                                    
                                    <div className="row g-3">
                                        <div className="col-md-6">
                                            <label className="form-label">Full Name *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="fullName"
                                                value={deliveryInfo.fullName}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">Phone Number *</label>
                                            <input
                                                type="tel"
                                                className="form-control"
                                                name="phone"
                                                value={deliveryInfo.phone}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Email</label>
                                            <input
                                                type="email"
                                                className="form-control"
                                                name="email"
                                                value={deliveryInfo.email}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Delivery Address *</label>
                                            <textarea
                                                className="form-control"
                                                name="address"
                                                rows="2"
                                                value={deliveryInfo.address}
                                                onChange={handleChange}
                                                required
                                            ></textarea>
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">City *</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="city"
                                                value={deliveryInfo.city}
                                                onChange={handleChange}
                                                required
                                            />
                                        </div>
                                        <div className="col-md-6">
                                            <label className="form-label">State *</label>
                                            <select
                                                className="form-select"
                                                name="state"
                                                value={deliveryInfo.state}
                                                onChange={handleChange}
                                                required
                                            >
                                                <option value="">Select State</option>
                                                <option value="Lagos">Lagos</option>
                                                <option value="Abuja">Abuja</option>
                                                <option value="Kano">Kano</option>
                                                <option value="Rivers">Rivers</option>
                                                <option value="Oyo">Oyo</option>
                                            </select>
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Zip/Postal Code</label>
                                            <input
                                                type="text"
                                                className="form-control"
                                                name="zipCode"
                                                value={deliveryInfo.zipCode}
                                                onChange={handleChange}
                                            />
                                        </div>
                                        <div className="col-12">
                                            <label className="form-label">Delivery Note (Optional)</label>
                                            <textarea
                                                className="form-control"
                                                name="deliveryNote"
                                                rows="2"
                                                value={deliveryInfo.deliveryNote}
                                                onChange={handleChange}
                                                placeholder="Any special instructions..."
                                            ></textarea>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div className="card shadow">
                                <div className="card-body">
                                    <h5 className="mb-4"><i className="bi bi-credit-card"></i> Payment Method</h5>
                                    
                                    <div className="form-check mb-3 p-3 border rounded">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="cash"
                                            value="cash"
                                            checked={paymentMethod === 'cash'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <label className="form-check-label ms-2" htmlFor="cash">
                                            <strong>Cash on Delivery</strong>
                                            <p className="text-muted small mb-0">Pay when you receive your order</p>
                                        </label>
                                    </div>

                                    <div className="form-check mb-3 p-3 border rounded">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="card"
                                            value="card"
                                            checked={paymentMethod === 'card'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <label className="form-check-label ms-2" htmlFor="card">
                                            <strong>Card Payment</strong>
                                            <p className="text-muted small mb-0">Pay with credit/debit card (Coming soon)</p>
                                        </label>
                                    </div>

                                    <div className="form-check p-3 border rounded">
                                        <input
                                            className="form-check-input"
                                            type="radio"
                                            name="paymentMethod"
                                            id="bank"
                                            value="bank"
                                            checked={paymentMethod === 'bank'}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                        />
                                        <label className="form-check-label ms-2" htmlFor="bank">
                                            <strong>Bank Transfer</strong>
                                            <p className="text-muted small mb-0">Transfer to our bank account (Coming soon)</p>
                                        </label>
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div className="col-lg-5">
                            <div className="card shadow sticky-top" style={{ top: '20px' }}>
                                <div className="card-body">
                                    <h5 className="mb-4">Order Summary</h5>
                                    
                                    {cart?.items.map(item => (
                                        <div key={item._id} className="d-flex mb-3 pb-3 border-bottom">
                                            <img src={item.product.image} alt="" style={{ width: '60px', height: '60px', objectFit: 'cover', borderRadius: '5px' }} />
                                            <div className="ms-3 flex-grow-1">
                                                <small className="d-block">{item.product.name}</small>
                                                <small className="text-muted">Qty: {item.quantity}</small>
                                            </div>
                                            <strong>₦{(item.price * item.quantity).toLocaleString()}</strong>
                                        </div>
                                    ))}

                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Subtotal:</span>
                                        <strong>₦{cart?.subtotal.toLocaleString()}</strong>
                                    </div>
                                    <div className="d-flex justify-content-between mb-2">
                                        <span>Delivery Fee:</span>
                                        <span>₦{cart?.deliveryFee.toLocaleString()}</span>
                                    </div>
                                    <div className="d-flex justify-content-between mb-3">
                                        <span>Service Charge:</span>
                                        <span>₦{cart?.serviceCharge.toLocaleString()}</span>
                                    </div>

                                    <hr />

                                    <div className="d-flex justify-content-between mb-4">
                                        <h5>Total:</h5>
                                        <h5 className="text-success">₦{cart?.total.toLocaleString()}</h5>
                                    </div>

                                    <button 
                                        type="submit" 
                                        className="btn btn-success w-100 btn-lg"
                                        disabled={submitting}
                                    >
                                        {submitting ? (
                                            <>
                                                <span className="spinner-border spinner-border-sm me-2"></span>
                                                Processing...
                                            </>
                                        ) : (
                                            <>
                                                <i className="bi bi-check-circle"></i> Place Order
                                            </>
                                        )}
                                    </button>

                                    <div className="alert alert-info mt-3 mb-0">
                                        <small><i className="bi bi-info-circle"></i> By placing this order, you agree to our Terms & Conditions</small>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CheckoutPage;
