import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlphaLogo from '../images/AlphaLogo.png';

const Login = () => {
    const navigate = useNavigate();
    const [email, setEmail] = useState(''); // Changed from username to email
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false); // Loading state

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true); // Set loading to true
        try {
            const response = await axios.post('/api/login', { 
                email, // Sending email instead of username
                password
            });

            if (response.status === 200) { 
                navigate('/stock-form'); 
            } else {
                alert('Login failed. Please check your credentials.'); 
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}. Please try again later.`); 
        } finally {
            setLoading(false); // Reset loading state
        }
    };

    return (
        <div className="login-container">
            <h1>Alpha LP Gas Stock Management</h1>
            <img src={AlphaLogo} alt="Alpha Logo" /> 
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div> 
                    <label>Email:</label> {/* Updated label to Email */}
                    <input
                        type="text"
                        value={email} // Updated to use email state
                        onChange={(e) => setEmail(e.target.value)} // Updated to setEmail
                        required
                    />
                </div>
                <div>
                    <label>Password:</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" disabled={loading}>Login</button> {/* Disable button while loading */}
            </form>
        </div>
    );
};

export default Login;
