import { useEffect  } from 'react';
import { Header } from '../../components/layout/Header'
import Box from '@mui/material/Box';
import Avatar from '@mui/material/Avatar';
import { Typography } from '@mui/material';
import LocalGroceryStoreIcon from '@mui/icons-material/LocalGroceryStore';
import { CardUser } from '../../components/card/CardUser';
import Badge from '@mui/material/Badge';
import IconButton from '@mui/material/IconButton';
import { useNavigate } from 'react-router-dom';
import { useSelector } from "react-redux";
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { setProduct } from '../../sotre/CartSlice';





export const Profil = () => {

const dispatch=useDispatch()
const Token=Cookies.get('token')

// const [product,setProduct]: any []=useState([])

  const user = useSelector((state:any)=> state.app.authUser)
  const store = useSelector((state:any)=> state.app.store)
       
  useEffect(()=>{
  
    async function getProductUser() {
      
      const response = await fetch(`${process.env.REACT_APP_HOST}/productuser`,{
        credentials:"include",
        headers:{authorization:`${Token}`}
      })
      
      
    const data = await response.json();
   
    
   
    dispatch(setProduct(data.allProducts))
   
  }
  getProductUser()
  
  
  // eslint-disable-next-line      
  },[])
  

  const product = useSelector((state:any)=> state.app.product)

      


const navigate=useNavigate()


  return (
    <>
     <Header/>
     <Box sx={{height:'100vh',mt:8}} >
        <Box sx={{ display:'flex',height:'19%',justifyContent:'space-around'}} >
            <Box sx={{ display:'flex',height:'100%',mt:2}} >
        <Avatar
        alt="Remy Sharp"
        src={user.image}
        sx={{ width: 160, height: 160 ,position:'static' }}
      />

      <Typography variant="h6" gutterBottom sx={{ml:2,mt:4}} >{user.userName}</Typography>
      </Box>
      <Box sx={{height:'100%'}} >
      <IconButton onClick={()=>navigate('/store')} sx={{height:'100%',alignItems:'center'}} aria-label="add to shopping cart">
      <Badge badgeContent={store.length} color="error">
      <LocalGroceryStoreIcon sx={{ fontSize: 40  }} />
      </Badge>
      </IconButton>
      
      </Box>

        </Box>
        <Typography variant="h5" gutterBottom sx={{my:2 ,textAlign:'center',textDecoration:'underline',mt:7 }} >Product Buy</Typography>
        <Box sx={{height:'100%',display:'flex',flexWrap:'wrap',justifyContent:'center'}} >
            { !product ? [] : product.map((prod:any)=><CardUser key={prod.id} prod={prod} />)}
        </Box>
    
    </Box>   
    </>
  )
}
