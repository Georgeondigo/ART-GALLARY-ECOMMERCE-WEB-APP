import axios from 'axios';
import React, {  useEffect } from 'react'
import { useNavigate, useSearchParams } from 'react-router-dom'
import './Verify.css'

const Verify = () => {
 
  const [searchParams, setSearchParams] = useSearchParams();
  const success = searchParams.get("success")
  const orderId = searchParams.get("orderId")

  const navigate = useNavigate();

  const verifyPayment = async () => {
    const response = await axios.post("http://localhost:5858/verifyorder", { success, orderId });
    if (response.data.success) {
      navigate("/myorders");
    }
    else {
      navigate("/")
    }
  }

  useEffect(() => {
    verifyPayment();
  }, [])

  return (
    <div className='verify'>
      <div className="spinner"></div>
    </div>
  )
}

export default Verify
