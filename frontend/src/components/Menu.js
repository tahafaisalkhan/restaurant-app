import MenuCSS from './modules/Menu.module.css';
import { useEffect, useState } from 'react';
import { Navbar } from './navbar';
import axios from 'axios';
import { MenuItemOne } from './createMenuItem';
import { useSelector, useDispatch } from 'react-redux';
import { resetState } from '../store/orderSlice';
import { io } from 'socket.io-client';

export const Menu = () => {
    const [menuItems, setMenuItems] = useState([]);
    const [socket, setSocket] = useState(null);
    const order = useSelector(state => state.order);
    const user = useSelector(state => state.auth.user);
    const dispatch = useDispatch();

    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);
        return () => {
            newSocket.disconnect();
        };
    }, []);

    useEffect(() => {
        fetchAllMenuItems();
    }, []);

    useEffect(() => {
        dispatch(resetState());
    }, [dispatch]);

    const fetchAllMenuItems = async () => {
        try {
            const response = await axios.post("http://localhost:8000/menu/getAll");
            setMenuItems(response.data.menu_items);
        } catch (error) {
            console.error("Error fetching menu items:", error);
        }
    };

    const getItemIndex = (array, item) => array.findIndex(element => element === item);

    const handleCheckout = async (e) => {
        e.preventDefault();
        if (order.total_price <= 0 || order.items_ordered.length === 0 || order.quantity_ordered.length === 0) {
            window.alert("You cannot place an empty order");
            return;
        }
        try {
            const response = await axios.post("http://localhost:8000/order/create", {
                items_ordered: order.items_ordered,
                quantity_ordered: order.quantity_ordered,
                status: "Processing",
                total_price: order.total_price,
                ordered_by: user?._id,
            });
            socket?.emit("order-placed", response);
            window.alert("Order placed");
            dispatch(resetState());
        } catch (error) {
            window.alert("Error while placing order");
        }
    };

    return (
        <>
            <Navbar />
            <div className={MenuCSS.body}>
                <div className={MenuCSS.container}>
                    <h2>Menu</h2>
                    <div className={MenuCSS.menu_items}>
                        {menuItems.map(menu => (
                            <MenuItemOne key={menu._id} name={menu.item_name} description={menu.description} price={menu.price} />
                        ))}
                    </div>
                    <div className={MenuCSS.cart}>
                        <h3>Shopping Cart</h3>
                        <ul className={MenuCSS.cart_items}>
                            {order.items_ordered.map(item => (
                                <li key={item}>{item} x {order.quantity_ordered[getItemIndex(order.items_ordered, item)]}</li>
                            ))}
                        </ul>
                        <p>Total Price: ${order.total_price}</p>
                        <button className={MenuCSS.btn_checkout} onClick={handleCheckout}>Checkout</button>
                    </div>
                </div>
            </div>
        </>
    );
};
