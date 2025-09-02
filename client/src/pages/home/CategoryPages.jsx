import React, { useEffect, useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import './CategoryPages.css';

export default function CategoryPage() {
  const { categoryName } = useParams();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [filters, setFilters] = useState({
    searchName: '',
    minPrice: '',
    maxPrice: ''
  });
  const [showMobileFilters, setShowMobileFilters] = useState(false);
  const [screenSize, setScreenSize] = useState('desktop');
  const [globalSearchTerm, setGlobalSearchTerm] = useState(''); // For navbar search

  
  const user = useSelector(state => state.user.user);
  const profilePath = user ? '/myAccount' : '/signIn';
  const defaultAvatar = '/customerProfile/defaultProfile.png';
  const avatarSrc = user ? (user.avatar || defaultAvatar) : defaultAvatar;

  // Screen size detection - KEEP ORIGINAL
  useEffect(() => {
    const handleResize = () => {
      const width = window.innerWidth;
      if (width <= 767) setScreenSize('smartphone');
      else if (width >= 768 && width <= 1023) setScreenSize('tablet');
      else setScreenSize('desktop');
    };

    handleResize();
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  const handleGlobalSearch = async (e) => {
    e.preventDefault();
    
    if (globalSearchTerm.trim()) {
      try {
        const response = await fetch("/api/product/searchByName", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ name: globalSearchTerm }),
        });
        
        if (!response.ok) throw new Error("API searchByName failed");
        const data = await response.json();
        if (Array.isArray(data)) {
          setProducts([]);
          setFilteredProducts(data);
        }
      } catch (error) {
        console.error("Global search error:", error);
      }
    }
  };

  useEffect(() => {
    // Function to fetch all products by category
    const fetchAllByCategory = () => {
      fetch(
        `http://localhost:3000/products/category/${encodeURIComponent(
          categoryName
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
        })
        .catch((err) => {
          setProducts([]);
          setFilteredProducts([]);
          console.error("Fetch all by category error:", err);
        });
    };

    const query = new URLSearchParams(window.location.search);
    const searchedName = query.get("searchedName") || "";

    if (searchedName.trim()) {
      // Gọi API searchByName, sau đó filter theo category ở FE
      fetch("/api/product/searchByName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: searchedName }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("API searchByName failed");
          return res.json();
        })
        .then((data) => {
          // If no data or not an array, fallback to fetchAllByCategory
          if (!Array.isArray(data)) {
            fetchAllByCategory();
            return;
          }
          // Compare category case-insensitive, ignore whitespace
          const filtered = data.filter(
            (p) =>
              p.category &&
              p.category.trim().toLowerCase() ===
                categoryName.trim().toLowerCase()
          );
          setFilteredProducts(filtered);
          setProducts([]);
        })
        .catch((err) => {
          console.error("Fetch searchByName error:", err);
          // If error, fallback to fetchAllByCategory
          fetchAllByCategory();
        });
    } else {
      fetchAllByCategory();
    }
  }, [categoryName]);

  const applyFilters = () => {
    let filtered = [...products];

    if (filters.searchName.trim()) {
      filtered = filtered.filter(product =>
        product.productName.toLowerCase().includes(filters.searchName.toLowerCase())
      );
    }

    if (filters.minPrice) {
      filtered = filtered.filter(product => product.productPrice >= parseInt(filters.minPrice));
    }

    if (filters.maxPrice) {
      filtered = filtered.filter(product => product.productPrice <= parseInt(filters.maxPrice));
    }

    setFilteredProducts(filtered);
    if (screenSize === 'smartphone') setShowMobileFilters(false);
  };

  const resetFilters = () => {
    setFilters({ searchName: '', minPrice: '', maxPrice: '' });
    setGlobalSearchTerm(''); // Reset global search
    fetchCategoryProducts(); // Về lại products theo category
    if (screenSize === 'smartphone') setShowMobileFilters(false);
  };

  const getColumnClasses = () => {
    switch (screenSize) {
      case 'smartphone': return 'col-12';
      case 'tablet': return 'col-md-6';
      default: return 'col-lg-4';
    }
  };

  const handleProductClick = (productId) => {
    window.location.href = `/product/${productId}`;
  };

  const renderFilters = () => (
    <>
      <div className="filter-group">
        <label className="filter-label">
          <i className="bi bi-search me-1"></i>
          Search Products
        </label>
        <input
          type="text"
          className="filter-input"
          placeholder="Enter product name..."
          value={filters.searchName}
          onChange={(e) => setFilters({ ...filters, searchName: e.target.value })}
          onKeyPress={(e) => e.key === 'Enter' && applyFilters()}
        />
      </div>

      <div className="filter-group">
        <label className="filter-label">
          <i className="bi bi-currency-dollar me-1"></i>
          Price Range (₫)
        </label>
        <input
          type="number"
          className="filter-input mb-2"
          placeholder="Min price"
          value={filters.minPrice}
          onChange={(e) => setFilters({ ...filters, minPrice: e.target.value })}
          min="0"
        />
        <input
          type="number"
          className="filter-input"
          placeholder="Max price"
          value={filters.maxPrice}
          onChange={(e) => setFilters({ ...filters, maxPrice: e.target.value })}
          min="0"
        />
      </div>

      <button className="btn-apply" onClick={applyFilters}>
        <i className="bi bi-check-circle me-1"></i>
        Apply
      </button>
      <button className="btn-reset" onClick={resetFilters}>
        <i className="bi bi-arrow-clockwise me-1"></i>
        Reset
      </button>
    </>
  );

  return (
    <div className="category-page">
      <header className='position-sticky sticky-top mb-0 navbar-header'>
        <nav className='navbar container px-0' id='mainNavbar'>
          <div className='row m-0 w-100 align-items-center py-2'>
            {/* Brand Name */}
            <div className='col-lg-2 d-lg-block d-none pe-0'>
              <Link to='/' className='brandName'>
                Brand Name
              </Link>
            </div>
            <div className='col-lg-8 col-sm-10 col-9 ps-sm-0 pe-0'>
              <form onSubmit={handleGlobalSearch}>
                <div className='d-flex justify-content-start searchBarContainer'>
                  <input 
                    className='ps-3 py-2' 
                    type="text" 
                    placeholder='Vendor/Product'
                    value={globalSearchTerm}
                    onChange={(e) => setGlobalSearchTerm(e.target.value)}
                  />
                  <button type='submit' className='px-4 my-1 me-1'>
                    <i className='bi bi-search'></i>
                  </button>
                </div>
              </form>
            </div>

            {/* Login/SignUp/Profile */}
            <div className='col-sm-2 col-3 px-3 d-flex justify-content-end profileContainer'>
              <Link to={profilePath}>
                {/* If user not exist then display button */}
                {!user && (
                  <button type='button' className='d-flex justify-content-center align-items-center'>
                    <i className='bi bi-person-fill'></i>
                  </button>
                )}

                {/* If user logged in then display avatar (fallback to default if missing) */}
                {user && (
                  <img src={avatarSrc} alt="Profile" />
                )}
              </Link>
            </div>
          </div>
        </nav>
      </header>

      <div className="container-fluid">
        <div className="row mx-0">
          {/* Sidebar - Desktop/Tablet */}
          {screenSize !== 'smartphone' && (
            <div className="col-md-3 col-lg-2 px-0">
              <div className="filters-sidebar d-flex flex-column">
                <div className="filters-header">
                  <div className="text-center mb-3">
                  <i className="bi bi-funnel" style={{ fontSize: '2rem' }}></i>
                </div>
              </div>
              <div className="filters-content">
                {renderFilters()}
              </div>
              <div className="back-home-container">
                <a href="/" className="back-home-btn">
                  <i className="bi bi-house me-2"></i>
                  Back to Home
                </a>
              </div>
            </div>
          </div>
        )}

          {/* Main Content */}
          <div className={screenSize !== 'smartphone' ? 'col-md-9 col-lg-10' : 'col-12'}>
            {/* Header */}
            <div className="category-header d-flex justify-content-between align-items-center">
              <div>
                <h1 className="category-title">{categoryName || 'All Products'}</h1>
                <small>
                  <i className="number-product bi bi-grid me-1"></i>
                  <span className="number-product-text">{filteredProducts.length} products found</span>
                </small>
              </div>
              
              {/* Mobile Filter Toggle */}
              {screenSize === 'smartphone' && (
                <button 
                  className="mobile-filter-toggle"
                  onClick={() => setShowMobileFilters(true)}
                >
                  <i className="bi bi-funnel me-1"></i>
                  Filters
                </button>
              )}
            </div>

            {/* Products Grid */}
            <div className="products-container">
              <div className="row g-3">
                {filteredProducts.length > 0 ? (
                  filteredProducts.map((product) => (
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
                    <i className="bi bi-search" style={{ fontSize: '3rem', color: '#666' }}></i>
                    <h5 className="mt-3 text-muted">No Products Found</h5>
                    <button className="btn btn-primary mt-2" onClick={resetFilters}>
                      Reset Filters
                    </button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Modal */}
      {screenSize === 'smartphone' && showMobileFilters && (
        <div 
          className="mobile-filters-overlay"
          onClick={(e) => e.target === e.currentTarget && setShowMobileFilters(false)}
        >
          <div className="mobile-filters-modal">
            <div className="mobile-filters-header">
              <h5 className="m-0">
                <i className="bi bi-funnel me-2"></i>
                Filter Products
              </h5>
              <button 
                className="mobile-filters-close"
                onClick={() => setShowMobileFilters(false)}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>
            
            {renderFilters()}
          </div>
        </div>
      )}
    </div>
  );
}