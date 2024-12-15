import React, { useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

const Register = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        password: '',
    });
    const [error, setError] = useState('');
    const [passwordErrors, setPasswordErrors] = useState([]);
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const validatePassword = (password) => {
        const errors = [];

        if (!/(?=.*[a-z])/.test(password)) {
            errors.push('Password must contain at least one lowercase letter.');
        }
        if (!/(?=.*[A-Z])/.test(password)) {
            errors.push('Password must contain at least one uppercase letter.');
        }
        if (!/(?=.*\d)/.test(password)) {
            errors.push('Password must contain at least one number.');
        }
        if (password.length < 8) {
            errors.push('Password must be at least 8 characters long.');
        }

        return errors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setPasswordErrors([]);

        // Проверка пароля
        const passwordValidationErrors = validatePassword(formData.password);
        if (passwordValidationErrors.length > 0) {
            setPasswordErrors(passwordValidationErrors);
            return;
        }

        try {
            const response = await axios.post(window.location.origin + '/api/register', formData);
            console.log('Registration successful', response.data);
            navigate('/');
        } catch (err) {
            setError(err.response?.data?.message || 'Error registering');
            console.error('Error response:', err.response);
        }
    };

    const LoginClick = () => {
        navigate('/');
    };

    return (
        <div className="cont s--signup">
            <div className="sub-cont">
                <div className="img">
                    <div className="img__text m--in">
                        <h3>If you already have an account, just sign in.</h3>
                    </div>
                    <div className="img__btn">
                        <span>
                            <button style={{ zIndex: 1000 }} onClick={LoginClick}>
                                Sign in
                            </button>
                        </span>
                    </div>
                </div>
                <div className="form sign-up">
                    <h2>Create your Account</h2>
                    <label>
                        <span>Name</span>
                        <input
                            name="name"
                            type="text"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    <label>
                        <span>Password</span>
                        <input
                            type="password"
                            name="password"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </label>
                    {passwordErrors.length > 0 && (
                        <div
                            style={{
                                fontSize: '15px',
                                color: 'red',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                            }}
                        >
                            {passwordErrors.map((error, index) => (
                                <div key={index}>{error}</div>
                            ))}
                        </div>
                    )}
                    {error && <div>{error}</div>}
                    <button type="button" onClick={handleSubmit} className="submit">
                        Sign Up
                    </button>
                </div>
            </div>
        </div>
    );
};

export default Register;
