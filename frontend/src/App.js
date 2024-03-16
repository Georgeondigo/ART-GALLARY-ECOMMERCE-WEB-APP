import './App.css';
import { About } from './Pages/About';
import { Artist } from './Pages/Artist';
import { Home } from './Pages/Home';
import { LoginSignup } from './Pages/LoginSignup';
import { PageCategory } from './Pages/PageCategory';
import { Product } from './Pages/Product';
import { Paintings } from './Pages/Paintings';
import { Drawings } from './Pages/Drawings';
import { Photographs } from './Pages/Photographs';
import { DigitalArt } from './Pages/DigitalArt';
import { Cart } from './Pages/Cart';
import Navbar from './components/Navbar/Navbar';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Footer } from './components/Footer/Footer';
import ArtistList from './components/ArtistList/ArtistList';
import PlaceOrder from './components/PlaceOrder/PlaceOrder';


function App() {
  return (
    <div>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/art' element={<PageCategory />} />
          <Route path='/artist' element={<ArtistList />} />
          <Route path="/artist/:artistId" element={<Artist/>} /> 
          <Route path='/about' element={<About />} />
          <Route path="/product" element={<Product />} />
          <Route path='/product/:productId' element={<Product/>}/>
          <Route path='/cart' element={<Cart />} />
          <Route path='/login' element={<LoginSignup />} />
          <Route path='/paintings' element={<Paintings category="Painting" />} />
          <Route path='/drawings' element={<Drawings category="Drawing" />} />
          <Route path='/photographs' element={<Photographs category="Photograph" />} />
          <Route path='/digitalArt' element={<DigitalArt category="DigitalArt" />} />
          <Route path='/order' element={<PlaceOrder/>}/>
          
        </Routes>
        <Footer />
      </BrowserRouter>
    </div>
  );
}

export default App;
