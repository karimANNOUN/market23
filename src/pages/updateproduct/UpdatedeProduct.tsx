import React,{useState} from 'react'
import { Box } from '@mui/material'
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select, { SelectChangeEvent } from '@mui/material/Select';
import Cookies from 'js-cookie';
import axios from 'axios'
import { useDispatch } from "react-redux";
import { setAllProduct, setProduct } from '../../sotre/CartSlice';
import Modal from '@mui/material/Modal';

export const UpdatedeProduct = ({open,setOpen,prod}:any) => {
 
  const dispatch=useDispatch()
 
  const productCategories=[
    { id: 1, name: 'Electronics and Gadgets' },
  { id: 2, name: 'Fashion and Apparel' },
  { id: 3, name: 'Home and Furniture' },
  { id: 4, name: 'Health and Beauty' },
  { id: 5, name: 'Toys and Games' },
  { id: 6, name: 'Books and Educational Materials' },
  { id: 7, name: 'Sports and Fitness' },
  { id: 8, name: 'Food and Beverages' },
  { id: 9, name: 'Art and Collectibles' },
  { id: 10, name: 'Automotive and Tools' },
  { id: 11, name: 'Pet Supplies' },
  { id: 12, name: 'Travel and Luggage' },
  { id: 13, name: 'Jewelry and Watches' },
  { id: 14, name: 'Home Improvement and Garden' },
  { id: 15, name: 'Electrical and Industrial' },
  { id: 16, name: 'Baby and Maternity' },
  { id: 17, name: 'Music and Instruments' },
  { id: 18, name: 'Software and Digital Products' },
  { id: 19, name: 'Office Supplies' },
  { id: 20, name: 'Handmade and Crafted' },
  { id: 21, name: 'Specialty and Niche' },
  { id: 22, name: 'Services' }
  ]

  const [category, setCategory] = React.useState('');
  const [name,setName]=useState("")
  const [price,setPrice]=useState<number | string>(Number)
  const [quantity,setQuantity]=useState<number | string>(Number)
  const [file, setFile] = React.useState<File | null>();

  const handleChange = (event: SelectChangeEvent) => {
    setCategory(event.target.value as string);
  };

  const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFile(e.target.files?.[0] || null  )
  };

  const Token=Cookies.get('token')

  const handelProduct=async()=>{
    const formData : any = new FormData();
      formData.append('file', file);
      formData.append('name', name);
      formData.append('price', price);
      formData.append('quantity', quantity);
      formData.append('category', category);
      formData.append('prodId',prod.id);
      try{
      if (file !== null && category !== "" && name !== "" && price !== "" && quantity !== "" ) {
        axios.put(`${process.env.REACT_APP_HOST}/updated`,formData, {
          withCredentials:true,
          headers:{authorization:`${Token}`}
          
          
        }) 
        .then(res=> dispatch(setAllProduct(res.data.allProducts)) && dispatch(setProduct(res.data.allProduct)) )
        .catch(err=>console.log(err))  
      }
       
       
      }catch(error){
        console.log(error)
      }

   setOpen(false)
   
    }
    const style = {
      position: 'absolute' as 'absolute',
      top: '50%',
      left: '50%',
      transform: 'translate(-50%, -50%)',
      width: '60%',
      height:'90%',
      bgcolor: 'background.paper',
      border: '2px solid #000',
      boxShadow: 24,
      p: 4,
    };
    const handleClose = () => setOpen(false);
    
  return (
    
     <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style} >
    <Box sx={{height:'100%',display:'flex',flexDirection:'row'}} >
    <Box sx={{height:'100%',width:{xs:'100%',md:'50%'}  }} >
  <Box sx={{width:'100%',height:'50%'}} >
    <TextField
          label="Product Name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '85%',mt:14 }}
          type='text'
          
          onChange={e=>setName(e.target.value)} 
          
          required
        />

<TextField
          label="Price"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '85%' }}
          type='number'
          
          onChange={e=>setPrice(e.target.value)} 
          
          required
        />

<TextField
          label="Quantity"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '85%' }}
          type='number'
         
          onChange={e=>setQuantity(e.target.value)} 
          
          required
        />
         <TextField
         
          sx={{ m: 1, width: '85%' }}
          type='file'
          onChange={handleChangeImage}
          required
        />
        <FormControl sx={{mx:'auto',mt:1, width: '85%'}} >
  <InputLabel  id="demo-simple-select-label">Category</InputLabel>
  <Select
    labelId="demo-simple-select-label"
    id="demo-simple-select"
    value={category}
    label="Age"
    onChange={handleChange}
    
  >
    {productCategories.map(categ=><MenuItem key={categ.id} value={categ.name}>{categ.name}</MenuItem>) }
  </Select>
</FormControl>

<Button variant="contained" color='success' onClick={handelProduct} sx={{mt:2,display:'block',mx:'auto'}} >update Product</Button>

</Box>

    </Box>
    <Box sx={{height:'100%',width:'50%' ,display:{xs:"none",md:"flex"} }}>
  <img src={prod.image} alt='kibou' style={{width:'100%',height:'100%'}} />
    </Box>

    </Box>
    </Box>
    </Modal>
    
  )
}
