import Footer from "../components/Footer";
import Banner from "../components/home/Banner";
import HowItWorks from "../components/home/HowItWorks";
import Pricing from "../components/home/Pricing";
import Seo from "../components/Seo";
import '../styles/app.scss'

const Home = () => {
  return (
    <>
     <Seo
        title="Home"
        description="Home page."
        name="Inkear."
        type="website"
      />
      <Banner />
     <div className="container">
       <HowItWorks />
      <Pricing />

        
     </div>
   <Footer />
    </>
  );
};
export default Home;
