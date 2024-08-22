import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import "./Login.css";


const Login = () => {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });

    const [errors, setErrors] = useState({
        emailError: '',
        passwordError: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const { email, password } = formData;
    
        let formIsValid = true;
        const newErrors = {
            emailError: '',
            passwordError: '',
        };

        if (email === "") {
            newErrors.emailError = "Please enter a valid email";
            formIsValid = false;
        }
    
        if (password === "") {
            newErrors.passwordError = "Password is required";
            formIsValid = false;
        }
    
        setErrors(newErrors);
    
        if (formIsValid) {
            axios.post('http://localhost:3000/Login', { email, password })  
                .then(result => {
                    console.log('Login successful:', result);
                    alert("Login successful!!!");
                    navigate('/Keyboard'); 
                })
                .catch(err => {
                    console.error('Login error:', err);
                    if (err.response) {
                        console.error('Error response:', err.response.data);
                        alert(`Error: ${err.response.data.message || 'Failed to login'}`);
                    } else {
                        console.error('Error:', err.message);
                        alert(`Error: ${err.message}`);
                    }
                });
        }
    };

    return (
        <div className="login-container">
            <form className="login-form" onSubmit={handleSubmit}>
                <h2>Login</h2>
                <div className="form-group">
                    <label htmlFor="email">Email:</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        placeholder="E-mail"
                        value={formData.email}
                        onChange={handleChange}
                    />
                    <span className="error-message">{errors.emailError}</span>
                </div>
                <div className="form-group">
                    <label htmlFor="password">Password:</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        placeholder="Password"
                        value={formData.password}
                        onChange={handleChange}
                    />
                    <span className="error-message">{errors.passwordError}</span>
                </div>
                <button type="submit">Login</button>
                <p>Don't have an account? <Link to='/Signup'>Signup</Link></p>
            </form>
        </div>
    );
};

export default Login;
