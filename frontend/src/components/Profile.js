import { useSelector, useDispatch } from 'react-redux';
import ProfileCSS from '../components/modules/Profile.module.css'
import { Link } from 'react-router-dom';
import { Navbar } from './navbar'
import { useEffect, useState } from 'react';
import axios from 'axios';
import { SingleOrder } from './order';
import { useNavigate } from 'react-router-dom';

export const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const id = user ? user._id : ""
    const [orders, setorders] = useState([])
    const dispatch = useDispatch()
    const navigate = useNavigate();

    const role = user ? user.role : ""
    const isCustomer = role => {
        return role === "Customer";
    }
    async function getOrders(id) {
        try {
            const res = await axios.get(`http://localhost:8000/order/get/${id}`)
            console.log(res.data)
            setorders(res.data)
        } catch (error) {
            window.alert(error)
        }
    }

    useEffect(() => {
      if(id) {
        getOrders(id)
      }
    }, [])

    const handleCreateMenuItem = () => {
        navigate('/createMenuItem');
    };
      
    return (
        <div className={ProfileCSS.body}>
            <Navbar/>
            <div className={ProfileCSS.container}>
                <div className={ProfileCSS.profile}>
                    <h2>Profile</h2>
                    <div className={ProfileCSS.profile_details}>
                        <p><strong>Name:</strong> {user?.name}</p>
                        <p><strong>Username:</strong> {user?.username}</p>
                    </div>
                    {isCustomer(role) && <h3>My Orders</h3>}
                    <div className={ProfileCSS.orders}>
                        {isCustomer(role) && orders.map(order => <SingleOrder key={order} id={order}/>)}
                    </div>
                    {!isCustomer(role) && <button onClick={handleCreateMenuItem}>Create Menu Item</button>}
                </div>
            </div>
        </div>
    )
}
