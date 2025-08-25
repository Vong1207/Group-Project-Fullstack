import './MyProducts.css';
import { useSelector } from 'react-redux';
import axios from 'axios';
import { useEffect, useState } from 'react';

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

            <div className='container-fluid mt-4 px-0'>
                <div className='row mx-0' id='myProductsRow'>
                    {displayProducts.map((product, index) => (
                        <div key={index} className='col-lg-4 col-md-6 col-12 mt-4 px-0 d-flex justify-content-center align-items-center'>
                            <div className='myProductContainer w-100'>
                                <div className='d-flex justify-content-center myProductImageContainer'>
                                    <img className='myProductImage' src={product.productImage} alt={`${product.productName} Image`} />
                                </div>
                                <div className='p-2'>
                                    <p className='mb-0 fw-bold myProductName'>{product.productName}</p>
                                    <div className='d-flex justify-content-between'>
                                        <p className='mb-0'>{product.productPrice.toLocaleString()}₫</p>
                                        <p className='mb-0 text-muted'>Stock: {product.stockQuantity}</p>
                                    </div>
                                </div>
                                <div className='d-flex justify-content-between p-2'>
                                    <button className='px-4 py-1 editBtn fw-bold' type='button' onClick={() => handleEditModalOpen(product)}>Edit</button>
                                    <button className='px-3 py-1 deleteBtn fw-bold' type='button' onClick={() => handleDeleteProduct(product._id)}>Delete</button>
                                </div>
                            </div>
                        </div>
                    ))}

                    <div className='col-12 mt-5 d-flex justify-content-center align-items-center'>
                        {displayLoadMore && products.length > 0 && (
                            <button className='px-4 py-2 loadMoreBtn fw-bold' type='button' onClick={handleLoadMore}>Load More</button>
                        )}
                    </div>
                </div>
            </div>

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