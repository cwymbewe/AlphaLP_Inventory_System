import { useEffect, useState } from "react";
import axios from "axios";

const StockForm = () => {
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
            await axios.post("/api/stock", {item, quantity, location});
            alert("Stock was successfully added!");
        } else {
            // Regular user logic to add stock quantity
            await axios.post("/api/stock/quantity", {item, quantity, location});
            alert("Stock quantity was successfully added!");
        }
    };

    return (
        <div>
            <h2>Submit Stock</h2>
            <input type="text" placeholder="Item" value={item} onChange={(e) => setItem(e.target.value)}/>
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)}/>
            <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.valueAsNumber)}/>
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)}/>

            {userRole === "admin" && (
                <>
                    <button onClick={submitStock}>Add Item</button>
                    <button onClick={() => {/* Logic to delete item */}}>Delete Item</button>
                </>
            )}
            {userRole === "user" && (
                <button onClick={submitStock}>Add Stock Quantity</button>
            )}
            <button onClick={() => setItem("")}>Clear</button> 

            <hr/>

            {/* Display stock items */}
            {/*... */}

        </div>
    );
};

export default StockForm;
