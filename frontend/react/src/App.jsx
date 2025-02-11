import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update import
import Login from './components/Login.jsx';
import StockForm from './components/StockForm.jsx'; // Import the StockForm component

import { useState } from 'react'; // Import useState
import { Navigate } from 'react-router-dom'; // Import Navigate

const App = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Track login state

  const onLogin = () => {
    setIsLoggedIn(true); // Update login state
  };

  return (
    <Router>
      <Routes> {/* Update to use Routes */}
        <Route path="/stock-form" element={<StockForm />} /> {/* Update to use element prop */}
        <Route path="/" element={<Login onLogin={onLogin} />} /> {/* Pass onLogin to Login */}
        <Route path="/stock-form" element={isLoggedIn ? <StockForm /> : <Navigate to="/" />} /> {/* Redirect if not logged in */}
      </Routes>
    </Router>
  );
}

export default App;
