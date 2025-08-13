import './Home.css'
import Navbar from '../partials/Navbar.jsx'
import Footer from '../partials/Footer.jsx'
import PromotionCarousel from './PromotionCarousel.jsx'
import CategoryCatalog from './CategoryCatalog.jsx'

const sampleProducts = [
    // Example Sample Product
    {
        name: '',
        price: 0,
        category: '',
        mainImageUrl: '',
        rating: 0
    },

];

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