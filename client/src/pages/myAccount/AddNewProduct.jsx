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
        <>
            <h1 className="mb-0 text-center mt-4">Add New Product</h1>

            <div id='addProductFormContainer' className='mt-4 p-3'>
                <form method='post'>
                    <div className='d-flex flex-column mb-3'>
                        <label className='mb-1' htmlFor="productName">Product Name</label>
                        <input onChange={(event) => setFormData({ ...formData, productName: event.target.value })} type="text" id="productName" name="productName" required />
                    </div>
                    <div className='d-flex flex-column mb-3'>
                        <label className='mb-1' htmlFor="productImage">Product Image</label>
                        <input onChange={(event) => handleChangeInputImage(event)} type="file" id="productImage" name="productImage" accept="image/*" required />
                    </div>
                    <div className='d-flex flex-column mb-3'>
                        <label className='mb-1' htmlFor="productPrice">Product Price</label>
                        <input onChange={(event) => setFormData({ ...formData, productPrice: Number(event.target.value) })} type="number" id="productPrice" name="productPrice" required />
                    </div>
                    <div className='d-flex flex-column mb-3'>
                        <label className='mb-1' htmlFor="category">Product Category</label>
                        <div className='customDropdownContainer position-relative px-2 py-1'>
                            { categoryOption }
                            <button className='position-absolute customDropdownToggler' type='button' onClick={() => setIsDropdownOpen(!isDropdownOpen)}>
                                <i className={ isDropdownOpen ? 'bi bi-chevron-up' : 'bi bi-chevron-down' }></i>
                            </button>

                            {/* Dropdown Options */}
                            {isDropdownOpen && (
                                <div className='customDropdownOptions position-absolute px-2 py-1'>
                                    {categories.map((category) => (
                                        <div key={category} className='customDropdownOption' onClick={() => { setCategoryOption(category); setIsDropdownOpen(false); }}>
                                            {category}
                                        </div>
                                    ))}
                                </div>
                            )}
                        </div>
                    </div>
                    <div className='d-flex flex-column mb-3'>
                        <label className='mb-1' htmlFor="description">Product Description</label>
                        <textarea onChange={(event) => setFormData({ ...formData, description: event.target.value })} id="description" name="description" rows="3" required></textarea>
                    </div>
                    <div className='d-flex flex-column mb-3'>
                        <label className='mb-1' htmlFor="stockQuantity">Product Stock</label>
                        <input onChange={(event) => setFormData({ ...formData, stockQuantity: Number(event.target.value) })} type="number" id="stockQuantity" name="stockQuantity" required />
                    </div>

                    <button type="submit" onClick={(event) => handleSubmit(event)}>Add Product</button>
                </form>
            </div>
        </>
    )
}