import { useEffect, useState } from 'react'
import ProfileCSS from '../components/modules/Profile.module.css'
import axios from 'axios'
import { Link } from 'react-router-dom'

export const SingleOrder = (props) => {
    const [singleOrder, setsingleOrder] = useState(null)

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
    
    return (
        <div className={ProfileCSS.order_card}>
            <div className={ProfileCSS.order_details}>
                <p><strong>Items:</strong></p>
                {singleOrder && singleOrder.items_ordered.map(item => <p key={item}>{item} x {Number(singleOrder.quantity_ordered[returnIndex(singleOrder.items_ordered,item)])}</p>)}
                <p><strong>Total Price:</strong> ${singleOrder && Number(singleOrder.total_price)}</p>
                <Link to={`/order/${props.id}`}><p><strong>Status:</strong> {singleOrder && singleOrder.status}</p></Link>
            </div>
        </div>
    )
}
