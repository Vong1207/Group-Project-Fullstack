/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Minh Nguyen Khoa, Tran Gia Vong
// # ID: 4033604, 4012094 */
import "./MyProducts.css";
import { useSelector } from "react-redux";
import axios from "axios";
import { useEffect, useState } from "react";
import "../home/categoryPages.css";

export default function MyProducts() {
  // Get the vendor's user ID from Redux
  const userId = useSelector((state) => state.user.user?._id) || "";

  // State to manage the list of posted products
  const [products, setProducts] = useState([]);

  // State for "Load More" feature
  const [endIndex, setEndIndex] = useState(12);
  const [displayLoadMore, setDisplayLoadMore] = useState(true);
  const displayProducts = products.slice(0, endIndex) || [];

  // Modal state for editing a product
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [originalProduct, setOriginalProduct] = useState(null);

  // Fetch Database
  const fetchPostedProducts = async () => {
    try {
      if (!userId) return;
      const response = await axios.post(
        "http://localhost:3000/api/product/findPostedBy",
        { userId },
        { withCredentials: true }
      );
      setProducts(response.data || []);
    } catch (error) {
      console.error("Error fetching posted products:", error);
    }
  };

  // Initial fetch when component mounts
  useEffect(() => {
    fetchPostedProducts();
  }, []);

  // Handle "Load More" button click
  function handleLoadMore() {
    setEndIndex((prevIndex) => {
      if (prevIndex + 6 >= products.length) {
        setDisplayLoadMore(false);
        return products.length;
      }
      return prevIndex + 6;
    });
  }

  // Open the edit modal and store current product
  function handleEditModalOpen(product) {
    setSelectedProduct(product);
    setOriginalProduct(product);
    setShowEditModal(true);
  }

  // Close the edit modal
  function handleEditModalClose() {
    setShowEditModal(false);
    setOriginalProduct(null);
    setSelectedProduct(null);
  }

  // Delete a product and update local state
  async function handleDeleteProduct(productId) {
    try {
      await axios.delete(
        "http://localhost:3000/api/product/delete",
        { data: { productId } },
        { withCredentials: true }
      );
      setProducts((prevProducts) =>
        prevProducts.filter((product) => product._id !== productId)
      );
    } catch (error) {
      console.error("Error deleting product:", error);
    }
  }

  // Submit edited product to the backend and update local state
  async function handleEditProduct(product) {
    try {
      await axios.post(
        "http://localhost:3000/api/product/edit",
        { product },
        { withCredentials: true }
      );
      setProducts((prevProducts) =>
        prevProducts.map((p) => (p._id === product._id ? product : p))
      );
      handleEditModalClose();
    } catch (error) {
      console.error("Error editing product:", error);
    }
  }

  // Check if user has changed any product field before saving
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
      <h1 className="mt-4 mb-0 text-center">View Products</h1>

      {/* Products Grid - Category Page Style */}
      <div className="container-fluid mt-4">
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
                      <h6 className="product-title">{product.productName}</h6>

                      <p className="product-description">
                        {product.description?.length > 60
                          ? `${product.description.substring(0, 60)}...`
                          : product.description}
                      </p>

                      <div className="product-price">
                        {product.productPrice?.toLocaleString()} VNĐ
                      </div>

                      <div className="d-flex gap-2">
                        <button
                          className="btn editBtn btn-outline-secondary btn-sm flex-fill"
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
                <i
                  className="bi bi-box"
                  style={{ fontSize: "3rem", color: "#666" }}
                ></i>
                <h5 className="mt-3 text-muted">No Products Found</h5>
                <p className="text-muted">
                  You haven't added any products yet.
                </p>
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
        <div
          className="edit-modal-overlay"
          onClick={(e) =>
            e.target === e.currentTarget && handleEditModalClose()
          }
        >
          <div className="edit-modal-container">
            <div className="edit-modal-header">
              <h3 className="edit-modal-title">
                <i className="bi bi-pencil-square me-2"></i>
                Edit Product
              </h3>
              <button
                className="edit-modal-close"
                onClick={handleEditModalClose}
              >
                <i className="bi bi-x-lg"></i>
              </button>
            </div>

            <div className="edit-modal-body">
              <div className="edit-form-group">
                <label className="edit-form-label">
                  <i className="bi bi-tag me-2"></i>
                  Product Name
                </label>
                <input
                  type="text"
                  className="edit-form-input"
                  defaultValue={selectedProduct.productName}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      productName: e.target.value,
                    })
                  }
                  placeholder="Enter product name..."
                />
              </div>

              <div className="edit-form-group">
                <label className="edit-form-label">
                  <i className="bi bi-currency-dollar me-2"></i>
                  Price (₫)
                </label>
                <input
                  type="number"
                  className="edit-form-input"
                  defaultValue={selectedProduct.productPrice}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      productPrice: parseInt(e.target.value),
                    })
                  }
                  placeholder="Enter price..."
                  min="0"
                />
              </div>

              <div className="edit-form-group">
                <label className="edit-form-label">
                  <i className="bi bi-file-text me-2"></i>
                  Description
                </label>
                <textarea
                  className="edit-form-textarea"
                  defaultValue={selectedProduct.description}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      description: e.target.value,
                    })
                  }
                  placeholder="Enter product description..."
                  rows="4"
                />
              </div>

              <div className="edit-form-group">
                <label className="edit-form-label">
                  <i className="bi bi-box me-2"></i>
                  Stock Quantity
                </label>
                <input
                  type="number"
                  className="edit-form-input"
                  defaultValue={selectedProduct.stockQuantity}
                  onChange={(e) =>
                    setSelectedProduct({
                      ...selectedProduct,
                      stockQuantity: parseInt(e.target.value),
                    })
                  }
                  placeholder="Enter stock quantity..."
                  min="0"
                />
              </div>
            </div>

            <div className="edit-modal-footer">
              <button className="btn-cancel" onClick={handleEditModalClose}>
                <i className="bi bi-x-circle me-2"></i>
                Cancel
              </button>
              <button
                className={`btn-save ${
                  isProductChanged() ? "enabled" : "disabled"
                }`}
                disabled={!isProductChanged()}
                onClick={() => handleEditProduct(selectedProduct)}
              >
                <i className="bi bi-check-circle me-2"></i>
                Save Changes
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
