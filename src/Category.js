import Navbar from "./components/nav/Navbar";
import PetsCollections from "./components/petsCollections/PetsCollections";
import Footer from "./components/footer/Footer";
import CategoryBanner from "./components/banner/CategoryBanner";

function Category() {

    return (
        <div className="App overflow-y-scroll   ">
            <Navbar />
            <CategoryBanner />
            <PetsCollections />
            <Footer />
        </div>
    );
  }
  
  export default Category;