import {useEffect} from 'react'
import { Header } from '../../components/layout/Header'
import { Box } from '@mui/material'
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { setPayment } from '../../sotre/CartSlice';
import { useDispatch, useSelector } from 'react-redux';
import { createTheme, responsiveFontSizes,ThemeProvider } from '@mui/material/styles';

export const Dashboard = () => {
    const navigate=useNavigate()
    const Token=Cookies.get('token')
    const dispatch=useDispatch()


    let theme = createTheme({
      typography: {
        // Tell Material UI what the font-size on the html element is.
        htmlFontSize: 18,
      },
    });
    
theme = responsiveFontSizes(theme);




    useEffect(()=>{
      async function getPayment() {
        
          const response = await fetch(`${process.env.REACT_APP_HOST}/getpayment`,{
            credentials:"include",
            headers:{authorization:`${Token}`}
          })
          
          
        const data = await response.json();
       
        dispatch(setPayment(data.payment))
       
      }
      getPayment()
    
    
  // eslint-disable-next-line
    },[])

    const payment = useSelector((state:any)=> state.app.payment)


  return (
    <>
    <Header/>
    <ThemeProvider theme={theme}>
    <Box sx={{width:'100%',height:'100vh',mt:7}} >
        <Box sx={{height:'40%',bgcolor:'#9e9e9e',display:'flex',justifyContent:'space-between'}} >
            <Box sx={{width:'30%'}}>
            
        <Typography  variant="h4"   sx={{color:'white',textAlign:'left',mt:5,ml:2}} gutterBottom>
        Welcom To Your Store Price
      </Typography>
      <Typography sx={{color:'white',textAlign:'left',ml:2}} variant="subtitle2" gutterBottom>
        This is the Best MarketPlace in The World | Find your best Quality | Fashion & Sport 
      </Typography>
     
      <Button onClick={()=>navigate('/')} variant="contained" sx={{display:'flex',justifyContent:'flex-start',bgcolor:'#00897b',ml:2}} color="success">
        Home
      </Button>
      </Box>
      <Box sx={{width:{xs:'50%',md:'30%'},display:'flex',justifyContent:{xs:'flex-end' ,md:'center'},mr:{xs:3,md:0},alignItems:'center'}} >
            <img src='https://i.pinimg.com/564x/a0/c6/36/a0c636a27031d0529580ea41bbb7e4f3.jpg' alt='fashion' style={{width:'50%',height:'90%',borderRadius:'6px'}} />
      </Box >
     
        </Box>
        <Box sx={{height:'60%'}} >
        <Typography  sx={{fontSize:'bold',fontFamily:'cursive',textDecorationLine:'underline',my:2}} variant="h6" gutterBottom>
        Trusted By The Best Product
      </Typography>
      <Box sx={{width:'100%',display:'flex',flexDirection:{xs:'column',md:'row'},height:'100%'}} >
      <Box sx={{width:{xs:'100%',md:'50%'},height:{xs:'80%',md:'15%'},display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}}>
        {payment.map((pay:any)=>
      <Paper key={pay.id} elevation={8} sx={{width:{ xs:'90%' ,md:'70%'},height:{ xs:'15%' ,md:'40%'},display:'flex',justifyContent:'space-around',mb:2,color:'white',bgcolor:'#a1887f',alignItems:'center'}} >
       
      <Typography sx={{fontSize:'bold'}} variant="h6" gutterBottom>
        Command confirmed : {pay.totalPrice} $
      </Typography>
      <Typography sx={{fontSize:'bold'}}  variant="caption" display="block" gutterBottom>
        at {pay.date}
      </Typography>
      
      </Paper>
)}
      </Box>
      <Box sx={{width:{xs:'100%',md:'50%'},display:'flex',justifyContent:'center',alignItems:'center'}} >
      <Typography sx={{fontSize:'bold',fontFamily:'cursive'}} variant="h6" gutterBottom>
        Find All wWhat You Want
      </Typography>
              <img style={{width:'40%',height:'60%'}} onClick={()=>navigate('/')} src='https://i.pinimg.com/564x/65/71/03/6571032d350c8115be44703e6c94613b.jpg' alt='jijou' />
      </Box>
      </Box>
            
        </Box>

    </Box>
    </ThemeProvider>
   
    </>
  )
}
