import styles from './modules/employeeorder.module.css'
import axios from 'axios'
import { useState, useEffect } from 'react'

export const EmployeeOrder = (props) => {

    const [singleOrder, setsingleOrder] = useState(null)
    const [choice, setchoice] = useState("")

    async function fetchOrder() {
        try {
            const res = await axios.get(`http://localhost:8000/order/${props.id}`)
            console.log(res.data.order)
            setsingleOrder(res.data.order)
        } catch (error) {
            console.log(error)
        }
    }

    const returnIndex = (arr1, item) => {
        for(let i = 0; i < arr1.length;i++) {
            if(item === arr1[i]) {
                return i;
            }
        }   
        return 0;
    }

    useEffect(() => {
        fetchOrder()
    }, [])

    async function handleClick(e) {
        setchoice(e.target.value)
        console.log(e.target.value)
    }

    async function handleCl() {
        try {
            const res = await axios.put(`http://localhost:8000/order/updateOrderStatus`, { id: props.id, status: choice });
            console.log(res.data.message);
            fetchOrder();
        } catch (error) {
            console.log(error);
        }
    }

    return (
        <div className={styles.order_card}>
            <div className={styles.order_details}>
                <p><strong>Items:</strong></p>
                {singleOrder && singleOrder.items_ordered.map(item => <p key={item}>{item} x {Number(singleOrder.quantity_ordered[returnIndex(singleOrder.items_ordered,item)])}</p>)}
                <p><strong>Total Price:</strong> {singleOrder && Number(singleOrder.total_price)}</p>
                <p><strong>Status:</strong>{singleOrder && singleOrder.status}</p>
            </div>
            <div className={styles.update_status}>
                <select value={choice} onChange={handleClick}>
                    <option value="processing">Processing</option>
                    <option value="preparing">Preparing</option>
                    <option value="ready">Ready</option>
                    <option value="delivered">Delivered</option>
                </select>
                <button onClick={handleCl}>Update Status</button>
            </div>
        </div>
    )
}
