import './Orders.css'
import axios from 'axios';
import { useState, useEffect, use } from 'react';

export default function Orders() {
    const [orders, setOrders] = useState([]);

    const fetchOrders = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/shipper/orders", { withCredentials: true });
            const orders = response.data.orders;
            setOrders(orders);
            console.log(orders);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    }

    useEffect(() => {
        fetchOrders();
    }, []);

    return (
        <>
            <h1 className="mb-0 text-center mt-4">Orders</h1>

            <div id='ordersContainer' className='mt-4 p-2 row mx-0 gy-3'>
                {orders.map(order => (
                    <div key={order._id} className='col-12 px-2'>
                        <div className='orderCard p-3'>
                            <p className='mb-0 orderStatus px-3 py-1 fw-bold'>{order.status}</p>

                            <div className='orderInfo my-3'>
                                <p className='mb-1'><i className='bi bi-person orderInfoIcon me-3'></i>{order.customer.displayName}</p>
                                
                                <div className='orderAddressContainer d-flex'>
                                    <i className='bi bi-geo-alt orderInfoIcon me-3'></i>
                                    <p className='mb-1'>{order.customer.customerAddress}</p>
                                </div>

                                <div className='orderProductsContainer d-flex'>
                                    <i className='bi bi-bag orderInfoIcon me-3'></i>
                                    <div className='orderProductContent flex-fill'>
                                        {order.cart.map(item => (
                                            <div key={item._id} className='d-flex justify-content-between w-100'>
                                                <p key={item._id} className='mb-1 orderProductName'>{item.product.productName}</p>
                                                <p className='orderProductQuantity text-muted mb-1'>x{item.quantity}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                            
                            <div className='orderTotalContainer text-end mb-4'>
                                <p className='mb-0'>Total: {order.totalPrice.toLocaleString()}₫</p>
                            </div>

                            <button className='acceptOrderBtn fw-bold' type='button'>Accept</button>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}