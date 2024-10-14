import React, { useState } from 'react';
import './App.css';

const App = () => {
  const [isSignUpActive, setSignUpActive] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    password: '',
    confirmPassword: '',
    phoneNumber: ''
  });

  const handleToggle = () => {
    setSignUpActive(!isSignUpActive);
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    const { fullName, email, password, confirmPassword, phoneNumber } = formData;
  
    // Check if passwords match
    if (password !== confirmPassword) {
      alert("Passwords don't match!");
      return;
    }
  
    const registerData = {
      FULL_NAME: fullName,
      EMAIL: email,
      PHONE_NUMBER: phoneNumber,
      PASSWORD: password
    };
  
    try {
      const response = await fetch('https://free-ap-south-1.cosmocloud.io/development/api/users', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          environmentId: '67053fe3f46082408f008ecf',
          projectId: '67053fe3f46082408f008ece',
        },
        body: JSON.stringify(registerData),
      });

      console.log('Response status:', response.status);
    
      const result = await response.json();
      console.log(result); // For debugging, see what is returned
  
      // Success or existing user logic
      if (result.id) {
        // Display alert after successful registration
        alert('Registration successful!');
        setFormData({
          fullName: '',
          email: '',
          password: '',
          confirmPassword: '',
          phoneNumber: '',
        });
        window.location.reload(); 
      } else if (result === 'Record Already Exists') {
        alert('User already exists!');
      } else {
        // Handle unexpected response structure
        alert('Unexpected error occurred.');
      }
    } catch (error) {
      console.error('Error during registration:', error);
      alert('An error occurred. Please try again.');
    }
  };
  

  const handleSignIn = async (e) => {
    e.preventDefault();
    // Similar logic for sign-in using the login endpoint
  };

  return (
    <div className={`container ${isSignUpActive ? 'active' : ''}`}>
      {/* Sign In Form */}
      <div className="form-container sign-in">
        <form onSubmit={handleSignIn}>
          <h1>Sign in</h1>
          <input type="email" placeholder="Email" name="email" required onChange={handleInputChange} />
          <input type="password" placeholder="Password" name="password" required onChange={handleInputChange} />
          <button type="submit">Sign In</button>
        </form>
      </div>

      {/* Sign Up Form */}
      <div className="form-container sign-up">
        <form onSubmit={handleRegister}>
          <h1>Register</h1>
          <input type="text" placeholder="Full Name" name="fullName" required onChange={handleInputChange} />
          <input type="email" placeholder="Email" name="email" required onChange={handleInputChange} />
          <input type="text" placeholder="Phone Number" name="phoneNumber" required onChange={handleInputChange} />
          <input type="password" placeholder="Password" name="password" required onChange={handleInputChange} />
          <input type="password" placeholder="Confirm Password" name="confirmPassword" required onChange={handleInputChange} />
          <button type="submit">Sign Up</button>
        </form>
      </div>

      {/* Toggle Container */}
      <div className="toggle-container">
        <div className="toggle">
          <div className="toggle-panel toggle-left">
            <h1>Welcome Back!</h1>
            <p>To keep connected with us, please login with your personal info</p>
            <button className="hidden" onClick={handleToggle}>Sign In</button>
          </div>
          <div className="toggle-panel toggle-right">
            <h1>Hello, Friend!</h1>
            <p>Enter your details to start your journey with us</p>
            <button className="hidden" onClick={handleToggle}>Sign Up</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default App;
