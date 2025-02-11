import { BrowserRouter as Router, Route, Routes } from 'react-router-dom'; // Update import
import Login from './components/Login.jsx';
import StockForm from './components/StockForm.jsx'; // Import the StockForm component

function App() {
  return (
    <Router>
      <Routes> {/* Update to use Routes */}
        <Route path="/stock-form" element={<StockForm />} /> {/* Update to use element prop */}
        <Route path="/" element={<Login />} /> {/* Update to use element prop */}
      </Routes>
    </Router>
  );
}

export default App;
