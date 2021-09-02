import Link from "next/link";
import Image from "next/image";


import Header from "../components/Header.js";
import MobileMenu from "../components/MobileMenu.js";
import Footer from "../components/Footer.js";
import PdfWidget from "../components/PdfWidget.js";

export default function Home() {


  return (
    <>
<Header />
<div className="body">
   <div className="content">
           <div className="contentHead">
         <h1>PDF Compressor</h1>
         <p></p>
      </div>
      <div className="contentBody">
      <PdfWidget/>
      
      </div>
   </div>

</div>
<Footer />
    </>
  );
}
