import { useEffect } from 'react';
import { Header } from '../../components/layout/Header'
import Box from '@mui/material/Box';
import { Card } from '../../components/card/Card';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { useSelector } from "react-redux";
import { setAllProduct, setAuthUser } from '../../sotre/CartSlice';




export const Home = () => {

  const dispatch=useDispatch()







const Token=Cookies.get('token')

useEffect(()=>{
  async function getUser() {
    
      const response = await fetch(`${process.env.REACT_APP_HOST}/user`,{
        credentials:"include",
        headers:{authorization:`${Token}`}
      })
      
      
    const data = await response.json();
    dispatch(setAuthUser(data.user.user))
   
  }
  getUser()

  async function getProducts() {
    
    const response = await fetch(`${process.env.REACT_APP_HOST}/allproducts`,{
      credentials:"include",
      headers:{authorization:`${Token}`}
    })
    
    
  const data = await response.json();
 
  dispatch(setAllProduct(data.allProducts))
  
}
getProducts()


// eslint-disable-next-line      
},[])

const products = useSelector((state:any)=> state.app.allProduct)

  return (
    <>
    <Header/>
    <Box sx={{height:'100vh',display:'flex',mt:8,flexWrap:'wrap',justifyContent:'center'}} >
      { !products.length ? [] : products.map((prod : any )=> <Card key={prod.id} prod={prod} /> ) } 
    </Box>
    </>
  )
}
