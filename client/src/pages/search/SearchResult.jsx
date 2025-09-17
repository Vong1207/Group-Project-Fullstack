// # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Trong Nhan
// # ID: s3975356
import { useLocation, Link } from 'react-router-dom';
import { useState, useEffect } from 'react';
import Navbar from '../../pages/partials/Navbar.jsx';
import Footer from '../../pages/partials/Footer.jsx';
import './SearchResult.css';


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

  return (
    <div className='d-flex flex-column min-vh-100'>
      <Navbar />
        <div className="container mt-4 flex-fill">
          <h2 className="fw-bold mb-4">Search Results for: <span className="goldenrod">{searchedName}</span><small className='eerieBlack'>{` (${results.length})`}</small></h2>
          {results.length > 0 ? (
            <div className='row mx-0 gy-4 mb-4'>
              {results.map((p, idx) => (
                <div key={p._id || p.id} className='col-lg-4 col-md-6 col-12'>
                  <Link to={`/product/${p._id || p.id}`}>
                    <div className='resultCard'>
                      <img className='w-100 resultImage' src={p.productImage} alt="Product Image" />
                      <div className='my-3 mx-3'>
                        <p className='resultName mb-2 fw-bold'>{p.productName}</p>
                        <p className='resultPrice mb-0 fw-bold'>{p.productPrice.toLocaleString()}₫</p>
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
      <Footer />
    </div>
  );
}

