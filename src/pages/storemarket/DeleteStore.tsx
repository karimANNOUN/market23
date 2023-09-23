import React from 'react'
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { setStore } from '../../sotre/CartSlice';
export const DeleteStore = ({prod}:any) => {
 
    const dispatch=useDispatch()
    const Token=Cookies.get('token')

    const handelDelete=async()=>{
      
        try{
          const response = await fetch(`${process.env.REACT_APP_HOST}/deleteproduct`,{
            method:'DELETE',
            credentials:"include",
            headers:{
              'Content-Type': 'application/json',
              authorization:`${Token}`
            },
            body:JSON.stringify({ prod: prod.product})
          })
          
          
        const data = await response.json();
        dispatch(setStore(data.allProducts))
    
         
        }catch(error){
          console.log(error)
        }
      }
    
  return (
    <Box key={prod.id} sx={{width:'80%',height:'10%',borderStyle:'solid',borderRadius:2,mt:2,display:'flex',flexDirection:'row'}} >
    <img src={prod.product.image} alt='kimou' style={{width:'15%',height:'100%'}} />
    <Box sx={{width:'85%',height:'100%'}}>
    <Box sx={{width:'100%',height:'50%',display:'flex',justifyContent:'space-between'}}>
        <Typography variant="h6" gutterBottom sx={{ml:2}} >{prod.product.name}</Typography>
        <Typography variant="h6" gutterBottom sx={{mr:2}} >{prod.product.price}$</Typography>
    </Box>
    <Box sx={{ width:'100%',height:'50%', display:'flex',justifyContent:'flex-end' }} >
    <Button variant="contained" color='error' sx={{width:'7%',height:'70%',mr:2}} onClick={handelDelete}   >Remove</Button>
    </Box>
    </Box>
</Box>
  )
}
