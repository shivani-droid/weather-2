import React from "react";
import { Divider, Grid, Modal } from "@mui/material";
import Box from '@mui/material/Box';
import { Row } from "react-bootstrap";
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import { useEffect , useState  } from "react";
import { getallUsers } from "./service";
import ListItem from "@mui/material/ListItem";
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import { addIntoFavorite } from "./service";
import Card from "@mui/material/Card";
import { getallAdded } from "./service";
import ListItemButton from '@mui/material/ListItemButton';
import Drawer from "@mui/material/Drawer";
import List from "@mui/material/List";
import { useRef } from "react";





export default function Cities()
{  
   const [open, setOpen] = React.useState(false);
   const handleOpen = () => setOpen(true);
   const handleClose = () => setOpen(false);

   const [user, setUser] = useState([]);

   const [render, setRender] = useState({});
   useEffect(() => {
       getUsers();
       color('yellowgreen');
   }, [])
 
   const getUsers = async () =>{
       const response = await getallAdded();
       console.log(response);      
        setUser(response.data);
        
   }

   function callme(data)
   { 
      setRender(data);
      setOpen(true);

   }
   
  
   
  const addToFav = async (data) => {
  await addIntoFavorite(data);
  alert("City added to favorites");
  }

        
  const myRef = useRef();

  function color (colo) {

      myRef.current.style.backgroundColor = colo;
   
      }

 return(
    <Grid container spacing={20}>
       <Grid item xs={6} md={4}>
       <Box sx={{ display: 'flex' }}>
    
    <Drawer
      sx={{
        width: '70px',
        
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: "92px",
          boxSizing: 'border-box',
          backgroundColor : 'darkblue',
        },
      }}
      variant="permanent"
      anchor="left"
   
    >

     
      <List >
          <ListItem  id='home'   disablePadding  >
            <ListItemButton href='/' onClick={() => color()}> <h4>Home</h4>  </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem  ref={myRef} disablePadding >
            <ListItemButton href = '/city'>  <h4>Cities</h4>  </ListItemButton>
          </ListItem>
  
      </List>
     
     
    </Drawer>
   
  </Box>
        <Card
         sx={{
            border :1 ,
            width: 400,
            height: 700,
            marginTop : 3,
            marginLeft : -2 ,
            
        }}>
          <Row style={{display : 'flex'}}>

            <h3  style={{marginTop : 10 , marginLeft : 10 }} >Cities</h3>
             <AddCircleOutlineIcon style={{marginTop : 10 , marginLeft :300 }}></AddCircleOutlineIcon>
          </Row>
          <Divider/>
          <Row>   
            {
            user.map((data) => (
        
              <Row>
               <Divider></Divider>
            <ListItem key={data.id} disablePadding onClick={() => callme(data)}>
              <h4 style={{marginTop : 10 ,  marginLeft : 10 }}>{data.name}</h4>
             
            </ListItem>
            <ListItem key={data.id} disablePadding onClick={() => callme(data)}>
             
              <p  style={{ marginTop : -20  ,  marginLeft : 10 }}>{data.temp}</p>
            </ListItem>
             <Divider></Divider>
           </Row> 
             
          ))}
           
          </Row>
        </Card>
    </Grid>
    <Grid item xs={6} md={8}>

    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description">

        <Card  sx={{
        width: 900,
        height : 700 ,
        marginTop : 3,
        marginLeft : 75
       
        }} >
              <Row style={{display : 'flex'}}>
               <h3  style={{marginTop : 12 , marginLeft : 10 }} >{render.name}</h3>
               <StarBorderTwoToneIcon onClick={() => addToFav(render)}  fontSize='large' style={{marginTop : 10 , marginLeft : 750 }}></StarBorderTwoToneIcon>
                           
             </Row>
             <Divider/>
             <p style={{ marginLeft : 340 , marginTop : 270 , color : 'green'}} >{render.desc}</p>
             <div  style={{display : 'flex'  , marginTop : -10 , marginLeft : 350}}>
               <h3>Temperature :</h3>
               <p style={{marginTop : 22 }}  >{render.temp}</p>
             </div>
             <div style={{display : 'flex' ,marginTop : -35 ,marginLeft : 370 }}>
               <h3>Humidity :</h3>
               <p style={{marginTop : 22 }}>{render.temp}</p>
             </div>
        </Card>
      

        </Modal> 
    </Grid>
  </Grid>

 );}