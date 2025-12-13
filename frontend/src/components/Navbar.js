import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const Navbar = () => {
    const { user, isAuthenticated, logout } = useAuth();
    const navigate = useNavigate();

    const handleLogout = () => {
        logout();
        navigate('/login');
    };

    return (
        <nav className="navbar navbar-expand-lg navbar-dark" style={{ background: 'linear-gradient(135deg, #2563eb, #10b981)' }}>
            <div className="container">
                <Link className="navbar-brand fw-bold" to="/">
                    <i className="bi bi-house-heart-fill"></i> Houseboy Marketplace
                </Link>
                <div className="d-flex gap-3 align-items-center">
                    <Link className="text-white text-decoration-none" to="/">Home</Link>
                    <Link className="text-white text-decoration-none" to="/products">Products</Link>
                    {isAuthenticated ? (
                        <>
                            <Link className="text-white text-decoration-none" to="/cart">
                                <i className="bi bi-cart3"></i> Cart
                            </Link>
                            <Link className="text-white text-decoration-none" to="/orders">
                                <i className="bi bi-bag-check"></i> Orders
                            </Link>
                            <span className="text-white"><i className="bi bi-person-circle"></i> {user?.fullName}</span>
                            <button className="btn btn-outline-light btn-sm" onClick={handleLogout}>Logout</button>
                        </>
                    ) : (
                        <>
                            <Link to="/login"><button className="btn btn-outline-light btn-sm">Login</button></Link>
                            <Link to="/register"><button className="btn btn-light btn-sm">Sign Up</button></Link>
                        </>
                    )}
                </div>
            </div>
        </nav>
    );
};

export default Navbar;
