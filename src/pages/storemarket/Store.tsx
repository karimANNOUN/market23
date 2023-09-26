import React ,{useEffect} from 'react'
import { Header } from '../../components/layout/Header'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { PaymentCard } from '../../components/card/PaymentCard';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setStore, setTotal } from '../../sotre/CartSlice';
import { DeleteStore } from './DeleteStore';
import { PayPayl } from '../../components/card/PayPayl';
import { PayPalScriptProvider} from "@paypal/react-paypal-js";




export const Store = () => {
    const navigate=useNavigate()
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const dispatch=useDispatch()
    const Token=Cookies.get('token')

    useEffect(()=>{
        async function getStore() {
          
            const response = await fetch(`${process.env.REACT_APP_HOST}/getstore`,{
              credentials:"include",
              headers:{authorization:`${Token}`}
            })
            
            
          const data = await response.json();
          dispatch(setStore(data.allProducts))
         
        }
        getStore()
      
      
       // eslint-disable-next-line     
      },[])

      const store = useSelector((state:any)=> state.app.store)
   
      

      const totalPrice = store.reduce((accumulator:any, product:any) => {
        return accumulator + product.product.price;
      }, 0);

      dispatch(setTotal(totalPrice))

      const total = useSelector((state:any)=> state.app.total)

      
      const initialOptions = {
        clientId:`Ad-Y6b0hsigUuohl-t0oFegFbeslLkprZ3HAGBrf_FZfsjCjEkNPqpSDUrR-WXVxZDyrWlvCd55nSvtH`,
        currency: "USD",
        intent: "capture",
    };
    
      
       

  return (
    <>
   
   <Header/>
   <Box sx={{height:'100vh',mt:8}}>
   <Box sx={{height:'100%',width:'100%',display:'flex',alignItems:'center',flexDirection:'column'}}>
    <Box sx={{width:'100%',height:'25%',backgroundImage:`url(${'https://cdn.londonandpartners.com/3/ad0f268/YXBwLnNoYXJpbnBpeC5jb20vaW1hZ2VfZXh0ZXJuYWxfdXJscy9mODA0NDAwYS00MWQ5LTRjMzEtYWU2Yi1iM2I2ZWE2ODBjMjM/f804400a-41d9-4c31-ae6b-b3b6ea680c23.jpg'})`}} >
    <Typography variant="h4" color='white' gutterBottom sx={{ml:2,mt:4}} >Total Price : {total}$ </Typography>
    { store.length ? <Button variant="contained" color='success' onClick={handleOpen}   >Buy Now</Button> : <Button  variant="contained" color='success' onClick={()=>navigate('/')}  >Add Product</Button> }
   
    </Box>
    {store.map((prod:any)=><DeleteStore key={prod.id} prod={prod} />)} 

    <Box sx={{width:'39%',mt:2}} >
    <PayPalScriptProvider options={initialOptions} >
    { store.find((str:any)=>str.product.quantity === 0 ) ? "" : (store.length ?  <PayPayl  /> : "")}
    </PayPalScriptProvider>
    </Box>

   </Box>
  
  
  
   
   </Box>  
      
<PaymentCard open={open} setOpen={setOpen} />


    </>
  )
}
