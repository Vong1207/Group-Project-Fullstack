// client/src/pages/home/CategoryPage.jsx
import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';


export default function CategoryPage() {
  const { categoryName } = useParams(); // lấy từ URL
  const [products, setProducts] = useState([]);

  useEffect(() => {
    fetch(`http://localhost:3000/products/category/${categoryName}`)
      .then(res => res.json())
      .then(setProducts)
      .catch(console.error);
  }, [categoryName]);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">{categoryName}</h2>

      {/* Sort & Filter UI (display only, no logic) */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        {/* Sort Buttons */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className="fw-bold me-2">Sort by</span>

           <button className="btn btn-sm btn-outline-dark">
            <i className="fi fi-ts-sort-amount-desc me-1"></i> Price: High to Low
          </button>

          <button className="btn btn-sm btn-outline-danger">
            <i className="fi fi-ts-sort-amount-asc me-1"></i> Price: Low to High
          </button>

          <button className="btn btn-sm btn-outline-primary">A - Z</button>

          <button className="btn btn-sm btn-outline-primary">Z - A</button>
        </div>
      <div className="row row-cols-2 row-cols-md-3 row-cols-xl-6 g-3">
        {products.map(p => (
          <div className="col" key={p._id}>
            <div className="card h-100">
              <img src={p.productImage} className="card-img-top" alt={p.productName} />
              <div className="card-body">
                <h6 className="card-title">{p.productName}</h6>
                <p className="card-text text-danger fw-bold">{p.productPrice.toLocaleString()}₫</p>
              </div>
            </div>
          </div>
        ))}
        {products.length === 0 && <p>there are no products.</p>}
      </div>
    </div>
    </div>
  );
}
