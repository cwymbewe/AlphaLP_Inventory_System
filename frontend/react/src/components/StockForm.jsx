import { useEffect, useState } from "react";
import axios from "axios";

const StockForm = () => {
    const [userRole, setUserRole] = useState("");
    const [item, setItem] = useState("");
    const [price, setPrice] = useState("");

    useEffect(() => {
        // Fetch user role or any other necessary data
    }, []);

    const handleSubmit = async (e) => {
        e.preventDefault();
        // Handle form submission logic using axios
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
