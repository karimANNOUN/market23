import React,{useState} from 'react'
import Box from '@mui/material/Box';
import TextField from '@mui/material/TextField';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import InputAdornment from '@mui/material/InputAdornment';
import FormControl from '@mui/material/FormControl';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Button from '@mui/material/Button';
import { useNavigate } from 'react-router-dom';
//import Cookies from 'js-cookie';


export const Register = () => {
    const [showPassword, setShowPassword] = React.useState(false);
    const navigate=useNavigate()

    const handleClickShowPassword = () => setShowPassword((show) => !show);
  
    const handleMouseDownPassword = (event: React.MouseEvent<HTMLButtonElement>) => {
      event.preventDefault();
    };

  

    const [username, setUsername] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
   

    const handleRegister = async () => {
      try {
       
        const response = await fetch(`${process.env.REACT_APP_HOST}/register`,{
          method: 'POST',
          credentials:"include",
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({ email, username , password }),
         
        });
        if(response.status === 400 ){
          console.log( await response.json())
        }if(response.status === 201){
       //   const data = await response.json()
         

        //  setToken(data.token)
     //     Cookies.set('token', data.token, { expires: 7 });
          navigate('/login')
        }

       // const data = await response.json()
      //  console.log(data)

      //  console.log('User registered successfully.');
      } catch (error) {
        console.error('Registration failed.');
      }
    };




  return (
    <Box sx={{height:'100vh',display:'flex',justifyContent:'center',alignItems:'center' ,backgroundSize:'cover' ,backgroundImage:`url(${'https://cdn.londonandpartners.com/3/ad0f268/YXBwLnNoYXJpbnBpeC5jb20vaW1hZ2VfZXh0ZXJuYWxfdXJscy9mODA0NDAwYS00MWQ5LTRjMzEtYWU2Yi1iM2I2ZWE2ODBjMjM/f804400a-41d9-4c31-ae6b-b3b6ea680c23.jpg'})` }} >
    <Box sx={{height:{xs:'90%' , md:'90%' , lg:'65%'},width:{ xs:'65%' , md:'40%' , lg:'25%'},borderStyle:'solid',bgcolor:'Window'}} >
        <Box sx={{width:'100%',height:{xs:'55%',md:'45%'}}} >
          <img style={{width:'100%' , height:'100%'}} src='https://res.cloudinary.com/dte7upwcr/image/upload/f_auto,w_1200/blog/blog2/que-es-un-marketplace/que-es-un-marketplace-img_header.jpg' alt='hii' />
        </Box>
     <Box sx={{width:'100%' , Height:'45%' , my:1  }} >

     <TextField
          label="Name"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '85%' }}
          type='text'
          onChange={(e) => setUsername(e.target.value)}
        />

    <TextField
          label="Email"
          id="outlined-start-adornment"
          sx={{ m: 1, width: '85%' }}
          type='email'
          onChange={(e) => setEmail(e.target.value)}
        />

<FormControl sx={{ m: 1, width: '85%' }} variant="outlined">
          <InputLabel htmlFor="outlined-adornment-password">Password</InputLabel>
          <OutlinedInput
            id="outlined-adornment-password"
            type={showPassword ? 'text' : 'password'}
            onChange={(e) => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={handleClickShowPassword}
                  onMouseDown={handleMouseDownPassword}
                  edge="end"
                >
                  {showPassword ? <VisibilityOff /> : <Visibility />}
                </IconButton>
              </InputAdornment>
            }
            label="Password"
          />
        </FormControl>
        <Button onClick={handleRegister} variant="contained" color="success">
        Register
      </Button>
      <Button sx={{ml:2}} onClick={()=>navigate('/login')} variant="contained"  color="info"> Back To Login</Button>
      </Box>

    </Box>
    </Box>
  )
}
