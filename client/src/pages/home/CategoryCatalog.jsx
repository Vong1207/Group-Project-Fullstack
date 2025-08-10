import './CategoryCatalog.css'

export default function CategoryCatalog() {
    return (
        <>
            <h1 className='text-center mt-5'>Category</h1>

            <div className='container px-sm-0 my-5'>
                {/* Category List */}
                <div className='row mx-0'>
                    {/* Jewelery */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-ring-diamond categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Jewelery</p>
                            </div>
                        </div>
                    </div>

                    {/* Playing Cards & Toys */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-card-spade categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Playing Cards & Toys</p>
                            </div>
                        </div>
                    </div>

                    {/* Sports */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-basketball categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Sports</p>
                            </div>
                        </div>
                    </div>

                    {/* Furniture */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-sofa categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Furniture</p>
                            </div>
                        </div>
                    </div>

                    {/* Watches */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-watch categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Watches</p>
                            </div>
                        </div>
                    </div>

                    {/* Books */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-dictionary categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Books</p>
                            </div>
                        </div>
                    </div>

                    {/* Home Appliances */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-mixer categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Home Appliances</p>
                            </div>
                        </div>
                    </div>

                    {/* Beauty Products */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-makeup-bag categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Beauty Products</p>
                            </div>
                        </div>
                    </div>

                    {/* Men's Wear */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-shirt categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Men's Wear</p>
                            </div>
                        </div>
                    </div>

                    {/* Women's Wear */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-dress categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Women's Wear</p>
                            </div>
                        </div>
                    </div>

                    {/* Electronics */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-earbuds categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Electronics</p>
                            </div>
                        </div>
                    </div>

                    {/* Phones & Accessories */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-mobile-button categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Phones & Accessories</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}