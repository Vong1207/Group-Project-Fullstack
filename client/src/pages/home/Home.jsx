/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Minh Nguyen Khoa
// # ID: s4033604 */
import "./Home.css";
import Navbar from "../partials/Navbar.jsx";
import Footer from "../partials/Footer.jsx";
import PromotionCarousel from "./PromotionCarousel.jsx";
import CategoryCatalog from "./CategoryCatalog.jsx";

export default function Home() {
  return (
    <>
      <Navbar />
      <PromotionCarousel />
      <CategoryCatalog />
      <Footer />
    </>
  );
}
