import React ,{ useEffect, useState } from 'react'
import { Header } from '../../components/layout/Header'
import { Box } from '@mui/joy'
import Cookies from 'js-cookie';
import { useParams } from 'react-router-dom';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import axios from 'axios'
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import {  setStore } from '../../sotre/CartSlice';
import { UpdatedeProduct } from '../updateproduct/UpdatedeProduct';
import { ImageModifier } from '../../components/image/ImageModifier';



type User={
  id:number,
  email:string,
  userName:string,
  password:string,
  image:null|string

}

type products={
  id: number,
  name: number,
  date: Date,
  quantity: string | number ,
  category: string,
  image: string,
  price: string
  user:User
}

export const PersonalProduct = () => {
  const Token=Cookies.get('token')
  const params=useParams()
  const dispatch=useDispatch()
  const [prod,setProd]=useState({} as products )
  const [loading, setLoading] = useState(true);
  
  const store = useSelector((state:any)=> state.app.store)
  const [ isinTheCard ,setIsInTheCard]=useState(false);

  useEffect(()=>{
    
    async function getProduct() {
      
      const response = await fetch(`${process.env.REACT_APP_HOST}/product/${params.id}`,{
        credentials:"include",
        headers:{authorization:`${Token}`}
      })
      
      
    const data = await response.json();
    
   
    setProd(data.product)
    setLoading(false);
    
  }
  getProduct()

  const isInCart= store.find((cartItem:any)=> cartItem.product.id === prod.id)
  if (isInCart) {
      setIsInTheCard(true)
  }else{
      setIsInTheCard(false)
  }
  
  
// eslint-disable-next-line    
  },[params.id,store,prod.id])

  

  const handelProduct=async()=>{
      try{
        axios.post(`${process.env.REACT_APP_HOST}/storeproduct`,prod, {
          withCredentials:true,
          headers:{authorization:`${Token}`}
        }) 
        .then(res=> dispatch(setStore(res.data.allProducts)))
        .catch(err=>console.log(err))
      }catch(error){
        console.log(error)
      }
   }

  const handelDelete=async()=>{
    try{
      const response = await fetch(`${process.env.REACT_APP_HOST}/deleteproduct`,{
        method:'DELETE',
        credentials:"include",
        headers:{
          'Content-Type': 'application/json',
          authorization:`${Token}`
        },
        body:JSON.stringify({prod})
      })
      
      
    const data = await response.json();
    dispatch(setStore(data.allProducts))

     
    }catch(error){
      console.log(error)
    }
  }


  const user = useSelector((state:any)=> state.app.authUser)
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);


  return (
    <>
 
    <Header/>
    { loading ? (
        <Typography variant="subtitle2" display="block" gutterBottom >Loading...</Typography>
      ) :
    (<Box sx={{height:'100vh',display:'flex',flexDirection:{xs:'column',sm:'row'},mt:8}} >
      <Box sx={{width:{xs:'100%',sm:'40%'},height:{xs:'50%',sm:'100%'},display:'flex',justifyContent:'flex-end',alignItems:'center'}}  >
       <ImageModifier width={"100%"} height={"100%"} src={prod.image}  />
      </Box>
      <Box sx={{width:{xs:'100%',sm:'60%'},height:{xs:'50%',sm:'100%'},display:'flex',alignItems:'center'}} >
        <Box sx={{textAlign:'left',ml:3,width:'100%',height:'70%'}} >
      <Typography variant="h4" sx={{my:3}} display="block" gutterBottom>
       Name:  {prod.name}
      </Typography>
      <Typography variant="h6" sx={{mb:3}} display="block" gutterBottom>
       Category:  {prod.category}
      </Typography>
      
      { prod.quantity === 0 ?   
    <Paper
    elevation={3} // Add an elevation for a subtle shadow
    sx={{
      border: '2px solid #3f51b5',
      width:170,
      borderRadius: '8px', // Border radius
      padding: '8px',
      color:'red',
      mb:3 // Add padding for spacing
    }}
  >
   Out Of Stock
  </Paper> 
  :
  <Paper
      elevation={3} // Add an elevation for a subtle shadow
      sx={{
        border: '2px solid #3f51b5',
        width:170,
        borderRadius: '8px', // Border radius
        padding: '8px',
        color:'green',
        mb:3 // Add padding for spacing
      }}
    >
     only in stock :{prod.quantity} piece 
    </Paper>
    }
      <Typography sx={{mb:3}} variant="subtitle2" display="block" gutterBottom> 
       Price:{prod.price}$
      </Typography>
     
      { prod.user.id === user.id ? <Button variant="contained" color="success" onClick={handleOpen}  >update your product</Button>  :(prod.quantity === 0 ? <Button  disabled variant="contained"  color="primary" >Out Stock</Button>  : 
      
      (isinTheCard ?
      <Button variant="contained" color="error" onClick={handelDelete} >
        Remove
      </Button> :
      <Button variant="contained" color="primary" onClick={handelProduct} >
      Add To Cart
    </Button>)) 

}
  

      </Box>
      
     
      </Box>
<UpdatedeProduct open={open} setOpen={setOpen} prod={prod} />
    </Box>)} 
    </>
  
)}
