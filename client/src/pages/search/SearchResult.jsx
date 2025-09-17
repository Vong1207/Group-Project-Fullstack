/* # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Your Names (e.g. Nguyen Van Minh)
// # ID: Your Student ID (e.g. 1234567) */
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';


function useQuery() {
  return new URLSearchParams(useLocation().search);
}

export default function SearchResult() {
  const query = useQuery();

  // Extract the searched product name from the query string
  const searchedName = query.get('searchedName') || '';

  // State to hold search results
  const [results, setResults] = useState([]);

  // Fetch search results from backend API when searchedName changes
  useEffect(() => {
    if (searchedName.trim()) {
  fetch('/api/product/searchByName', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name: searchedName })
      })
        .then(res => res.json())
        .then(data => {
          // Ensure data is an array before setting state
          if (Array.isArray(data)) setResults(data);
          else setResults([]);
        })
        .catch(err => {
          // In case of error, fallback to empty results
          setResults([]);
          console.error('Search API error:', err);
        });
    } else {
      // If search term is empty, clear results
      setResults([]);
    }
  }, [searchedName]);

  // Dummy fallback data if API fails
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
  <div className="text-muted small">(Showing dummy data because API did not return results)</div>
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
                  <p className="card-text text-danger fw-bold">{p.productPrice?.toLocaleString()} VND</p>
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

