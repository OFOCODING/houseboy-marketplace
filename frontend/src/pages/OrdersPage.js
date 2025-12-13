import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { orderAPI } from '../utils/api';

const OrdersPage = () => {
    const [orders, setOrders] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetchOrders();
    }, []);

    const fetchOrders = async () => {
        try {
            const res = await orderAPI.getMyOrders();
            setOrders(res.data.data);
        } catch (error) {
            console.error('Error fetching orders:', error);
        } finally {
            setLoading(false);
        }
    };

    const getStatusBadge = (status) => {
        const badges = {
            pending: 'warning',
            confirmed: 'info',
            processing: 'primary',
            shipped: 'secondary',
            delivered: 'success',
            cancelled: 'danger'
        };
        return `badge bg-${badges[status] || 'secondary'}`;
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
                    <h2><i className="bi bi-bag-check"></i> My Orders</h2>
                    <p className="mb-0">Track and manage your orders</p>
                </div>
            </div>

            <div className="container py-4">
                {orders.length === 0 ? (
                    <div className="text-center py-5">
                        <i className="bi bi-bag-x" style={{ fontSize: '5rem', color: '#ccc' }}></i>
                        <h3 className="mt-3">No orders yet</h3>
                        <p className="text-muted">Start shopping to create your first order!</p>
                        <Link to="/products" className="btn btn-primary">
                            <i className="bi bi-shop"></i> Browse Products
                        </Link>
                    </div>
                ) : (
                    <div className="row">
                        {orders.map(order => (
                            <div key={order._id} className="col-12 mb-3">
                                <div className="card shadow-sm">
                                    <div className="card-body">
                                        <div className="row align-items-center">
                                            <div className="col-md-3">
                                                <h6 className="mb-1">Order #{order.orderNumber}</h6>
                                                <small className="text-muted">
                                                    {new Date(order.createdAt).toLocaleDateString()}
                                                </small>
                                            </div>
                                            <div className="col-md-3">
                                                <small className="text-muted">Items:</small>
                                                <div><strong>{order.items.length} items</strong></div>
                                            </div>
                                            <div className="col-md-2">
                                                <small className="text-muted">Total:</small>
                                                <div><strong className="text-success">₦{order.total.toLocaleString()}</strong></div>
                                            </div>
                                            <div className="col-md-2">
                                                <span className={getStatusBadge(order.status)}>
                                                    {order.status.toUpperCase()}
                                                </span>
                                            </div>
                                            <div className="col-md-2 text-end">
                                                <Link to={`/orders/${order._id}`} className="btn btn-sm btn-outline-primary">
                                                    View Details
                                                </Link>
                                            </div>
                                        </div>

                                        <div className="mt-3">
                                            <div className="row g-2">
                                                {order.items.slice(0, 3).map(item => (
                                                    <div key={item._id} className="col-auto">
                                                        <img 
                                                            src={item.image} 
                                                            alt={item.productName}
                                                            style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }}
                                                        />
                                                    </div>
                                                ))}
                                                {order.items.length > 3 && (
                                                    <div className="col-auto d-flex align-items-center">
                                                        <small className="text-muted">+{order.items.length - 3} more</small>
                                                    </div>
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default OrdersPage;
