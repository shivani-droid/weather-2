import './App.css';
import Header from './Header';
import { Grid } from '@mui/material';
import { BrowserRouter , Routes , Route } from 'react-router-dom';
import Cities from './Cities';





function App() {

 
  return (
 <Grid container spacing={0}>
  <Grid item xs>
  </Grid>
  <Grid item xs={10}>
  <BrowserRouter>
     <Routes>
     <Route path='/' element={<Header/>} />
     <Route path='/:id' element={<Header/>} />
     <Route path='/city' element={<Cities/>} />
     </Routes>
  </BrowserRouter>
  </Grid>
  <Grid item xs>
 
  </Grid>

</Grid>


  );
}

export default App;
