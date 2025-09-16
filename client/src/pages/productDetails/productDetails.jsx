/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Vu Linh
// # ID: 3999487 */
import './ProductDetails.css';

import { useParams, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCard , setCart, updateWalletBalance} from '../../redux/userSlice';
import axios from 'axios';
import Navbar from '../partials/Navbar.jsx';
import Footer from '../partials/Footer.jsx';

export default function ProductDetails() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [quantity, setQuantity] = useState(0);

  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.user?._id);
  const currentCart = useSelector(state => state.user.user?.cart || []);
  const navigate = useNavigate();
  const walletBalance = useSelector((state) => state.user.user?.walletBalance) || 0;

  useEffect(() => {
    // Fetch main product by id using the correct backend route
    fetch(`http://localhost:3000/api/product/all`)
      .then(res => res.json())
      .then(allProducts => {
        const mainProduct = allProducts.find(p => p._id === productId);
        setProduct(mainProduct);
        if (mainProduct?.category) {
          // Related products: all products in the same category except the current one
          const related = allProducts.filter(p => p.category === mainProduct.category && p._id !== productId);
          setRelatedProducts(related);
        }
      })
      .catch(console.error);
  }, [productId]);

  function handleQuantityChange(val) {
    const maxStock = product.stockQuantity;
    setQuantity(Math.max(0, Math.min(maxStock, val)));
  }

  async function handleAddToCart() {
    if (!userId || !product) return;

    // check quantity
    if (quantity === 0) {
      alert("Invalid quantity");
      return;
    }

    try {
      let updatedCart = [...currentCart];
      const existingIndex = updatedCart.findIndex(p => p.product._id === product._id);

      if (existingIndex !== -1) {
        updatedCart[existingIndex].quantity = quantity;
      } else {
        updatedCart.push({ product, quantity });
      }

      dispatch(setCart(updatedCart)); 

      await axios.post('http://localhost:3000/api/cart/update', {
        userId,
        cart: updatedCart
      }, { withCredentials: true });

      alert('Product has been added to your cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  }

  // when you click on buy now
  async function hanldeAddToOrder() {
    if (!userId || !product) return;
    
    // check quantity
    if (quantity === 0) {
      alert("Invalid quantity");
      return;
    }

    // Check wallet balance
    if (walletBalance < product.productPrice) {
      alert("You don't have enough money in your wallet.");
      return;
    }

    try {
      const orderItem = {
        product: product._id,
        quantity
      };

      const res = await axios.post(
        'http://localhost:3000/api/cart/order',
        {
          userId,
          cart: [orderItem],
          totalPrice: product.productPrice * quantity
        },
        { withCredentials: true }
      );

      
      alert('Order placed successfully!');
      dispatch(updateWalletBalance(walletBalance - (product.productPrice * quantity)));
      
      // Re-fetch product after successful order
      const resProduct = await axios.get(`http://localhost:3000/products/${product._id}`);
      setProduct(resProduct.data);

    } catch (error) {
      console.error('Error placing order:', error);
      alert('Error placing order.');
    }
  }

  if (!product) return <div className="text-center my-5">Loading product...</div>;

  // ...existing code...

  return (
    <>
      <Navbar />
      <div className="container my-4">
        {/* Breadcrumb */}
        <nav aria-label="breadcrumb" className="mb-3">
          <ol className="breadcrumb">
            <li className="breadcrumb-item"><a href="/">Home</a></li>
            <li className="breadcrumb-item">{product.category}</li>
            <li className="breadcrumb-item active" aria-current="page">{product.productName}</li>
          </ol>
        </nav>

        <div className="row g-4">
          {/* Product Image */}
          <div className="col-md-5">
            <img src={product.productImage} className="img-fluid border rounded w-100" alt={product.productName} style={{objectFit:'cover', maxHeight:400}} />
            {/* Thumbnails (if available) */}
            {/* <div className="d-flex mt-2 gap-2"> ...thumbnails... </div> */}
          </div>
          {/* Product Info */}
          <div className="col-md-7">
            <h2 className="fw-bold mb-2">{product.productName}</h2>
            <div className="d-flex align-items-center gap-3 mb-2">
              <span className="fs-4 productDetailPrice fw-bold">{Number(product.productPrice).toLocaleString()}₫</span>
            </div>
            <p className="mb-2">{product.description}</p>
            <div className="mb-2 text-muted">Category: {product.category}</div>
            <div className="mb-2 text-muted">Stock Quantity: {product.stockQuantity}</div>

            {/* Quantity Selector - Professional UI */}
            <div className="mb-3 d-flex align-items-center" style={{gap: '12px'}}>
              <label className="fw-bold mb-0" htmlFor="quantity-input" style={{minWidth: 70}}>Quantity:</label>
              <div className="input-group" style={{width: '120px'}}>
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  style={{borderTopRightRadius:0, borderBottomRightRadius:0, padding:'0 10px'}}
                  onClick={() => handleQuantityChange(quantity - 1)}
                  disabled={quantity <= 1}
                >
                  -
                </button>
                <input
                  id="quantity-input"
                  type="number"
                  className="form-control text-center"
                  min={1}
                  max={99}
                  value={quantity}
                  onChange={e => handleQuantityChange(Number(e.target.value))}
                  style={{borderRadius:0, width:'50px', padding:'0 6px'}}
                />
                <button
                  type="button"
                  className="btn btn-outline-secondary"
                  style={{borderTopLeftRadius:0, borderBottomLeftRadius:0, padding:'0 10px'}}
                  onClick={() => handleQuantityChange(quantity + 1)}
                  disabled={quantity >= 99}
                >
                  +
                </button>
              </div>
            </div>

            <div className="d-flex gap-3 mb-3">
              <button className="btn btn-dark px-4 py-2 fw-bold" onClick={handleAddToCart}>
                ADD TO CART
              </button>
              <button className="btn btn-buy px-4 py-2 fw-bold" onClick={hanldeAddToOrder}>BUY NOW</button>
            </div>
            {/* <button className="btn btn-outline-secondary px-4 ms-2">Add to Wishlist</button> */}
          </div>
        </div>

        {/* Related Products Carousel */}
        <div className="mt-5">
          <h4 className="fw-bold mb-3">We think you'll love</h4>
          <div className='relatedProducts' style={{overflowX: 'auto', whiteSpace: 'nowrap', paddingBottom: '10px'}}>
            {relatedProducts.length === 0 && <div className="text-muted">No related products found.</div>}
            {relatedProducts.map(rp => (
              <div key={rp._id} style={{display: 'inline-block', width: 220, marginRight: 16, verticalAlign: 'top'}}>
                <div className="card h-100 shadow-sm" style={{minHeight: 320}}>
                  <div style={{height:180, width:'100%', background:'#f8f9fa', backgroundImage:`url(${rp.productImage || '/defaultProfile.png'})`, backgroundSize:'cover', backgroundPosition:'center', borderRadius:'8px'}} />
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title fw-bold" style={{minHeight:40, wordBreak:'break-word', overflow:'hidden', textOverflow:'ellipsis', whiteSpace:'normal', maxHeight:40}}>{rp.productName}</h6>
                    <div className="mb-2 productDetailPrice fw-bold">{Number(rp.productPrice).toLocaleString()}₫</div>
                    <button className="btn btn-outline-dark mt-auto" onClick={()=>navigate(`/product/${rp._id}`)}>Visit</button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

  {/* ...existing code... */}

      </div>
      <Footer />
    </>
  );
}
