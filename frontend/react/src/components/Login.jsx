import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlphaLogo from '../images/AlphaLogo.png';

const Login = ({ onLogin }) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [stocks, setStocks] = useState([]); // State to hold stocks

    const handleLogin = async (e) => {
        // Notify user of successful login
        alert("Login successful! Fetching stocks...");
        e.preventDefault();
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!emailPattern.test(email)) {
            alert("Please enter a valid email address.");
            setLoading(false);
            return;
        }
        if (!passwordPattern.test(password)) {
            alert("Password must be at least 8 characters long and contain letters, numbers, and at least one special character.");
            setLoading(false);
            return;
        }

        setLoading(true);
        try {
            const response = await axios.post('http://localhost:3000/api/users/login', { 
                email,
                password
            });

            if (response.data) {
                localStorage.setItem('token', response.data.token);
                onLogin();
                // Fetch stocks after successful login
                const stockResponse = await axios.get('http://localhost:3000/api/stock', {
                    headers: {
                        Authorization: `Bearer ${response.data.token}`
                    }
                });
                setStocks(stockResponse.data); // Store stocks in state
                navigate('/stock-form'); // Navigate to stock form
            } else {
                alert('User does not exist. Please register.');
                // Enable the Add User button
                document.getElementById('addUserButton').disabled = false; // Assuming the button has this ID
                const register = window.confirm("User not found. Would you like to register?");
                if (register) {
                    // Logic to open registration form
                // After adding the user, you can call the login function again
                }
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}. Please try again later.`);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="login-container">
            <h1>Alpha LP Gas Stock Management</h1>
            <img src={AlphaLogo} alt="Alpha Logo" /> 
            <h2>Login</h2>
            <form onSubmit={handleLogin} className="login-form">
                <div> 
                    <label>Email:</label>
                    <input
                        type="text"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        autoComplete="email"
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        autoComplete="current-password"
                    />
                </div>
                <button type="submit" disabled={loading}>Login</button>
                <button type="button" onClick={() => {/* Logic to open registration form */}}>Add User</button>
            </form>
            <div>
                <h2>Your Stocks</h2>
                <ul>
                    {stocks.map(stock => (
                        <li key={stock.id}>{stock.item}: {stock.quantity} in {stock.location} at ${stock.price}</li>
                    ))}
                </ul>
            </div>
        </div>
    );
};

import PropTypes from 'prop-types';

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login;
