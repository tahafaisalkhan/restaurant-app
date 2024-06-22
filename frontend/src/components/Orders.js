import OrderCSS from './modules/Order.module.css'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { Navbar } from './navbar'
import { io } from 'socket.io-client';
import { EmployeeOrder } from './changeStatus'

export const Orders = () => {
    const [socket, setSocket] = useState(null)
    const [currentOrders, setcurrentOrders] = useState([])

    async function fetchOrder() {
        try {
            const res = await axios.post(`http://localhost:8000/order/currentOrders`)
            console.log(res.data.orders)
            setcurrentOrders(res.data.orders)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        const newSocket = io("http://localhost:8000");
        setSocket(newSocket);
        return () => {newSocket.disconnect()}
    },[])

    useEffect(() => {
        fetchOrder()
    },[])

    return (
        <div className={OrderCSS.body}>
            <Navbar/>
            <div className={OrderCSS.container}>
                <h2>Orders</h2>
                <div className={OrderCSS.orders}>
                    {currentOrders.map(order => <EmployeeOrder id={order._id}/>)}
                </div>
            </div>
        </div>
    )
}
