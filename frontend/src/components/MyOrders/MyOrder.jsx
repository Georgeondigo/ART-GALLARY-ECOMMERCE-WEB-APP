import React, {  useContext, useEffect, useState } from 'react';
import './MyOrder.css';
import axios from 'axios';
import { ShopContext } from '../../Context/ShopContext';
import cross_icon from '../../components/Assets/parcel_icon.png'


const MyOrders = () => {
  const [data, setData] = useState([]);
  const { userId } = useContext(ShopContext);
  
  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5858/userorders",
          { userId },
          {
            headers: {
              'auth-token': localStorage.getItem('auth-token'),
              'Content-Type': 'application/json',
            }
          }
        );
        setData(response.data.data);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };
  
    if (userId) {
      fetchOrders();
    }
  }, [userId]); // Only userId is needed as a dependency
  

      const handleTrackOrder = () => {
        // Reload the page
        window.location.reload();
      }

  return (
    <div className='my-orders'>
      <h2>My Orders</h2>
      <div className="container">
        {data.map((order,index)=>{
          return (
            <div key={index} className='my-orders-order'>
                <img src={cross_icon} alt="parcel" />
                <p>{order.items.map((item,index)=>{
                  if (index === order.items.length-1) {
                    return item.name+" x "+item.quantity
                  }
                  else{
                    return item.name+" x "+item.quantity+", "
                  }
                  
                })}</p>
                <p>${order.amount}.00</p>
                <p>Items: {order.items.length}</p>
                <p>
  <span className={
    order.status === 'Order Processing' ? 'order-processing' :
    order.status === 'Out for delivery' ? 'out-for-delivery' :
    order.status === 'Delivered' ? 'delivered' : ''
  }>
    &#x25cf;
  </span> 

  <b>  {order.status}</b>
</p>
<button onClick={handleTrackOrder}>Track Order</button>
            </div>
          )
        })}
      </div>
    </div>
  )
}

export default MyOrders