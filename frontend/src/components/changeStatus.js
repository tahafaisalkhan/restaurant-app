import styles from './modules/employeeorder.module.css';
import axios from 'axios';
import { useState, useEffect } from 'react';

export const EmployeeOrder = ({ id }) => {
    const [singleOrder, setSingleOrder] = useState(null);
    const [choice, setChoice] = useState("");

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/order/${id}`);
            setSingleOrder(response.data.order);
        } catch (error) {
            console.error(error);
        }
    };

    const returnIndex = (arr, item) => arr.findIndex(element => element === item);

    useEffect(() => {
        fetchOrder();
    }, []);

    const handleClick = (e) => {
        setChoice(e.target.value);
    };

    const handleStatusUpdate = async () => {
        try {
            const response = await axios.put(`http://localhost:8000/order/updateOrderStatus`, { id, status: choice });
            console.log(response.data.message);
            fetchOrder();
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className={styles.order_card}>
            <div className={styles.order_details}>
                <p><strong>Items:</strong></p>
                {singleOrder && singleOrder.items_ordered.map(item => (
                    <p key={item}>{item} x {Number(singleOrder.quantity_ordered[returnIndex(singleOrder.items_ordered, item)])}</p>
                ))}
                <p><strong>Total Price:</strong> {singleOrder && Number(singleOrder.total_price)}</p>
                <p><strong>Status:</strong> {singleOrder && singleOrder.status}</p>
            </div>
            <div className={styles.update_status}>
                <select value={choice} onChange={handleClick}>
                    <option value="processing">Processing</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                </select>
                <button onClick={handleStatusUpdate}>Update Status</button>
            </div>
        </div>
    );
};
