import './MyProducts.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';
import '../home/categoryPages.css';

export default function MyProducts() {
    const userId = useSelector(state => state.user.user?._id) || '';
    const [products, setProducts] = useState([]);
    const [endIndex, setEndIndex] = useState(12);
    const [displayLoadMore, setDisplayLoadMore] = useState(true);
    const displayProducts = products.slice(0, endIndex) || [];
    const [showEditModal, setShowEditModal] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [originalProduct, setOriginalProduct] = useState(null);

    // Fetch Database
    const fetchPostedProducts = async () => {
        try {
            if (!userId) return;
            const response = await axios.post(
                'http://localhost:3000/api/product/findPostedBy',
                { userId },
                { withCredentials: true }
            );
            setProducts(response.data || []);
        } catch (error) {
            console.error('Error fetching posted products:', error);
        }
    }

    useEffect(() => {
        fetchPostedProducts();
    }, []);

    function handleLoadMore() {
        setEndIndex((prevIndex) => {
            if (prevIndex + 6 >= products.length) {
                setDisplayLoadMore(false);
                return products.length;
            }
            return prevIndex + 6;
        });
    }

    function handleEditModalOpen(product) {
        setSelectedProduct(product);
        setOriginalProduct(product);
        setShowEditModal(true);
    }

    function handleEditModalClose() {
        setShowEditModal(false);
        setOriginalProduct(null);
        setSelectedProduct(null);
    }

    async function handleDeleteProduct(productId) {
        try {
            await axios.delete('http://localhost:3000/api/product/delete', { data: { productId } }, { withCredentials: true });
            setProducts((prevProducts) => prevProducts.filter((product) => product._id !== productId));
        } catch (error) {
            console.error('Error deleting product:', error);
        }
    }

    async function handleEditProduct(product) {
        try {
            await axios.post('http://localhost:3000/api/product/edit', { product }, { withCredentials: true });
            setProducts((prevProducts) => prevProducts.map((p) => (p._id === product._id ? product : p)));
            handleEditModalClose();
        } catch (error) {
            console.error('Error editing product:', error);
        }
    }

    function isProductChanged() {
        if (!originalProduct || !selectedProduct) return false;

        return (
            originalProduct.productName !== selectedProduct.productName ||
            originalProduct.description !== selectedProduct.description ||
            originalProduct.productPrice !== selectedProduct.productPrice ||
            originalProduct.stockQuantity !== selectedProduct.stockQuantity
        );
    }

    return (
        <>
            <h1 className='mt-4 mb-0 text-center'>View Products</h1>

            {/* Products Grid - Category Page Style */}
            <div className='container-fluid mt-4'>
                <div className="products-container">
                    <div className="row g-3">
                        {displayProducts.length > 0 ? (
                            displayProducts.map((product) => (
                                <div key={product._id} className="col-lg-4 col-md-6 col-12">
                                    <div className="card product-card h-100">
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
                                                {product.productPrice?.toLocaleString()} VNĐ
                                            </div>
                                            
                                            <div className="d-flex gap-2">
                                                <button 
                                                    className="btn btn-outline-secondary btn-sm flex-fill"
                                                    onClick={() => handleEditModalOpen(product)}
                                                >
                                                    <i className="bi bi-pencil me-1"></i>
                                                    Edit
                                                </button>
                                                <button 
                                                    className="btn btn-danger btn-sm flex-fill"
                                                    onClick={() => handleDeleteProduct(product._id)}
                                                >
                                                    <i className="bi bi-trash me-1"></i>
                                                    Delete
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            ))
                        ) : (
                            <div className="col-12 text-center py-5">
                                <i className="bi bi-box" style={{ fontSize: '3rem', color: '#666' }}></i>
                                <h5 className="mt-3 text-muted">No Products Found</h5>
                                <p className="text-muted">You haven't added any products yet.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Load More Button - Moved Outside */}
            {displayLoadMore && products.length > endIndex && (
                <div className="container-fluid">
                    <div className="load-more-container text-center">
                        <button 
                            className="btn btn-outline-primary px-4 py-2"
                            onClick={handleLoadMore}
                        >
                            <i className="bi bi-arrow-down-circle me-2"></i>
                            Load More Products
                        </button>
                    </div>
                </div>
            )}

            {showEditModal && selectedProduct && (
                <div className='modal show d-flex align-items-center' tabIndex='-1' role='dialog'>
                    <div className='modal-dialog' role='document'>
                        <div className='modal-content'>
                            <div className='modal-header d-flex justify-content-between'>
                                <h5 className='modal-title fw-bold'>Edit Product</h5>
                                <button className='closeModalBtn' type='button' onClick={handleEditModalClose}>
                                    <i className='bi bi-x-lg'></i>
                                </button>
                            </div>
                            <div className='modal-body'>
                                <div className='d-flex justify-content-between mb-2'>
                                    <label htmlFor="productName">Name:</label>
                                    <input className='px-2' type="text" defaultValue={selectedProduct.productName} onChange={(event) => setSelectedProduct({ ...selectedProduct, productName: event.target.value })} />
                                </div>
                                <div className='d-flex justify-content-between mb-2'>
                                    <label htmlFor="productPrice">Price:</label>
                                    <input className='px-2' type="number" defaultValue={selectedProduct.productPrice} onChange={(event) => setSelectedProduct({ ...selectedProduct, productPrice: parseInt(event.target.value) })} />
                                </div>
                                <div className='d-flex justify-content-between mb-2'>
                                    <label htmlFor="description">Description:</label>
                                    <input className='px-2' type="text" defaultValue={selectedProduct.description} onChange={(event) => setSelectedProduct({ ...selectedProduct, description: event.target.value })} />
                                </div>
                                <div className='d-flex justify-content-between'>
                                    <label htmlFor="stock">Stock:</label>
                                    <input className='px-2' type="number" defaultValue={selectedProduct.stockQuantity} onChange={(event) => setSelectedProduct({ ...selectedProduct, stockQuantity: parseInt(event.target.value) })} />
                                </div>
                            </div>
                            <div className='modal-footer'>
                                <button className={`py-1 px-3 fw-bold ${isProductChanged() ? 'saveChanges' : 'disabled'}`} disabled={!isProductChanged()} type='button' onClick={() => handleEditProduct(selectedProduct)}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}