import React from 'react';
import { Link } from 'react-router-dom';
import './Home.css';

const Home = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <h1>Welcome to Typing Speed Game</h1>
        <p>Improve your typing skills and track your progress.</p>
      </header>

      <div className="auth-buttons">
        <Link to="/Login" className="auth-button signin-button">Sign In</Link>
        <Link to="/signup" className="auth-button signup-button">Sign Up</Link>
      </div>
    </div>
  );
}

export default Home;
