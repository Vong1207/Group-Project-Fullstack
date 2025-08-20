import './Cart.css';
import { useState, useEffect } from 'react';

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
    },
    {
        imageUrl: '/product/airlessGen1.jpg',
        productName: 'Wilson Airless Gen1 Basketball',
        quantity: 2,
        price: 65000000
    },
    {
        imageUrl: '/product/airlessGen1.jpg',
        productName: 'Wilson Airless Gen1 Basketball',
        quantity: 2,
        price: 65000000
    },
    {
        imageUrl: '/product/airlessGen1.jpg',
        productName: 'Wilson Airless Gen1 Basketball',
        quantity: 2,
        price: 65000000
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
    const [totalPriceSelected, setTotalPriceSelected] = useState(0);
    const [checked, setChecked] = useState(productsInCartInitially.map(() => false));

    useEffect(() => {
        const total = productsInCart.reduce((sum, product, i) => {
            return checked[i] ? sum + product.price * quantities[i] : sum;
        }, 0);
        setTotalPriceSelected(total);
    }, [checked, quantities, productsInCart]);

    function handleSubtractQuantity(index) {
        if (quantities[index] > 1) {
            setQuantities(quantities => quantities.map((quantity, i) => i === index ? quantity - 1 : quantity));
        } else {
            setProducts(products => products.filter((p, i) => i !== index));
            setQuantities(quantities => quantities.filter((q, i) => i !== index));
        }
    }

    function handleAddQuantity(index) {
        setQuantities(quantities => quantities.map((quantity, i) => i === index ? quantity + 1 : quantity));
    }

    function handleSelectProduct(index) {
        setChecked(checked =>
            checked.map((c, i) => i === index ? !c : c)
        );
    }

    function handleInputQuantity(event, index) {
        const newQuantityString = event.target.value;
        const newQuantity = parseInt(newQuantityString);

        if (newQuantityString === '') {
            setQuantities(quantities => quantities.map((quantity, i) => i === index ? 1 : quantity))
        } else if (newQuantity > 0) {
            setQuantities(quantities => quantities.map((quantity, i) => i === index ? newQuantity : quantity));
        }
    }

    function handleDeleteProduct(index) {
        setProducts(products => products.filter((p, i) => i !== index));
        setQuantities(quantities => quantities.filter((q, i) => i !== index));
    }

    function handleSelectAllProducts() {
        const isChecked = !checked.every(Boolean);
        setChecked(checked.map(() => isChecked));
    }

    return (
        <>
            {/* Cart Display on -md breakpoint */}
            <div className='mt-3 d-md-block d-none' id='cartContainer'>
                <div className='mx-lg-5 mx-md-2 p-3 d-flex justify-content-between' id='cartHeader'>
                    <div className='select-all d-flex align-items-center'>
                        <button className={checked.every(Boolean) ? 'checked' : ''} type='button' onClick={() => handleSelectAllProducts()}></button>
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
                            <input type="number" className='text-center' value={quantities[index]} onChange={(event) => handleInputQuantity(event, index)} />
                            <button type='button' onClick={() => handleAddQuantity(index)}>+</button>
                        </div>

                        <div className='d-flex align-items-center justify-content-center totalPriceContainer'>
                            <p className='mb-0'>{(product.price * quantities[index]).toLocaleString()}₫</p>
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
                    <button className={checked.every(Boolean) ? 'checked' : ''} type='button' onClick={() => handleSelectAllProducts()}></button>
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
                                    <input type="number" className='text-center' value={quantities[index]} onChange={(event) => handleInputQuantity(event, index)} />
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