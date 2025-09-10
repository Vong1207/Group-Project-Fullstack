import './CustomerPurchased.css';
import { useSelector } from 'react-redux';

export default function CustomerPurchased() {
    const purchased = useSelector((state) => state.user.user?.purchased) || [];

    return (
        <>
            <h1 className='mt-4 text-center mb-0'>Purchased Products</h1>

            {/* Purchased on -md breakpoint */}
            <div className='d-md-flex d-none flex-column mt-4 mx-5' id='purchasedSection'>
                {/* Create a div for each item in purchased */}
                {purchased.map((product, index) => (
                    <div key={index} className='p-3 my-2 purchasedContainer'>
                        <div className='d-flex'>
                            <div className='purchasedImageContainer'>
                                <img src={product.product.productImage} alt={`${product.product.productName} Image`} className='purchasedImage' />
                            </div>

                            <div className='purchasedDetailsContainer flex-fill d-flex flex-column ps-3 pe-2'>
                                <div className='purchasedNameContainer'>
                                    <p className='mb-0 purchasedName fw-bold'>{product.product.productName}</p>
                                    <span className={`ms-2 badge ${product.status === 'Delivered' ? 'bg-success' : 'bg-danger'}`}>
                                    {product.status}
                                    </span>
                                </div>
                                <p className='text-muted'><small>x{product.quantity}</small></p>
                            </div>

                            <div className='purchasedTotalPriceContainer d-flex justify-content-end'>
                                <p className='mb-0'>{`${(product.product?.productPrice ?? 0).toLocaleString()}₫`}</p>
                            </div>
                        </div>

                        <div className='my-2'>
                            <p className='mb-0 text-end'>{`Total (${product.quantity} ${product.quantity === 1 ? 'product' : 'products'}): ${(product.quantity * product.product.productPrice).toLocaleString()}₫`}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Purchased on -sm and lower breakpoints */}
            <div className='d-md-none d-flex flex-column mt-4 mx-3' id='purchasedSectionSm'>
                {/* Create a div for each item in purchased */}
                {purchased.map((product, index) => (
                    <div key={index} className='p-sm-3 p-2 my-2 purchasedContainerSm'>
                        <div className='d-flex'>
                            <img src={product.product.productImage} alt={`${product.product.productName} Image`} className='purchasedImageSm' />

                            <div className='flex-fill purchasedNameContainerSm'>
                                <p className='mb-2 fw-bold ps-3 purchasedNameSm'>{product.product.productName}</p>
                                <span className={`ms-2 badge ${product.status === 'Delivered' ? 'bg-success' : 'bg-danger'}`}>
                                    {product.status}
                                </span>
                                <div className='d-flex justify-content-between'>
                                    <p className='text-muted mb-0 ms-3'><small>x{product.quantity}</small></p>
                                    <p className='mb-0'>{`${(product.product?.productPrice ?? 0).toLocaleString()}₫`}</p>
                                </div>
                            </div>
                        </div>

                        <div className='my-2'>
                            <p className='mb-0 text-end'>{`Total (${product.quantity} ${product.quantity === 1 ? 'product' : 'products'}): ${(product.quantity * product.product.productPrice).toLocaleString()}₫`}</p>
                        </div>
                    </div>
                ))}
            </div>
        </>
    )
}