import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import '../css/app.css';
import { Link } from 'react-router-dom';
const Login = () => {
    const [form, setForm] = useState({
        email: '',
        password: '',
    });

    const [error, setError] = useState('');
    const navigate = useNavigate();

    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await axios.post(window.location.origin + '/api/login', form);
            localStorage.setItem('token', response.data.token);
            alert("Successfully written!")
        } catch (err) {
            setError('Login failed. Invalid credentials.');
        }
    };

    return (
        <div>
            <div className="cont">
                <div className="form sign-in">
                    <h2>Welcome</h2>
                    {error && <p style={{ color: 'red' }}>{error}</p>}
                    <label>
                        <span>Email</span>
                        <input
                            type="email"
                            name="email"
                            value={form.email}
                            onChange={handleChange}
                            required/>
                    </label>
                    <label>
                        <span>Password</span>
                        <input
                            type="password"
                            name="password"
                            value={form.password}
                            onChange={handleChange}
                            required/>
                    </label>
                    <p className="forgot-pass">Forgot password?</p>
                    <button type="button" onClick={handleSubmit} className="submit">Sign In</button>
                </div>
                <div className="sub-cont">
                    <div className="img">
                        <div className="img__text m--up">

                            <h3>Don't have an account? Please Sign up!</h3>
                        </div>
                        <div className="img__text m--in">

                            <h3>If you already has an account, just sign in.</h3>
                        </div>
                        <div className="img__btn">
                            <span className="m--up">
                                <Link
                                    style={{
                                        textDecoration: "none",
                                        color: 'white',
                                        zIndex: 100
                                    }}
                                    to="/register">
                                    Sign Up
                                </Link>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
