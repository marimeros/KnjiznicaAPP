import 'bootstrap/dist/css/bootstrap.min.css'
import Container from 'react-bootstrap/Container';
import './App.css'
import NavBarEdunova from './components/NavBarEdunova';
import { Route, Routes } from 'react-router-dom';
import { RouteNames } from './constants';
import Pocetna from './pages/Pocetna';
import KnjigePregled from './pages/knjige/KnjigePregled';
import KnjigeDodaj from './pages/knjige/KnjigeDodaj';
import KnjigePromjena from './pages/knjige/KnjigePromjena';


function App() {

  return (
    <>
    <Container>
      <NavBarEdunova />
      <Routes>
        <Route path={RouteNames.HOME} element={<Pocetna/>} />

        <Route path={RouteNames.KNJIGA_PREGLED} element={<KnjigePregled/>}/>
        <Route path={RouteNames.KNJIGA_NOVI} element={<KnjigeDodaj/>}/>
        <Route path={RouteNames.KNJIGA_PROMJENA} element={<KnjigePromjena/>}/>

      </Routes>
      <hr/>
      &copy; KNJIGA
    </Container>
    
    </>
  )
}

export default App
