import { useEffect, useState } from "react"; 
import PropTypes from 'prop-types'; // Import PropTypes for validation
import axios from "axios";

const StockForm = ({ onStockSubmit }) => { // Accept onStockSubmit as a prop
    const [userRole, setUserRole] = useState("");
    const [item, setItem] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState("");

    useEffect(() => {
        const token = localStorage.getItem("token");
        if (token) {
            // Decode the token or make an API call to get user role
            const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT
            setUserRole(user.role); // Assuming the role is stored in the token
        }
    }, []);

    const submitStock = async () => {
        if (userRole === "admin") {
            // Admin logic to add stock
            await axios.post("/api/stock", { item, quantity, location }); // Admin logic
            onStockSubmit(); // Call onStockSubmit after successful stock addition
            alert("Stock was successfully added!");
        } else {
            // Regular user logic to add stock quantity
            await axios.post("/api/stock/quantity", { item, quantity, location }); // Regular user logic
            onStockSubmit(); // Call onStockSubmit after successful stock quantity addition
            alert("Stock quantity was successfully added!");
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!item || price <= 0) {
            alert("Please enter valid item and price.");
            return;
        }
        try {
            await axios.post('/api/stock', { item, price });
            alert("Stock submitted successfully!");
            // Reset form fields
            setItem("");
            setPrice("");
        } catch (error) {
            alert(`Error submitting stock: ${error.message}`);
        }
    };

    return (
        <div>
            <h2>Submit Stock</h2>
            <form onSubmit={handleSubmit}>
                <input type="text" placeholder="Item" value={item} onChange={(e) => setItem(e.target.value)} />
                <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)} />
                <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.valueAsNumber)} />
                <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)} />

                {userRole === "admin" && (
                    <>
                        <button type="button" onClick={submitStock}>Add Item</button>
                        <button type="button" onClick={() => {/* Logic to delete item */}}>Delete Item</button>
                    </>
                )}
                {userRole === "user" && (
                    <button type="button" onClick={submitStock}>Add Stock Quantity</button>
                )}
                <button type="button" onClick={() => setItem("")}>Clear</button> 
            </form>
        </div>
    );
};

StockForm.propTypes = {
    onStockSubmit: PropTypes.func.isRequired, // PropTypes validation for onStockSubmit
};

export default StockForm;
