import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from './components/Login.jsx';
import StockForm from './components/StockForm.js'; // Import the StockForm component

function App() {
  return (
    <Router>
      <Switch>
        <Route path="/stock-form" component={StockForm} /> {/* Define the route for StockForm */}
        <Route path="/" component={Login} /> {/* Default route for Login */}
      </Switch>
    </Router>
  );
}

export default App;
