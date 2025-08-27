import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResult() {
  const query = useQuery();
  const searchedName = query.get('searchedName') || '';
  const [results, setResults] = useState([]);

  useEffect(() => {
    if (searchedName.trim()) {
  fetch('/api/product/searchByName', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: searchedName })
      })
        .then(res => res.json())
        .then(data => {
          if (Array.isArray(data)) setResults(data);
          else setResults([]);
        })
        .catch(err => {
          setResults([]);
          console.error('Search API error:', err);
        });
    } else {
      setResults([]);
    }
  }, [searchedName]);

  // Dummy fallback data nếu API lỗi
  const dummyProducts = [
    { _id: '1', productName: 'Dummy Product 1', category: 'Test', productPrice: 10000 },
    { _id: '2', productName: 'Dummy Product 2', category: 'Test', productPrice: 20000 },
  ];


  if (results.length === 0 && searchedName.trim().toLowerCase() === 'dummy') {
    return (
      <div className="container mt-4">
        <h2 className="fw-bold mb-4">Search Results for: <span className="text-primary">{searchedName}</span></h2>
        <ul>
          {dummyProducts.map(product => (
            <li key={product._id}>{product.productName} <span className="text-muted">({product.category})</span></li>
          ))}
        </ul>
        <div className="text-muted small">(Hiển thị dữ liệu mẫu do API không trả về kết quả)</div>
      </div>
    );
  }

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">Search Results for: <span className="text-primary">{searchedName}</span></h2>
      {results.length > 0 ? (
        <div className="row row-cols-2 row-cols-md-3 row-cols-xl-6 g-3">
          {results.map(p => (
            <div className="col" key={p._id || p.id}>
              <Link
                to={`/product/${p._id}`}
                className="text-decoration-none text-dark"
              >
              <div className="card h-100">
                <img src={p.productImage} className="card-img-top" alt={p.productName} />
                <div className="card-body">
                  <h6 className="card-title">{p.productName}</h6>
                  <p className="card-text text-danger fw-bold">{p.productPrice?.toLocaleString()}₫</p>
                </div>
              </div>
              </Link>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-muted">No products found.</div>
      )}
    </div>
  );
}

