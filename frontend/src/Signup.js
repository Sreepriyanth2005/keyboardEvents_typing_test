import React, { useState} from 'react';
import { Link, useNavigate } from 'react-router-dom'; 
import axios from 'axios';
import './Signup.css'

const Signup = () => {
    const [formData, setFormData] = useState({
        username: '',  
        email: '',
        password: '',
        confirmPassword: '',
    });

    const [errors, setErrors] = useState({
        usernameError: '',  
        emailError: '',
        passwordError: '',
        confirmPasswordError: '',
    });

    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const { username, email, password, confirmPassword } = formData;
    
        let formIsValid = true;
        const newErrors = {
            usernameError: '',
            emailError: '',
            passwordError: '',
            confirmPasswordError: '',
        };

        const namePattern = /^[a-zA-Z\s]+$/;
    
        if (username.trim() === "") {
            newErrors.usernameError = "Please enter a valid username";
            formIsValid = false;
        } else if (!namePattern.test(username)) {
            newErrors.usernameError = "Username should not contain numbers";
            formIsValid = false;
        }
    
        if (email.trim() === "" || !/\S+@\S+\.\S+/.test(email)) {
            newErrors.emailError = "Please enter a valid email";
            formIsValid = false;
        }
    
        if (password.length < 6 || password.length > 8) {
            newErrors.passwordError = "Password must be between 6 and 8 characters";
            formIsValid = false;
        }
    
        if (password !== confirmPassword) {
            newErrors.confirmPasswordError = "Passwords do not match";
            formIsValid = false;
        } else if (confirmPassword.trim() === "") {
            newErrors.confirmPasswordError = "Enter Confirm Password";
            formIsValid = false;
        }
    
        setErrors(newErrors);
    
        if (formIsValid) {
            try {
                const result = await axios.post('http://localhost:3000/Signup', { username, email, password });
                console.log('Registration successful:', result);
                alert("Registration successful!");
                navigate('/login');
            } catch (err) {
                console.error('Registration error:', err);
                if (err.response) {
                    console.error('Error response:', err.response.data);
                    alert(`Error: ${err.response.data.message || 'Failed to register'}`);
                } else {
                    console.error('Error:', err.message);
                    alert(`Error: ${err.message}`);
                }
            }
        }
    };

    return (
        <div className="signup-container">
            <div className="signup-form">
                <h2>Register</h2>
                <p>Already have an account? <Link to='/Login'>Login</Link></p>
                <form onSubmit={handleSubmit}>
                    <div className="form-group">
                        <label htmlFor="username">Username:</label>
                        <input
                            type="text"
                            id="username"
                            name="username"
                            placeholder="Username"
                            value={formData.username}
                            onChange={handleChange}
                        />
                        <span className="error-message">{errors.usernameError}</span>
                    </div>
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
                            minLength="6"
                            maxLength="8"
                            value={formData.password}
                            onChange={handleChange}
                        />
                        <span className="error-message">{errors.passwordError}</span>
                    </div>
                    <div className="form-group">
                        <label htmlFor="confirmPassword">Confirm Password:</label>
                        <input
                            type="password"
                            id="confirmPassword"
                            name="confirmPassword"
                            placeholder="Confirm Password"
                            value={formData.confirmPassword}
                            onChange={handleChange}
                        />
                        <span className="error-message">{errors.confirmPasswordError}</span>
                    </div>
                    <button type="submit">Submit</button>
                </form>
            </div>
        </div>
    );
};

export default Signup;
