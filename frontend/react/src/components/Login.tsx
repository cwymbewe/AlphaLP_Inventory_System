import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { loginUser } from '../services/apiService';
import AlphaLogo from '../images/AlphaLogo.png';

interface LoginProps {
    onLogin: () => void;
}

const Login = ({ onLogin }: LoginProps) => {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        
        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        const passwordPattern = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[!@#$%^&*])[A-Za-z\d!@#$%^&*]{8,}$/;

        if (!emailPattern.test(email)) {
            setError('Please enter a valid email address.');
            return;
        }
        if (!passwordPattern.test(password)) {
            setError('Password must be at least 8 characters long and contain letters, numbers, and at least one special character.');
            return;
        }

        setLoading(true);
        try {
            await loginUser({ email, password });
            onLogin();
            navigate('/stock-form');
        } catch (error) {
            if (error instanceof Error) {
                setError(error.message);
            } else {
                setError('Login failed. Please try again.');
            }
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
                        title="Enter your email address"
                        placeholder="Email Address"
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
                        title="Enter your password"
                        placeholder="Password"
                    />
                </div>
                <button type="submit" disabled={loading}>Login</button>
                <button type="button" onClick={() => {/* Logic to open registration form */}}>Add User</button>
            </form>
            {error && <div className="error-message">{error}</div>}
        </div>
    );
};

import PropTypes from 'prop-types';

Login.propTypes = {
    onLogin: PropTypes.func.isRequired,
};

export default Login;
