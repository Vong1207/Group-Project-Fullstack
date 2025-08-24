import './CustomerCart.css';
import { useSelector, useDispatch } from 'react-redux';
import { useEffect, useState } from 'react';
import axios from 'axios';
import {
    setUser
} from '../../redux/userSlice.js';

export default function CustomerCart() {
    const dispatch = useDispatch();
    const fetchSession = async () => {
        try {
            const response = await axios.get("http://localhost:3000/api/session", { withCredentials: true });
            if (response.data && response.data.loggedIn && response.data.user) {
                dispatch(setUser(response.data.user));
            }
        } catch (error) {
            console.error("Error fetching session:", error);
        }
    }

    useEffect(() => {
        fetchSession();
    }, []);

    const productsInCart = useSelector(state => state.user.user?.cart || []);
    const [checked, setChecked] = useState(productsInCart.map(() => false));
    const totalPriceSelected = productsInCart.reduce((total, product, index) => {
        return checked[index] ? total + product.product.productPrice * product.quantity : total;
    }, 0);

    useEffect(() => {
        if (checked.length === 0 && productsInCart.length > 0) {
            setChecked(productsInCart.map(() => false));
        }
    }, [productsInCart]);

    function handleSelectAllProducts() {
        const allSelected = checked.every(Boolean);
        setChecked(productsInCart.map(() => !allSelected));
    }

    function handleSelectProduct(index) {
        setChecked(checked.map((item, i) => i === index ? !item : item));
    }

    function handleSubtractQuantity() {

    }

    function handleAddQuantity() {

    }

    function handleInputQuantity() {

    }

    function handleDeleteProduct() {
        
    }

    return (
        <>
            <h1 className='mb-0 text-center mt-4'>My Cart</h1>

            {/* Cart Display on -md breakpoint */}
            <div className='mt-4 d-md-block d-none' id='cartContainer'>
                <div className='mx-lg-5 mx-md-2 p-3 d-flex justify-content-between' id='cartHeader'>
                    <div className='select-all d-flex align-items-center'>
                        <button className={checked.length > 0 && checked.every(Boolean) ? 'checked' : ''} type='button' onClick={handleSelectAllProducts}></button>
                    </div>
                    <div className='image'></div>
                    <div className='name'></div>
                    <div className='price text-center fw-bold'>Price</div>
                    <div className='quantity text-center fw-bold'>Quantity</div>
                    <div className='total text-center fw-bold'>Total</div>
                    <div className='delete'></div>
                </div>

                {productsInCart.map((product, index) => (
                    <div key={index} className='mx-lg-5 mx-md-2 p-3 d-flex justify-content-between productContainer'>

                        <div className='selectProductBtnContainer d-flex align-items-center justify-content-center'>
                            <button type='button' className={`selectProductBtn ${checked[index] ? 'checked' : ''}`} onClick={() => handleSelectProduct(index)}></button>
                        </div>

                        <div className='productImageContainer'>
                            <img src={product.product.productImage} alt={`${product.product.productName} Image`} className='productImage' />
                        </div>

                        <div className='d-flex align-items-center productNameContainer'>
                            <p className='mb-0 fw-bold'>{product.product.productName}</p>
                        </div>

                        <div className='d-flex align-items-center justify-content-center priceContainer'>
                            <p className='mb-0'>{product.product.productPrice.toLocaleString()}₫</p>
                        </div>

                        <div className='d-flex align-items-center justify-content-center quantityContainer'>
                            <button type='button' onClick={() => handleSubtractQuantity(index)}>-</button>
                            <input type="number" className='text-center' value={product.quantity} onChange={(event) => handleInputQuantity(event, index)} />
                            <button type='button' onClick={() => handleAddQuantity(index)}>+</button>
                        </div>

                        <div className='d-flex align-items-center justify-content-center totalPriceContainer'>
                            <p className='mb-0'>{(product.product.productPrice * product.quantity).toLocaleString()}₫</p>
                        </div>

                        <div className='deleteBtnContainer d-flex justify-content-center align-items-center'>
                            <button type='button' className='d-flex justify-content-center align-items-center' onClick={() => handleDeleteProduct(index)}>
                                <i className='fi fi-ts-x'></i>
                            </button>
                        </div>
                    </div>
                ))}

                <div className='mx-lg-5 mx-md-2 p-3 mt-4 d-flex justify-content-between' id='totalAndPurchase'>
                    <div className='d-flex align-items-center'>
                        <p className='mb-0 fs-5'>{`Total: ${totalPriceSelected.toLocaleString()}₫`}</p>
                    </div>

                    <div>
                        <button className='px-3 py-2 fw-bold' type='button' id='buyNowBtn'>Order</button>
                    </div>
                </div>
            </div>

            {/* Cart Display on -sm breakpoint */}
            {/* <div className='mt-4 d-md-none d-block' id='cartContainerSm'>
                <div className='p-3' id='selectAllSm'>
                    <button className={checked.every(Boolean) ? 'checked' : ''} type='button' onClick={handleSelectAllProducts}></button>
                </div>

                {productsInCart.map((product, index) => (
                    <div key={index} className='p-3 d-flex productContainerSm position-relative'>

                        <div className='d-flex justify-content-center align-items-center selectProductBtnContainerSm'>
                            <button type='button' className={`selectProductBtn ${checked[index] ? 'checked' : ''}`} onClick={() => handleSelectProduct(index)}></button>
                        </div>

                        <div className='ms-3 flex-fill d-flex productInfoContainerSm'>
                            <div className='productImageContainerSm'>
                                <img src={product.imageUrl} alt={`${product.productName} Image`} className='d-sm-none productImageXSm' />
                                <img src={product.imageUrl} alt={`${product.productName} Image`} className='d-sm-block d-none productImageSm' />
                            </div>
                            <div className='ms-sm-4 ms-3'>
                                <p className='mb-0 productNameSm'>{product.productName}</p>
                                <p className='mb-0 mt-2'>{product.price.toLocaleString()}₫</p>
                                <div className='d-flex align-items-center productQuantityContainerSm'>
                                    <button type='button' onClick={() => handleSubtractQuantity(index)}>-</button>
                                    <input type="number" className='text-center' value={product.quantity} onChange={(event) => handleInputQuantity(event, index)} />
                                    <button type='button' onClick={() => handleAddQuantity(index)}>+</button>
                                </div>
                            </div>
                        </div>

                        <button type='button' className='deleteBtn position-absolute' onClick={() => handleDeleteProduct(index)}>
                            <i className='fi fi-ts-x'></i>
                        </button>
                    </div>
                ))}

                <div className='p-3 d-flex justify-content-between align-items-center' id='totalAndPurchaseSm'>
                    <p className='mb-0'>{`Total: ${totalPriceSelected.toLocaleString()}₫`}</p>
                    <button type='button' className='px-3 py-2 fw-bold' id='buyNowBtn'>Order</button>
                </div>
            </div> */}
        </>
    )
}