import './Cart.css';
import { useSelector, useDispatch } from 'react-redux';
import {
    addQuantity,
    subtractQuantity,
    inputQuantity,
    deleteProduct,
    selectProduct,
    selectAllProducts
} from '../../redux/cartSlice.js';

export default function Cart() {
    const productsInCart = useSelector(state => state.cart.products);
    const checked = useSelector(state => state.cart.checked);
    const dispatch = useDispatch();

    const totalPriceSelected = productsInCart.reduce((sum, product, i) => {
        return checked[i] ? sum + product.price * product.quantity : sum;
    }, 0)

    function handleSubtractQuantity(index) {
        dispatch(subtractQuantity(index));
    }

    function handleAddQuantity(index) {
        dispatch(addQuantity(index));
    }

    function handleSelectProduct(index) {
        dispatch(selectProduct(index));
    }

    function handleInputQuantity(event, index) {
        const newQuantityString = event.target.value;
        const newQuantity = parseInt(newQuantityString);
        dispatch(inputQuantity({ index, quantity: newQuantity || 1 }));
    }

    function handleDeleteProduct(index) {
        dispatch(deleteProduct(index));
    }

    function handleSelectAllProducts() {
        dispatch(selectAllProducts());
    }

    return (
        <>
            {/* Cart Display on -md breakpoint */}
            <div className='mt-3 d-md-block d-none' id='cartContainer'>
                <div className='mx-lg-5 mx-md-2 p-3 d-flex justify-content-between' id='cartHeader'>
                    <div className='select-all d-flex align-items-center'>
                        <button className={checked.every(Boolean) ? 'checked' : ''} type='button' onClick={handleSelectAllProducts}></button>
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
                            <img src={product.imageUrl} alt={`${product.productName} Image`} className='productImage' />
                        </div>

                        <div className='d-flex align-items-center productNameContainer'>
                            <p className='mb-0 fw-bold'>{product.productName}</p>
                        </div>

                        <div className='d-flex align-items-center justify-content-center priceContainer'>
                            <p className='mb-0'>{product.price.toLocaleString()}₫</p>
                        </div>

                        <div className='d-flex align-items-center justify-content-center quantityContainer'>
                            <button type='button' onClick={() => handleSubtractQuantity(index)}>-</button>
                            <input type="number" className='text-center' value={product.quantity} onChange={(event) => handleInputQuantity(event, index)} />
                            <button type='button' onClick={() => handleAddQuantity(index)}>+</button>
                        </div>

                        <div className='d-flex align-items-center justify-content-center totalPriceContainer'>
                            <p className='mb-0'>{(product.price * product.quantity).toLocaleString()}₫</p>
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
                        <button className='px-3 py-2 fw-bold' type='button' id='buyNowBtn'>Buy Now</button>
                    </div>
                </div>
            </div>

            {/* Cart Display on -sm breakpoint */}
            <div className='mt-3 d-md-none d-block' id='cartContainerSm'>
                <div className='p-3' id='selectAllSm'>
                    <button className={checked.every(Boolean) ? 'checked' : ''} type='button' onClick={handleSelectAllProducts}></button>
                </div>

                {productsInCart.map((product, index) => (
                    <div key={index} className='p-3 d-flex productContainerSm'>

                        <div className='d-flex justify-content-center align-items-center selectProductBtnContainerSm'>
                            <button type='button' className={`selectProductBtn ${checked[index] ? 'checked' : ''}`} onClick={() => handleSelectProduct(index)}></button>
                        </div>

                        <div className='ms-3 flex-fill d-flex productInfoContainerSm'>
                            <img src={product.imageUrl} alt={`${product.productName} Image`} className='d-sm-none productImageXSm' />
                            <img src={product.imageUrl} alt={`${product.productName} Image`} className='d-sm-block d-none productImageSm' />
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
                    </div>
                ))}

                <div className='p-3 d-flex justify-content-between align-items-center' id='totalAndPurchaseSm'>
                    <p className='mb-0'>{`Total: ${totalPriceSelected.toLocaleString()}₫`}</p>
                    <button type='button' className='px-3 py-2 fw-bold' id='buyNowBtn'>Buy Now</button>
                </div>
            </div>
        </>
    )
}