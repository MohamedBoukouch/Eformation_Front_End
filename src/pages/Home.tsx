// pages/Home.jsx
import Section_1 from "../components/Home/Section_1.jsx";
import Section_2 from "../components/Home/Section_2.jsx";
import Section_3 from "../components/Home/Section_3.jsx";
import Section_4 from "../components/Home/Section_4.jsx";
import Section_5 from "../components/Home/Section_5.jsx";
import Section_6 from "../components/Home/Section_6.jsx";
import Footer from "../components/Footer/Footer.js";
import "../styles/App.css";

const Home : React.FC = ()=> {
  return (
    <div className="w-full min-h-screen overflow-x-hidden">

      <Section_1/>

      <Section_2/>

      <Section_3/>

      <Section_4/>

      <Section_5/>

      <Section_6/>

      <Footer/>

    </div>
  );
};

export default Home;