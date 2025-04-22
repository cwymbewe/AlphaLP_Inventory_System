import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Login from './components/Login.jsx';
import StockForm from './components/StockForm.jsx';
import { fetchData } from './services/apiService';

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [data, setData] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      fetchData()
        .then(data => setData(data))
        .catch(err => {
          setError(err.message);
          console.error('Error fetching data:', err);
        });
    }
  }, []);

  const handleLogin = () => {
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    setIsLoggedIn(false);
  };

  return (
    <Router>
      <Routes>
        <Route 
          path="/" 
          element={
            isLoggedIn ? 
              <Navigate to="/stock-form" /> : 
              <Login onLogin={handleLogin} />
          } 
        />
        <Route 
          path="/stock-form" 
          element={
            isLoggedIn ? 
              <StockForm data={data} error={error} onLogout={handleLogout} /> : 
              <Navigate to="/" />
          } 
        />
      </Routes>
    </Router>
  );
  
}

export default App;
