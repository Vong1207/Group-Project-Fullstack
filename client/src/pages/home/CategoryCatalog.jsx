// # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Minh Nguyen Khoa
// # ID: 4033604

import './CategoryCatalog.css'
import { Link } from 'react-router-dom';
import './CategoryPages.css';
import { useEffect, useState } from 'react';

export default function CategoryCatalog() {
    const [products, setProducts] = useState([]);
    const [endIndex, setEndIndex] = useState(12);
    const [displayLoadMore, setDisplayLoadMore] = useState(true);
    const displayProducts = products.slice(0, endIndex) || [];

    // Fetch all products
    const fetchAllProducts = async () => {
        try {
            const response = await fetch('http://localhost:3000/api/product/all');
            const data = await response.json();
            setProducts(data || []);
        } catch (error) {
            console.error('Error fetching all products:', error);
            setProducts([]);
        }
    };

    useEffect(() => {
        fetchAllProducts();
    }, []);

    const handleLoadMore = () => {
        setEndIndex((prevIndex) => {
            if (prevIndex + 12 >= products.length) {
                setDisplayLoadMore(false);
                return products.length;
            }
            return prevIndex + 12;
        });
    };

    const handleProductClick = (productId) => {
        window.location.href = `/product/${productId}`;
    };

    const getColumnClasses = () => {
        return 'col-lg-4 col-md-6 col-12';
    };

    return (
        <>
            {/* EXISTING CATEGORY SECTION */}
            <h1 className='text-center mt-5'>Category</h1>

            <div className='container px-sm-0 my-5'>
                {/* Category List */}
                <div className='row mx-0'>
                    {/* Jewelery */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Jewelery" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-ring-diamond categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Jewelery</p>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Playing Cards & Toys */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Playing Cards & Toys" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-card-spade categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Playing Cards & Toys</p>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Sports */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Sports" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-basketball categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Sports</p>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Furniture */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Furniture" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-sofa categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Furniture</p>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Watches */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Watches" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-watch categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Watches</p>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Books */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Books" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-dictionary categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Books</p>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Home Appliances */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Home Appliances" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-mixer categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Home Appliances</p>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Beauty Products */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Beauty Products" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-makeup-bag categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Beauty Products</p>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Men's Wear */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Men's Wear" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-shirt categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Men's Wear</p>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Women's Wear */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Women's Wear" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-dress categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Women's Wear</p>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Electronics */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Electronics" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-laptop categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Electronics</p>
                            </div>
                        </div>
                        </Link>
                    </div>

                    {/* Phones & Accessories */}
                    <div className='col-lg-2 col-md-3 col-sm-4 col-6 d-flex justify-content-center mb-5'>
                        <Link to="/home/Phones & Accessories" className='text-decoration-none text-dark'>
                        <div className='categoryCard text-center px-2'>
                            <i className='fi fi-ts-smartphone categoryIcon'></i>
                            <div className='d-flex justify-content-center align-items-center categoryNameContainer'>
                                <p className='fw-bold mb-0'>Phones & Accessories</p>
                            </div>
                        </div>
                        </Link>
                    </div>
                </div>
            </div>

            {/* NEW ALL PRODUCTS SECTION */}
            <div className="all-products-section">
                <div className="container px-sm-0">
                    <div className="products-header text-center mb-5">
                        <h2 className="products-title">
                            <i className="bi bi-grid me-2"></i>
                            All Products
                        </h2>
                        <small className="products-count">
                            <i className="bi bi-box me-1"></i>
                            <span className="number-product-text">{products.length} products available</span>
                        </small>
                    </div>

                    {/* Products Grid */}
                    <div className="products-container">
                        <div className="row g-3">
                            {displayProducts.length > 0 ? (
                                displayProducts.map((product) => (
                                    <div key={product._id} className={getColumnClasses()}>
                                        <div 
                                            className="card product-card h-100"
                                            onClick={() => handleProductClick(product._id)}
                                        >
                                            <img 
                                                src={product.productImage} 
                                                className="product-image"
                                                alt={product.productName}
                                            />
                                            
                                            <div className="product-body">
                                                <h6 className="product-title">
                                                    {product.productName}
                                                </h6>
                                                
                                                <p className="product-description">
                                                    {product.description?.length > 60 
                                                        ? `${product.description.substring(0, 60)}...`
                                                        : product.description
                                                    }
                                                </p>
                                                
                                                <div className="product-price">
                                                    {product.productPrice?.toLocaleString()}₫
                                                </div>
                                                
                                                <button 
                                                    className="btn-view-details"
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleProductClick(product._id);
                                                    }}
                                                >
                                                    <i className="bi bi-eye me-2"></i>
                                                    View Details
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))
                            ) : (
                                <div className="col-12 text-center py-5">
                                    <i className="bi bi-box" style={{ fontSize: '3rem', color: '#666' }}></i>
                                    <h5 className="mt-3 text-muted">No Products Found</h5>
                                    <p className="text-muted">No products are available at the moment.</p>
                                </div>
                            )}
                        </div>
                    </div>

                    {/* Load More Button */}
                    {displayLoadMore && products.length > endIndex && (
                        <div className="load-more-container text-center">
                            <button 
                                className="btn btn-outline-primary px-4 py-2"
                                onClick={handleLoadMore}
                            >
                                <i className="bi bi-arrow-down-circle me-2"></i>
                                Load More Products
                            </button>
                        </div>
                    )}
                </div>
            </div>
        </>
    )
}