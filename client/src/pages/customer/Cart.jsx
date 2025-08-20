import './Cart.css';
import { useState } from 'react';

const productsInCartInitially = [
    {
        imageUrl: '/product/rainbowHolo.png',
        productName: 'Rainbow HOLO Playing Cards By TCC Fashion',
        quantity: 2,
        price: 300000
    },
    {
        imageUrl: '/product/orbitBlackHole.png',
        productName: 'Orbit Black Hole Playing Cards',
        quantity: 2,
        price: 380000
    },
    {
        imageUrl: '/product/airlessGen1.jpg',
        productName: 'Wilson Airless Gen1 Basketball',
        quantity: 2,
        price: 65000000
    }
];

export default function Cart() {
    const [quantities, setQuantities] = useState(productsInCartInitially.map(product => product.quantity));
    const [productsInCart, setProducts] = useState(productsInCartInitially);

    function handleSubtractQuantity(index) {
        if (quantities[index] > 1) {
            setQuantities(quantities => quantities.map((quantity, i) => i === index ? quantity - 1 : quantity));
        } else {
            setProducts(products => products.filter((p, i) => i !== index))
            setQuantities(quantities => quantities.filter((q, i) => i !== index))
        }
    }

    function handleAddQuantity(index) {
        setQuantities(quantities => quantities.map((quantity, i) => i === index ? quantity + 1 : quantity));
    }

    function handleSelectProduct(event) {
        event.target.classList.toggle('checked');
    }

    function handleSelectAllProducts(event) {
        event.target.classList.toggle('checked');
        const selectBtns = document.querySelectorAll('.selectProductBtn');
        const isChecked = event.target.classList.contains('checked');

        if (selectBtns) {
            selectBtns.forEach(btn =>{
                if (isChecked) {
                    btn.classList.add('checked');
                } else {
                    btn.classList.remove('checked');
                }
            })
        }
    }
    
    return (
        <>
            {/* Cart Display on -md breakpoint */}
            <div className='mt-3 d-md-block d-none' id='cartContainer'>
                <div className='mx-lg-5 mx-md-2 p-3 d-flex justify-content-between' id='cartHeader'>
                    <div className='select-all d-flex align-items-center'>
                        <button type='button' onClick={handleSelectAllProducts}></button>
                    </div>
                    <div className='image'></div>
                    <div className='name'></div>
                    <div className='price text-center fw-bold'>Price</div>
                    <div className='quantity text-center fw-bold'>Quantity</div>
                    <div className='total text-center fw-bold'>Total</div>
                </div>

                {productsInCart.map((product, index) => (
                    <div key={index} className='mx-lg-5 mx-md-2 p-3 d-flex justify-content-between productContainer'>
                        <div className='selectProductBtnContainer d-flex align-items-center justify-content-center'>
                            <button type='button' className='selectProductBtn' onClick={handleSelectProduct}></button>
                        </div>
                        <div className=' productImageContainer'>
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
                            <input type="number" className='text-center' value={quantities[index]} />
                            <button type='button' onClick={() => handleAddQuantity(index)}>+</button>
                        </div>
                        <div className='d-flex align-items-center justify-content-center totalPriceContainer'>
                            <p className='mb-0'>{(product.price * quantities[index]).toLocaleString()}₫</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}