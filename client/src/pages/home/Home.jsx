import './Home.css'
import Navbar from '../partials/Navbar.jsx'
import Footer from '../partials/Footer.jsx'
import PromotionCarousel from './PromotionCarousel.jsx'

export default function Home() {
    return (
        <>
            <Navbar />
            <PromotionCarousel />
            <Footer />
        </>
    )
}