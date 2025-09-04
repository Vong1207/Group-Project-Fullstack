import './Orders.css'
import axios from 'axios';

export default function Orders() {
    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/shipper/orders", { withCredentials: true });
            
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    return (
        <>
            <h1 className="mb-0 text-center mt-4">Orders</h1>

            <div id='ordersContainer' className='mt-4 p-3'>

            </div>
        </>
    )
}