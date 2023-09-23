import React,{useState} from 'react'
import Card from '@mui/joy/Card';
import CardActions from '@mui/joy/CardActions';
import CardContent from '@mui/joy/CardContent';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Button from '@mui/joy/Button';
import InfoOutlined from '@mui/icons-material/InfoOutlined';
import CreditCardIcon from '@mui/icons-material/CreditCard';
import Box from '@mui/material/Box';
import Cookies from 'js-cookie';
import { useDispatch,useSelector } from "react-redux";


import Modal from '@mui/material/Modal';
import { setPayment } from '../../sotre/CartSlice';
import { useNavigate } from 'react-router-dom';
export const PaymentCard = ({open,setOpen}:any) => {

  const Token=Cookies.get('token')
  const dispatch=useDispatch()
  const navigate=useNavigate()
const [cvc,setCvc]=useState("")
const [cardNumber,setCardNumber]=useState("")
const [expire,setExpire]=useState("")
const [cardName,setCardName]=useState("")
const total = useSelector((state:any)=> state.app.total)
const store = useSelector((state:any)=> state.app.store)


    const handleClose = () => setOpen(false);

    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
     //   width: 400,
        bgcolor: 'background.paper',
        border: '2px solid #000',
        boxShadow: 24,
        p: 4,
      };

      const outStock=store.find((str:any)=> str.product.quantity === 0 )

    
     

      const handelPayment=async()=>{

       
      
          try{
        
         
            const response = await fetch(`${process.env.REACT_APP_HOST}/payment`,{
              method:'POST',
              credentials:"include",
              headers:{
                'Content-Type': 'application/json',
                authorization:`${Token}`
              },
              body:JSON.stringify({ cardName,cardNumber,expire,cvc,total,store })
            })
            
            
          const data = await response.json();
          dispatch(setPayment(data.payments))
          setOpen(false)
        navigate("/dashboard")
      
           
          }catch(error){
            console.log(error)
          }
        
       }


  return (
    <Modal
    open={open}
    onClose={handleClose}
    aria-labelledby="modal-modal-title"
    aria-describedby="modal-modal-description"
  >
    <Box sx={style}>
    <Card
      variant="outlined"
      sx={{
        maxHeight: 'max-content',
        maxWidth: '100%',
        mx: 'auto',
        // to make the demo resizable
        overflow: 'auto',
        resize: 'horizontal',
      }}
    >
      <Typography level="title-lg" startDecorator={<InfoOutlined />}>
        Add new card
      </Typography>
      <Divider inset="none" />
      <CardContent
        sx={{
          display: 'grid',
          gridTemplateColumns: 'repeat(2, minmax(80px, 1fr))',
          gap: 1.5,
        }}
      >
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card number</FormLabel>
          <Input endDecorator={<CreditCardIcon />} type='number' onChange={e=>setCardNumber(e.target.value)} required />
        </FormControl>
        <FormControl>
          <FormLabel>Expiry date</FormLabel>
          <Input endDecorator={<CreditCardIcon />} type='date' onChange={e=> setExpire(e.target.value)} required />
        </FormControl>
        <FormControl>
          <FormLabel>CVC/CVV</FormLabel>
          <Input endDecorator={<InfoOutlined />} type='number' onChange={e=>setCvc(e.target.value)} required />
        </FormControl>
        <FormControl sx={{ gridColumn: '1/-1' }}>
          <FormLabel>Card holder name</FormLabel>
          <Input placeholder="Enter cardholder's full name" type='text' onChange={e=>setCardName(e.target.value)} required  />
        </FormControl>
        <Checkbox label="Save card" sx={{ gridColumn: '1/-1', my: 1 }} />
        <CardActions sx={{ gridColumn: '1/-1' }}>
         { outStock ? <Button disabled variant="solid" color="primary">
            product out stock
          </Button> : <Button onClick={handelPayment} variant="solid" color="primary">
            Add card
          </Button>
}
        </CardActions>
      </CardContent>
    </Card>
    </Box>
      </Modal>
  )
}
