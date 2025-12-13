import React from 'react';
import { useAuth } from '../utils/AuthContext';

const HomePage = () => {
    const { isAuthenticated, user } = useAuth();

    return (
        <div>
            <div className="text-white py-5 text-center" style={{ background: 'linear-gradient(135deg, #2563eb, #10b981)', minHeight: '400px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <div>
                    <h1 className="display-3 fw-bold">Welcome to Houseboy Marketplace</h1>
                    <p className="lead">Your All-in-One Service Platform</p>
                    {isAuthenticated && <h4 className="mt-4">Hello, {user?.fullName}! 👋</h4>}
                </div>
            </div>
            <div className="container py-5">
                <h2 className="text-center mb-5">Our Services</h2>
                <div className="row g-4">
                    {['Hotel Booking', 'Short-let Apartments', 'Ride Ordering', 'Farm Products', 'Dispatch Service', 'Marketplace'].map((service, i) => (
                        <div key={i} className="col-md-4">
                            <div className="card shadow-sm h-100">
                                <div className="card-body text-center p-4">
                                    <i className="bi bi-shop" style={{ fontSize: '3rem', color: '#2563eb' }}></i>
                                    <h4 className="mt-3">{service}</h4>
                                    <p className="text-muted">Coming soon...</p>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default HomePage;
