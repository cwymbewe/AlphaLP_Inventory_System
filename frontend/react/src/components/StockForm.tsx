import { useEffect, useState } from "react"; 
import PropTypes from 'prop-types'; // Import PropTypes for validation
import axios from "axios";

interface StockFormProps {
    onStockSubmit: () => void; // Define the type for onStockSubmit
    isLoggedIn: boolean; // Define the type for isLoggedIn
    data: any; // Define the type for data
    error: string | null; // Define the type for error
    onLogout: () => void; // Define the type for onLogout
}

const StockForm: React.FC<StockFormProps> = ({ onStockSubmit, isLoggedIn, data, error, onLogout }) => { // Accept onStockSubmit and isLoggedIn as props
    const [userRole, setUserRole] = useState(isLoggedIn ? "user" : "guest"); // Set user role based on login status
    const [item, setItem] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState("");

    useEffect(() => { 
        if (isLoggedIn) {
            const token = localStorage.getItem("token");
            if (token) {
                // Decode the token or make an API call to get user role
                const user = JSON.parse(atob(token.split('.')[1])); // Decode JWT
                setUserRole(user.role); // Assuming the role is stored in the token
            }
        }
    }, [isLoggedIn]);

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

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
            setPrice(0);
        } catch (error) {
            alert(`Error submitting stock: ${(error as any).message}`);
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

                {isLoggedIn && (
                    <>
                        {userRole === "admin" && (
                            <>
                                <button type="button" onClick={submitStock}>Add Item</button>
                                <button type="button" onClick={() => {/* Logic to delete item */}}>Delete Item</button>
                            </>
                        )}
                        {userRole === "user" && (
                            <button type="button" onClick={submitStock}>Add Stock Quantity</button>
                        )}
                    </>
                )}
                <button type="button" onClick={() => setItem("")}>Clear</button> 
            </form>
        </div>
    );
};

StockForm.propTypes = {
    onStockSubmit: PropTypes.func.isRequired, // PropTypes validation for onStockSubmit
    isLoggedIn: PropTypes.bool.isRequired, // PropTypes validation for isLoggedIn
    data: PropTypes.any, // PropTypes validation for data
    error: PropTypes.string, // PropTypes validation for error
    onLogout: PropTypes.func.isRequired, // PropTypes validation for onLogout
};

export default StockForm;
