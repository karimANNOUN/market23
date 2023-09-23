import { Box } from '@mui/material'
import Link from '@mui/material/Link';
import ListItemButton from '@mui/joy/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import List from '@mui/joy/List';
import ListItem from '@mui/joy/ListItem';
import Avatar from '@mui/material/Avatar';

export const SearchBox = ({result}:any) => {
  return (
    <>
     { result.length ? <Box sx={{width:{ xs:'72%' ,sm:248 ,md:230},display:'flex',flexDirection:'column',position:'absolute',bgcolor:'whitesmoke',top:'100%',left:{ xs:70 ,sm:216},overflow:'auto'}} >
         <List>
        {result.map((product:any) => (
          <ListItem key={product.id} >
            <Link href={`/product/${product.id}`}  style={{width:'100%',textDecoration:'none',color:'black'}} >
          <ListItemButton  >
          <Avatar sx={{mr:2}} alt="Remy Sharp" src={product.image} />
         
            <ListItemText primary={product.name} />
            
          </ListItemButton>
          </Link>
          </ListItem>
        
        ))}
        
      </List>
    </Box> : "" }
    </>
  )
}
