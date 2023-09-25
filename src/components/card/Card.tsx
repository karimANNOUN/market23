import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Cart from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import CardOverflow from '@mui/joy/CardOverflow';
import Chip from '@mui/joy/Chip';
import Link from '@mui/joy/Link';
import Typography from '@mui/joy/Typography';
import ArrowOutwardIcon from '@mui/icons-material/ArrowOutward';
import Cookies from 'js-cookie';
import axios from 'axios'
import { useDispatch } from "react-redux";
import { useSelector } from 'react-redux'
import {  setStore } from '../../sotre/CartSlice';
import { useEffect, useState } from 'react';
import { UpdatedeProduct } from '../../pages/updateproduct/UpdatedeProduct';

export const Card = ({prod}:any ) => {

  const dispatch=useDispatch()
  const Token=Cookies.get('token')

  const store = useSelector((state:any)=> state.app.store)
  const user = useSelector((state:any)=> state.app.authUser)
  const [ isinTheCard ,setIsInTheCard]=useState(false);
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


  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
 




useEffect(()=>{
  const isInCart= store.find((cartItem:any)=> cartItem.product.id === prod.id)
  if (isInCart) {
      setIsInTheCard(true)
  }else{
      setIsInTheCard(false)
  }
 
},[store,prod.id])




  return (
    <Cart sx={{ width: 320, maxWidth: '100%',height:400, boxShadow: 'lg',my:2,mx:1,bgcolor:'whitesmoke' }}>
      <CardOverflow>
        <AspectRatio sx={{ minWidth: 200 }}>
          <img
            src={prod.image}
            srcSet={prod.image}
            loading="lazy"
            alt=""
          />
        </AspectRatio>
      </CardOverflow>
      <CardContent>
        <Typography level="body-xs">{prod.category}</Typography>
        <Link
          href={`/product/${prod.id}`}
          fontWeight="md"
          color="neutral"
          textColor="text.primary"
          overlay
          endDecorator={<ArrowOutwardIcon />}
        >
          {prod.name}
        </Link>

        <Typography
          level="title-lg"
          sx={{ mt: 1, fontWeight: 'xl' }}
          endDecorator={
            <Chip component="span" size="sm" variant="soft" color="success">
              Lowest price
            </Chip>
          }
        >
          {prod.price} $
        </Typography>
        <Typography level="body-sm">
          (Only <b>{prod.quantity}</b> left in stock!)
        </Typography>
      </CardContent>
      <CardOverflow>
       {  user.id === prod.user.id ? <Button onClick={handleOpen}  variant="solid" color='success' size="lg">Update Your Product</Button>  : (prod.quantity === 0 ? <Button  disabled variant="solid" color="primary" size="lg">Out Stock</Button> :   (isinTheCard ? <Button onClick={handelDelete} variant="solid" color="danger" size="lg">Remove</Button> : <Button onClick={handelProduct} variant="solid" color="primary" size="lg">Add to cart</Button>))}
         
      </CardOverflow>
      <UpdatedeProduct open={open} setOpen={setOpen} prod={prod} />
    </Cart>
  )
}
