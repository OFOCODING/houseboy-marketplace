import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../utils/AuthContext';

const RegisterPage = () => {
    const [formData, setFormData] = useState({ fullName: '', email: '', phone: '', password: '', role: 'customer' });
    const [error, setError] = useState('');
    const { register } = useAuth();
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        const result = await register(formData);
        if (result.success) navigate('/');
        else setError(result.message);
    };

    return (
        <div className="container py-5">
            <div className="row justify-content-center">
                <div className="col-md-6">
                    <div className="card shadow">
                        <div className="card-body p-5">
                            <h2 className="text-center mb-4">Create Account</h2>
                            {error && <div className="alert alert-danger">{error}</div>}
                            <form onSubmit={handleSubmit}>
                                <div className="mb-3">
                                    <label>Full Name</label>
                                    <input type="text" className="form-control" value={formData.fullName} onChange={(e) => setFormData({ ...formData, fullName: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label>Email</label>
                                    <input type="email" className="form-control" value={formData.email} onChange={(e) => setFormData({ ...formData, email: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label>Phone</label>
                                    <input type="tel" className="form-control" value={formData.phone} onChange={(e) => setFormData({ ...formData, phone: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label>Password</label>
                                    <input type="password" className="form-control" value={formData.password} onChange={(e) => setFormData({ ...formData, password: e.target.value })} required />
                                </div>
                                <div className="mb-3">
                                    <label>Account Type</label>
                                    <select className="form-select" value={formData.role} onChange={(e) => setFormData({ ...formData, role: e.target.value })}>
                                        <option value="customer">Customer</option>
                                        <option value="vendor">Vendor</option>
                                    </select>
                                </div>
                                <button type="submit" className="btn btn-success w-100">Create Account</button>
                            </form>
                            <p className="text-center mt-3">Already have an account? <Link to="/login">Login</Link></p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RegisterPage;
