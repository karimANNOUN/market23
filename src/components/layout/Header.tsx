import React,{useState} from 'react'
import { styled, alpha } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import InputBase from '@mui/material/InputBase';
import MenuItem from '@mui/material/MenuItem';
import Menu from '@mui/material/Menu';
import SearchIcon from '@mui/icons-material/Search';
import AccountCircle from '@mui/icons-material/AccountCircle';
import MoreIcon from '@mui/icons-material/MoreVert';
import StorefrontTwoToneIcon from '@mui/icons-material/StorefrontTwoTone';
import PaymentIcon from '@mui/icons-material/Payment';
import {useNavigate} from 'react-router-dom'
import { Link } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import Cookies from 'js-cookie';
import DriveFileMoveIcon from '@mui/icons-material/DriveFileMove';
import { useSelector } from "react-redux";
import { SearchBox } from '../search/SearchBox';



const Search = styled('div')(({ theme }) => ({
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: alpha(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: alpha(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  }));
  
  const SearchIconWrapper = styled('div')(({ theme }) => ({
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  }));
  
  const StyledInputBase = styled(InputBase)(({ theme }) => ({
    color: 'inherit',
    '& .MuiInputBase-input': {
      padding: theme.spacing(1, 1, 1, 0),
      // vertical padding + font size from searchIcon
      paddingLeft: `calc(1em + ${theme.spacing(4)})`,
      transition: theme.transitions.create('width'),
      width: '100%',
      [theme.breakpoints.up('md')]: {
        width: '20ch',
      },
    },
  }));


export const Header = () => {

const navigate=useNavigate()
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [mobileMoreAnchorEl, setMobileMoreAnchorEl] =
      React.useState<null | HTMLElement>(null);
  
    const isMenuOpen = Boolean(anchorEl);
    const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);
  
    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMobileMenuClose = () => {
      setMobileMoreAnchorEl(null);
    };
  
    const handleMenuClose = () => {
        
      setAnchorEl(null);
      handleMobileMenuClose();
    };
  
    const handleMobileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
      setMobileMoreAnchorEl(event.currentTarget);
    };

    const handelDeconnect=()=>{
      Cookies.remove('token')
      navigate('/login')
    }
  
    const menuId = 'primary-search-account-menu';
    const renderMenu = (
      <Menu
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={menuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMenuOpen}
        onClose={handleMenuClose}
      >
        <MenuItem onClick={handleMenuClose}> <AccountCircle /> <Link href='/profil' sx={{textDecoration:'none',color:'black',ml:1}} > Profile</Link></MenuItem>
        <MenuItem onClick={handleMenuClose}><PaymentIcon /><Link href='/dashboard' sx={{textDecoration:'none',color:'black',ml:1}} >Payment</Link></MenuItem>
        <MenuItem onClick={handleMenuClose}><AddCircleIcon /><Link href='/newproduct' sx={{textDecoration:'none',color:'black',ml:1}} >Add Product</Link></MenuItem>
        <MenuItem onClick={handelDeconnect}><DriveFileMoveIcon sx={{mr:1}} />Deconnect</MenuItem>
      </Menu>
    );
  
    const mobileMenuId = 'primary-search-account-menu-mobile';
    const renderMobileMenu = (
      <Menu
        anchorEl={mobileMoreAnchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        id={mobileMenuId}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={isMobileMenuOpen}
        onClose={handleMobileMenuClose}
      >
        
        <MenuItem onClick={handleProfileMenuOpen}>
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
          <Link href='/profil' sx={{textDecoration:'none',color:'black'}} >Profile</Link>
        </MenuItem>
        <MenuItem >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <PaymentIcon />
          </IconButton>
          <Link href='/dashboard' sx={{textDecoration:'none',color:'black'}} >Payment</Link>
        </MenuItem>
        <MenuItem >
          <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <AddCircleIcon />
          </IconButton>
          <Link href='/newproduct' sx={{textDecoration:'none',color:'black'}} >New Product</Link>
        </MenuItem>
        <MenuItem onClick={handelDeconnect} >
        <IconButton
            size="large"
            aria-label="account of current user"
            aria-controls="primary-search-account-menu"
            aria-haspopup="true"
            color="inherit"
          >
            <DriveFileMoveIcon />
          </IconButton>
         Deconnect
        </MenuItem>
      </Menu>
    );
const [input,setInput]=useState("")
const products = useSelector((state:any)=> state.app.allProduct)

   
    
         const result = products.filter((curent:any)=>{
           return (input && curent && curent.name  && curent.name.toLowerCase().includes(input)) || (input && curent && curent.name  && curent.name.toUpperCase().includes(input)) || (input && curent && curent.name  && curent.name.includes(input))
         })     
      
  

    const handelchange = (value:string)=>{
      setInput(value)
    }

    

  return (
    <Box sx={{ flexGrow: 1  }}>
    <AppBar position="fixed" sx={{bgcolor:'teal'}} >
      <Toolbar>
        <IconButton
          size="large"
          edge="start"
          color="inherit"
          aria-label="open drawer"
          sx={{ mr: 2 }}
          onClick={()=>navigate('/')}
        >
          <StorefrontTwoToneIcon />
        </IconButton>
        <Typography
          variant="h6"
          noWrap
          component="div"
          sx={{ display: { xs: 'none', sm: 'block' } }}
        >
          MarketPlace
        </Typography>
        <Search>
          <SearchIconWrapper>
            <SearchIcon />
          </SearchIconWrapper>
          <StyledInputBase
            placeholder="Search…"
            inputProps={{ 'aria-label': 'search' }}
            value={input} 
            onChange={(e)=>handelchange(e.target.value)}
          />
        </Search>
        <SearchBox result={result} /> 
        <Box sx={{ flexGrow: 1 }} />
        <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        
          <IconButton
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          >
            <AccountCircle />
          </IconButton>
        </Box>
        <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    {renderMobileMenu}
    {renderMenu}
       
  </Box>

   
  )
}
