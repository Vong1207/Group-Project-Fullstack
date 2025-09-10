import './AddNewProduct.css'
import { useState, useEffect } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';

const categories = [
    "Electronics",
    "Men's Wear",
    "Women's Wear",
    "Home Appliances",
    "Books",
    "Sports",
    "Playing Cards & Toys",
    "Beauty Products",
    "Jewelry",
    "Phones & Accessories",
    "Watches",
    "Furniture"
];

export default function AddNewProduct() {
    const vendorId = useSelector(state => state.user.user?._id || '');

    const [formData, setFormData] = useState({
        productName: '',
        productImage: '',
        productPrice: 0,
        category: '',
        description: '',
        stockQuantity: 0,
        postedBy: vendorId
    });
    const [categoryOption, setCategoryOption] = useState('Select a category');
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);

    // Update formData
    useEffect(() => {
        setFormData(prevData => ({
            ...prevData,
            category: categoryOption !== 'Select a category' ? categoryOption : ''
        }));
    }, [categoryOption]);

    async function handleChangeInputImage(event) {
        const file = event.target.files[0];
        
        const reader = new FileReader();
        reader.onloadend = () => {
            setFormData(prevData => {
                const updatedData = { ...prevData, productImage: reader.result };
                return updatedData;
            });
        };
        reader.readAsDataURL(file);
    }

    async function handleSubmit(event) {
        event.preventDefault();

        try {
            const response = await axios.post('http://localhost:3000/api/product/add', { product: formData }, { withCredentials: true });
            console.log('Product added successfully:', response.data);
        } catch (error) {
            console.error('Error adding product:', error);
        }
    }

    return (
        <div className="add-product-container">
            <div className="add-product-header">
                <h1>
                    <i className="bi bi-plus-circle me-2"></i>
                    Add New Product
                </h1>
                <p className="add-product-subtitle">
                    Create a new product for your storee
                </p>
            </div>

            <div className="add-product-form-container">
                <form onSubmit={handleSubmit} className="add-product-form">
                    
                    <div className="form-group">
                        <label className="form-label">
                            <i className="bi bi-tag me-2"></i>
                            Product Name
                        </label>
                        <input 
                            onChange={(event) => setFormData({ ...formData, productName: event.target.value })} 
                            type="text" 
                            className="form-input"
                            placeholder="Enter product name..."
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <i className="bi bi-image me-2"></i>
                            Product Image
                        </label>
                        <input 
                            onChange={(event) => handleChangeInputImage(event)} 
                            type="file" 
                            className="form-input file-input"
                            accept="image/*" 
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <i className="bi bi-currency-dollar me-2"></i>
                            Product Price (₫)
                        </label>
                        <input 
                            onChange={(event) => setFormData({ ...formData, productPrice: Number(event.target.value) })} 
                            type="number" 
                            className="form-input"
                            placeholder="Enter price..."
                            required 
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <i className="bi bi-grid me-2"></i>
                            Product Category
                        </label>
                        <div className="dropdown-container">
                            <button 
                                type="button"
                                className={`dropdown-toggle ${isDropdownOpen ? 'active' : ''}`}
                                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                            >
                                <span>{categoryOption}</span>
                            </button>
                            
                            {isDropdownOpen && (
                                <div className="dropdown-options">
                                    {categories.map((category) => (
                                        <div 
                                            key={category} 
                                            className="dropdown-option"
                                            onClick={() => { setCategoryOption(category); setIsDropdownOpen(false); }}
                                        >
                                            {category}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <i className="bi bi-file-text me-2"></i>
                            Product Description
                        </label>
                        <textarea 
                            onChange={(event) => setFormData({ ...formData, description: event.target.value })} 
                            className="form-textarea"
                            placeholder="Enter product description..."
                            rows="4" 
                            required
                        />
                    </div>

                    <div className="form-group">
                        <label className="form-label">
                            <i className="bi bi-box me-2"></i>
                            Stock Quantity
                        </label>
                        <input 
                            onChange={(event) => setFormData({ ...formData, stockQuantity: Number(event.target.value) })} 
                            type="number" 
                            className="form-input"
                            placeholder="Enter stock quantity..."
                            required 
                        />
                    </div>

                    <button type="submit" className="submit-btn">
                        <i className="bi bi-plus-circle me-2"></i>
                        Add Product
                    </button>
                </form>
            </div>
        </div>
    )
}