import { useState } from "react";
import axios from "axios";

const StockForm = () => {
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");

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
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default StockForm;
