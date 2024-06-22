import { useEffect, useState } from 'react';
import ProfileCSS from '../components/modules/Profile.module.css';
import axios from 'axios';
import { Link } from 'react-router-dom';

export const SingleOrder = ({ id }) => {
    const [singleOrder, setSingleOrder] = useState(null);

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/order/${id}`);
            setSingleOrder(response.data.order);
        } catch (error) {
            console.error(error);
        }
    };

    const getItemIndex = (array, item) => array.findIndex(element => element === item);

    useEffect(() => {
        fetchOrder();
    }, [id]);

    return (
        <div className={ProfileCSS.order_card}>
            <div className={ProfileCSS.order_details}>
                <p><strong>Items:</strong></p>
                {singleOrder && singleOrder.items_ordered.map(item => (
                    <p key={item}>
                        {item} x {Number(singleOrder.quantity_ordered[getItemIndex(singleOrder.items_ordered, item)])}
                    </p>
                ))}
                <p><strong>Total Price:</strong> ${singleOrder && Number(singleOrder.total_price)}</p>
                <Link to={`/order/${id}`}>
                    <p><strong>Status:</strong> {singleOrder && singleOrder.status}</p>
                </Link>
            </div>
        </div>
    );
};
