import MenuCSS from '../components/modules/Menu.module.css';
import { useSelector, useDispatch } from 'react-redux'; 
import { useState } from 'react';
import { addItem, removeItem } from '../store/orderSlice';

export const MenuItemOne = ({ name, description, price }) => {
    const order = useSelector(state => state.order);
    const dispatch = useDispatch();
    const [quantity, setQuantity] = useState(0);

    const handleDecrement = () => {
        if (quantity - 1 < 0) {
            window.alert("Item quantity cannot be negative");
        } else {
            setQuantity(quantity - 1);
            dispatch(removeItem({ price: Number(price), name }));
        }
    };

    const handleIncrement = () => {
        setQuantity(quantity + 1);
        dispatch(addItem({ price: Number(price), name }));
    };

    return (
        <div className={MenuCSS.item_card}>
            <div className={MenuCSS.item_details}>
                <h3 className={MenuCSS.item_name}>{name}</h3>
                <p className={MenuCSS.item_description}>{description}</p>
                <p className={MenuCSS.item_description}> Price: ${price}</p>
            </div>
            <div className={MenuCSS.item_actions}>
                <button className={MenuCSS.btn_minus} onClick={handleDecrement}>-</button>
                <span className={MenuCSS.quantity}>{quantity}</span>
                <button className={MenuCSS.btn_plus} onClick={handleIncrement}>+</button>
            </div>
        </div>
    );
};
