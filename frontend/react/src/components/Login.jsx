import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AlphaLogo from '../images/AlphaLogo.png';

const Login = () => {
    const navigate = useNavigate();
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('/api/login', { 
                username,
                password
            });

            if (response.status === 200) { 
                navigate('/stock-form'); 
            } else {
                alert('Login failed. Please check your credentials.'); 
            }
        } catch (error) {
            alert(`An error occurred: ${error.message}. Please try again later.`); 
        }
    };

    return (
        <div className="login-container">
            <h1>Alpha LP Gas Stock Management</h1>
            <img src={AlphaLogo} alt="Alpha Logo" /> 
            <h2>Login</h2>
            <form onSubmit={handleLogin}>
                <div> 
                    <label>Username:</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
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
                <button type="submit">Login</button>
            </form>
        </div>
    );
};

export default Login;
