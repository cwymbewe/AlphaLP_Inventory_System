import {useState} from "react";
import axios from "axios";

const StockForm = () => {
    const [item, setItem] = useState("");
    const [price, setPrice] = useState(0);
    const [quantity, setQuantity] = useState(0);
    const [location, setLocation] = useState("");

    const submitStock = async () => {
        await axios.post("/api/stock", {item, quantity, location});
        alert("Stock was successfully added!");
    };

    return (
        <div>
            <h2>Submit Stock</h2>
            <input type="text" placeholder="Item" value={item} onChange={(e) => setItem(e.target.value)}/>
            <input type="number" placeholder="Price" value={price} onChange={(e) => setPrice(e.target.valueAsNumber)}/>
            <input type="number" placeholder="Quantity" value={quantity} onChange={(e) => setQuantity(e.target.valueAsNumber)}/>
            <input type="text" placeholder="Location" value={location} onChange={(e) => setLocation(e.target.value)}/>

            <button onClick={submitStock}>Submit</button>
            <button onClick={() => setItem("")}>Clear</button>

            <hr/>

            {/* Display stock items */}
            {/*... */}

        </div>
    );
};

export default StockForm;