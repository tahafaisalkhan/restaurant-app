import { useParams } from 'react-router-dom';
import MyOrderCSS from './modules/MyOrder.module.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Navbar } from './navbar';
import { io } from 'socket.io-client';

export const MyOrder = () => {
    const { id } = useParams();
    const [singleOrder, setSingleOrder] = useState(null);
    const [socket, setSocket] = useState(null);
    const [status, setStatus] = useState("");

    const fetchOrder = async () => {
        try {
            const response = await axios.get(`http://localhost:8000/order/${id}`);
            setSingleOrder(response.data.order);
            setStatus(response.data.order.status);
        } catch (error) {
            console.error(error);
        }
    };

    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);
        newSocket.emit("on-order", id);
        newSocket.on("status-change", data => {
            setStatus(data);
        });
        return () => {
            newSocket.disconnect();
        };
    }, [id]);

    const getItemIndex = (array, item) => array.findIndex(element => element === item);

    useEffect(() => {
        fetchOrder();
    }, []);

    return (
        <div className={MyOrderCSS.body}>
            <Navbar />
            <div className={MyOrderCSS.container}>
                <div className={MyOrderCSS.card}>
                    <h2>My Order</h2>
                    <div className={MyOrderCSS.order_details}>
                        <div className={MyOrderCSS.item}>
                            {singleOrder?.items_ordered.map(item => (
                                <span key={item}>
                                    <span className={MyOrderCSS.name}>{item}</span> x 
                                    <span className={MyOrderCSS.quantity}>{Number(singleOrder?.quantity_ordered[getItemIndex(singleOrder?.items_ordered, item)])}</span>
                                </span>
                            ))}
                        </div>
                        <div className={MyOrderCSS.total}>
                            <span>Total:</span>
                            <span className={MyOrderCSS.total_price}>${Number(singleOrder?.total_price)}</span>
                        </div>
                        <div className={MyOrderCSS.status}>
                            <span>Status:</span>
                            <span className={MyOrderCSS.order_status}>{status}</span>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
