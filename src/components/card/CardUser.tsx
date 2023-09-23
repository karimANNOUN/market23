import React from 'react'
import AspectRatio from '@mui/joy/AspectRatio';
import Button from '@mui/joy/Button';
import Card from '@mui/joy/Card';
import CardContent from '@mui/joy/CardContent';
import IconButton from '@mui/joy/IconButton';
import Typography from '@mui/joy/Typography';
import BookmarkAdd from '@mui/icons-material/BookmarkAddOutlined';
import Cookies from 'js-cookie';
import { useDispatch } from "react-redux";
import { setProduct } from '../../sotre/CartSlice';
import { UpdatedeProduct } from '../../pages/updateproduct/UpdatedeProduct';

export const CardUser = ({prod}:any) => {


  const dispatch=useDispatch()
  const Token=Cookies.get('token')
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handelDelete=async()=>{
    
      try{
        const response = await fetch(`${process.env.REACT_APP_HOST}/deletepersonel`,{
          method:'DELETE',
          credentials:"include",
          headers:{
            'Content-Type': 'application/json',
            authorization:`${Token}`
          },
          body:JSON.stringify({ prod})
        })
        
        
      const data = await response.json();
      dispatch(setProduct(data.allProducts))
   //   dispatch(setStore(data.allProducts))
  
       
      }catch(error){
        console.log(error)
      }
    }


  return (
   
    <Card variant="outlined" sx={{ width: 320,height:420 ,mr:2,mb:2 }}>
      <div>
        <Typography level="title-lg">{prod.name}</Typography>
        <Typography level="body-sm">{prod.date}</Typography>
        <IconButton
        onClick={handleOpen}
          aria-label="bookmark Bahamas Islands"
          variant="plain"
          color="neutral"
          size="sm"
          sx={{ position: 'absolute', top: '0.875rem', right: '0.5rem' }}
        >
          <BookmarkAdd />
        </IconButton>
      </div>
      <AspectRatio minHeight="120px" maxHeight="200px">
        <img
          src={prod.image}
          srcSet={prod.image}
          loading="lazy"
          alt=""
        />
      </AspectRatio>
      <CardContent orientation="horizontal">
        <div>
          <Typography level="body-xs">Total price:</Typography>
          <Typography fontSize="lg" fontWeight="lg">
            ${prod.price}
          </Typography>
        </div>
        <Button
        onClick={handelDelete}
          variant="solid"
          size="md"
          color="danger"
          aria-label="Explore Bahamas Islands"
          sx={{ ml: 'auto', alignSelf: 'center', fontWeight: 600 }}
        >
          Delete Product
        </Button>
      </CardContent>
      <UpdatedeProduct open={open} setOpen={setOpen} prod={prod} />
    </Card>
  )
}
