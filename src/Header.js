/* eslint-disable no-unreachable */
/* eslint-disable no-unused-vars */
import * as React from 'react';
import { styled } from '@mui/material/styles';
import Box from '@mui/material/Box';
import Paper from '@mui/material/Paper';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, Col, Row } from 'react-bootstrap';
import { Divider, TextField } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import { deleteFavorite, getallAdded, getallUsers } from './service';
import { deleteUser } from './service';
import { useState, useEffect } from 'react';
import Drawer from '@mui/material/Drawer';
import ListItem from '@mui/material/ListItem';
import List from '@mui/material/List';
import AddCircleOutlineIcon from '@mui/icons-material/AddCircleOutline';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import { getallFavorite } from './service';
import StarBorderTwoToneIcon from '@mui/icons-material/StarBorderTwoTone';
import { addIntoFavorite } from './service';
import { addIntoAdded } from './service';
import { useParams } from 'react-router-dom';
import { addUser } from './service';
import { deleteAdded } from './service';
import { AltRoute } from '@mui/icons-material';
import { wait } from '@testing-library/user-event/dist/utils';
import { useRef } from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import citii from './City.json'




const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};




export default function Header() {

  const{id} = useParams();

   
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const [user, setUser] = useState([]);
  const [fav, setFav] = useState([]);

  useEffect(() => {
    getUsers();
    getFavs();
    colr('yellow');
   
   

  }, [])

  const getUsers = async () => {
    const response = await getallUsers();
    console.log(response);
    setUser(response.data);
  }

  const getFavs = async () => {
    const response = await getallFavorite();
    console.log(response);
    setFav(response.data);

  }
  const addUs = async (data) => {
 
    await addUser(data);
    

  }

 

  const addToCity = async (data) => {
   
    await addIntoAdded(data);
    alert("Added to cities");
    deleteData(data.id);
  }


  const deleteData = async (id) => {
    await deleteUser(id);
    getUsers();
  }

  function deletefav(id)
  {
     deleteFavData(id);
     alert("City Removed from Favorites");
  }

  
  const deleteFavData= async (id) => {
    await deleteFavorite(id);
    getFavs();
  }


  const myRef = useRef();

  function colr (colo) {

      myRef.current.style.backgroundColor = colo;
      
      }
  if(id === "Home")
  {
    getallAdded().then((response) =>  response.data.map((res)=> deleteAdded(res.id))); 
    citii.user.map((data) => addUs(data))
  }


  return (

    <Grid container spacing={0}>
      <Grid item xs={8}>
         
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
          <ListItem ref={myRef} id='home'   disablePadding  >
            <ListItemButton href='/' onClick={() => colr()}> <h4>Home</h4>  </ListItemButton>
          </ListItem>
          <Divider />
          <ListItem  disablePadding >
            <ListItemButton href = '/city'>  <h4>Cities</h4>  </ListItemButton>
          </ListItem>
  
      </List>
     
     
    </Drawer>
        <h3 >My Favorite Cities</h3>
        <div style={{ display: 'flex' }}>
          {/* <AuthButton isLoggedIn={isLoggedIn}></AuthButton> */}
          {fav.map((data) => (
            <Card  sx={{ minWidth: 70, width: 250 }}>
              <CardContent>
                <Typography sx={{ fontSize: 16 ,  display : 'flex'}} color="text.secondary" gutterBottom>
                  {data.name}
                  <StarBorderTwoToneIcon onClick={() => deletefav(data.id)} sx={ {color : "orange"} } fontSize='medium' style={{ marginLeft :  130 }}></StarBorderTwoToneIcon>
                </Typography>
                <Typography sx={{ fontSize: 15 }} color="green">
                  {data.desc}
                </Typography>
                <Typography variant="body2">
                  <div style={{ display: 'flex', marginTop: -5 }}>
                    <h4>Temperature :</h4>
                    <p style={{ marginTop: 19 }}>{data.temp}</p>
                  </div>
                  <div style={{ display: 'flex', marginTop: -35 }}>
                    <h4>Humidity :</h4>
                    <p style={{ marginTop: 19 }}>{data.humidity}</p>
                  </div>

                </Typography>

              </CardContent>
            </Card>
          ))}
        </div>
      </Grid>
      <Grid item xs={3}>
        <div>
          <Button onClick={handleOpen} style={{ backgroundColor: "blue", color: 'white', height: '40px', width: '140px', marginTop: '20px', marginLeft: '390px' }}>Add New City</Button>

          <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
       

            <Card sx={{
              minWidth: 70, width: 250, 
              marginTop: 28,
              marginLeft: 75,
            }}>
              <CardContent>
                <Typography sx={{ fontSize: 16, display: 'flex' }} color="text.secondary" gutterBottom>
                  <h3 style={{ marginTop: 5, marginLeft: 0 }} >Add City Modal</h3>
                  <CloseIcon onClick={handleClose} style={{ marginLeft: 200, marginTop: 5 }}></CloseIcon>
                </Typography>
               <Divider/>
                <Typography sx={{ fontSize: 15 }} color="green">
                  <TextField id="outlined-basic" label='Search City' variant="outlined" size='small'  style={{ align: 'centre', marginLeft: 80 }} />
                </Typography>
                <Divider/>
                <Typography variant="body2">
                  {user.map((data) => (

                    <div style={{ display: 'flex' }}>
                      <ListItem key={data.id} disablePadding>
                        <h4 style={{ marginTop: 10, marginLeft: 10 }}>{data.name}</h4>

                      </ListItem>
                      <AddCircleOutlineIcon onClick={() => addToCity(data)} style={{ marginTop: 10, marginRight: 10 }}></AddCircleOutlineIcon>

                    </div>

                  ))}  
   
   

                </Typography>

              </CardContent>
            </Card>
          </Modal>

        </div>

      </Grid>

    </Grid>

  );
}


 const AuthButton = props => {
  let { isLoggedIn } = props;
  switch (isLoggedIn) {
   case true: 
     return <></>
     break;
   case false:
      return <div className="container" style={{display:"flex"}}>
      <p>You have not added favorite city </p>
  </div>
      break;
    default:
     return null;
  }
};
