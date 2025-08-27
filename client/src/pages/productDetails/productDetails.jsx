// client/src/pages/product/ProductDetail.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';

export default function ProductDetail() {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:3000/products/${productId}`)
      .then(res => res.json())
      .then(setProduct)
      .catch(console.error);
  }, [productId]);

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
            <button className="btn btn-outline-primary px-4">Add to Cart</button>
            <button className="btn btn-danger px-4">Buy Now</button>
          </div>
        </div>
      </div>
    </div>
  );
}
