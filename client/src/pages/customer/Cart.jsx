import './Cart.css';
import { useState } from 'react';

const productsInCart = [
    {
        imageUrl: '/product/rainbowHolo.png',
        productName: 'Rainbow HOLO Playing Cards By TCC Fashion',
        quantity: 2,
        price: 300000
    },
    {
        imageUrl: '/product/rainbowHolo.png',
        productName: 'Rainbow HOLO Playing Cards',
        quantity: 2,
        price: 30000000
    },
    {
        imageUrl: '/product/rainbowHolo.png',
        productName: 'Rainbow HOLO Playing Cards',
        quantity: 2,
        price: 300000
    }
];

export default function Cart() {
    const [quantity, setQuantity] = useState(productsInCart[0].quantity);
    
    return (
        <div className='mt-3' id='cartContainer'>
            <div className='mx-lg-5 mx-md-2 p-3 d-flex justify-content-between' id='cartHeader'>
                <div className='image'></div>
                <div className='name'></div>
                <div className='price text-center fw-bold'>Price</div>
                <div className='quantity text-center fw-bold'>Quantity</div>
                <div className='total text-center fw-bold'>Total</div>
            </div>

            {productsInCart.map((product, index) => (
                <div key={index} className='mx-lg-5 mx-md-2 p-3 d-flex justify-content-between productContainer'>
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
                        <button type='button'>-</button>
                        <input type="number" className='text-center' value={quantity} />
                        <button type='button'>+</button>
                    </div>
                    <div className='d-flex align-items-center justify-content-center totalPriceContainer'>
                        <p className='mb-0'>{(product.price * quantity).toLocaleString()}₫</p>
                    </div>
                </div>
            ))}
        </div>
    )
}