// client/src/pages/product/ProductDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addProductToCard } from '../../redux/userSlice';
import axios from 'axios';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  const dispatch = useDispatch();
  const userId = useSelector(state => state.user.user?._id);
  const currentCart = useSelector(state => state.user.user?.cart || []);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [productId]);

  // funtion to handle add to cart
  async function handleAddToCart() {
    if (!userId || !product) return;

    try {
      // update redux
      dispatch(addProductToCard(product));

      // create a new cart
      const existingIndex = currentCart.findIndex(p => p.product._id === product._id);
      let updatedCart = [...currentCart];

      if (existingIndex !== -1) {
        updatedCart[existingIndex].quantity += 1;
      } else {
        updatedCart.push({ product, quantity: 1 });
      }

      // update mongoDB
      await axios.post('http://localhost:3000/api/cart/update', {
        userId,
        cart: updatedCart
      }, { withCredentials: true });

      alert('Product has been added to your cart!');
    } catch (err) {
      console.error('Error adding to cart:', err);
    }
  }

  if (!product) return <div className="text-center my-5">Loading product...</div>;

  return (
    <div className="container my-5">
      <div className="row">
        <div className="col-md-5">
          <img src={product.productImage} className="img-fluid border rounded" alt={product.productName} />
        </div>
        <div className="col-md-7">
          <h2 className="fw-bold">{product.productName}</h2>
          <h4 className="text-danger mt-3">{Number(product.productPrice).toLocaleString()}₫</h4>
          <p className="mt-3">{product.description}</p>
          <p className="text-muted">Category: {product.category}</p>

          <div className="d-flex gap-3 mt-4">
            <button className="btn btn-outline-primary px-4" onClick={handleAddToCart}>
              Add to Cart
            </button>
            <button className="btn btn-danger px-4">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
