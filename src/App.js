import Navbar from "./components/nav/Navbar";
import PetsCollections from "./components/petsCollections/PetsCollections";
import Banner from "./components/banner/Banner";
import Products from "./components/ourProducts/Products";
import Sellers from "./components/sellers/Sellers";
import FriendBanner from "./components/banner/FriendBanner";
import AdaptBanner from "./components/banner/AdaptBanner";
import PetAbout from "./components/petKnoledge/PetAbout";
import Footer from "./components/footer/Footer";

function App() {

  return (
      <div className="App overflow-y-scroll   ">

          <Navbar />
          <Banner />
          <PetsCollections />
          <FriendBanner />
          <Products />
          <Sellers />
          <AdaptBanner />
          <PetAbout />
          <Footer />
  
      </div>
   
  );
}

export default App;
