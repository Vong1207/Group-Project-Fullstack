import './Home.css'
import Navbar from '../partials/Navbar.jsx'
import Footer from '../partials/Footer.jsx'
import PromotionCarousel from './PromotionCarousel.jsx'
import CategoryCatalog from './CategoryCatalog.jsx'

export default function Home() {
    return (
        <>
            <Navbar />
            <PromotionCarousel />
            <CategoryCatalog />
            <Footer />
        </>
    )
}