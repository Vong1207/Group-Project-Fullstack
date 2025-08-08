import './PromotionCarousel.css'

export default function PromotionCarousel() {
    return (
        <div className='container px-0'>
            <div id="promotionCarousel" className="carousel slide" data-bs-ride="carousel">
                {/* Carousel Indicators */}
                <div className="carousel-indicators">
                    <button type="button" data-bs-target="#promotionCarousel" data-bs-slide-to="0" className="active" aria-current="true" aria-label="Slide 1"></button>
                    <button type="button" data-bs-target="#promotionCarousel" data-bs-slide-to="1" aria-label="Slide 2"></button>
                </div>

                {/* Carousel Items */}
                <div className="carousel-inner">
                    <div className="carousel-item active">
                        <img src="/promotion/promotion1.png" className="d-block w-100" alt="Promotion 1" />
                    </div>
                    <div className="carousel-item">
                        <img src="/promotion/promotion2.png" className="d-block w-100" alt="Promotion 2" />
                    </div>
                </div>
                
                {/* Carousel Controls */}
                <button className="carousel-control-prev" type="button" data-bs-target="#promotionCarousel" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                </button>
                <button className="carousel-control-next" type="button" data-bs-target="#promotionCarousel" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                </button>
            </div>
        </div>
    )
}