
import {  PayPalButtons } from "@paypal/react-paypal-js";
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { useNavigate } from "react-router-dom";

export const PayPayl = () => {

    const store = useSelector((state:any)=> state.app.store)
    const total = useSelector((state:any)=> state.app.total)
    const Token=Cookies.get('token')
   const navigate=useNavigate()

    const createOrder = (data:any) => {
        // Order is created on the server and the order id is returned
        return fetch(`${process.env.REACT_APP_HOST}/my-server/create-paypal-order`, {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
            authorization:`${Token}`
          },
          // use the "body" param to optionally pass additional order information
          // like product skus and quantities
          body: JSON.stringify({store,total}),
        })
        .then((response) => response.json())
        .then((order) => order.id);
      };
      const onApprove = async (data:any) => {
         // Order is captured on the server and the response is returned to the browser
         const response = await fetch(`${process.env.REACT_APP_HOST}/my-server/capture-paypal-order`, {
          method: "POST",
           headers: {
            "Content-Type": "application/json",
            authorization:`${Token}`
          },
          body: JSON.stringify({
            orderID: data.orderID
          })
        })
      
// eslint-disable-next-line
        const datas= await response.json()
       
       navigate('/dashboard')
       
      };
 
    
    
  return (
   
    <PayPalButtons 
     createOrder={(data) => createOrder(data)}
     onApprove={(data) => onApprove(data)}
    style={{ layout: "horizontal" }} />

  )
}
