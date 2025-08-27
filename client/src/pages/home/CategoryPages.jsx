// client/src/pages/home/CategoryPage.jsx

import { useParams, useLocation, Link } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CategoryPage() {
  const { categoryName } = useParams(); // lấy từ URL
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const searchedName = query.get("searchedName") || "";

  useEffect(() => {
    // Hàm fetch toàn bộ sản phẩm theo category
    const fetchAllByCategory = () => {
      fetch(
        `http://localhost:3000/products/category/${encodeURIComponent(
          categoryName
        )}`
      )
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          setFilteredProducts(data);
        })
        .catch((err) => {
          setProducts([]);
          setFilteredProducts([]);
          console.error("Fetch all by category error:", err);
        });
    };

    if (searchedName.trim()) {
      // Gọi API searchByName, sau đó filter theo category ở FE
      fetch("/api/products/searchByName", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: searchedName }),
      })
        .then((res) => {
          if (!res.ok) throw new Error("API searchByName failed");
          return res.json();
        })
        .then((data) => {
          // Nếu không có data hoặc không phải mảng, fallback sang fetchAllByCategory
          if (!Array.isArray(data)) {
            fetchAllByCategory();
            return;
          }
          // So sánh category không phân biệt hoa thường, khoảng trắng
          const filtered = data.filter(
            (p) =>
              p.category &&
              p.category.trim().toLowerCase() ===
                categoryName.trim().toLowerCase()
          );
          setFilteredProducts(filtered);
          setProducts([]); // Không dùng nữa
        })
        .catch((err) => {
          console.error("Fetch searchByName error:", err);
          // Nếu lỗi, fallback sang fetchAllByCategory
          fetchAllByCategory();
        });
    } else {
      fetchAllByCategory();
    }
  }, [categoryName, searchedName]);

  return (
    <div className="container mt-4">
      <h2 className="fw-bold mb-4">{categoryName}</h2>

      {/* Sort & Filter UI (display only, no logic) */}
      <div className="d-flex flex-wrap justify-content-between align-items-center mb-4">
        {/* Sort Buttons */}
        <div className="d-flex align-items-center gap-2 flex-wrap">
          <span className="fw-bold me-2">Sort by</span>

          <button className="btn btn-sm btn-outline-dark">
            <i className="fi fi-ts-sort-amount-desc me-1"></i> Price: High to
            Low
          </button>

          <button className="btn btn-sm btn-outline-danger">
            <i className="fi fi-ts-sort-amount-asc me-1"></i> Price: Low to High
          </button>

          <button className="btn btn-sm btn-outline-primary">A - Z</button>

          <button className="btn btn-sm btn-outline-primary">Z - A</button>
        </div>

        <div className="row row-cols-2 row-cols-md-3 row-cols-xl-6 g-3 mt-3">
          {filteredProducts.map((p) => (
            <div className="col" key={p._id}>
              <Link
                to={`/product/${p._id}`}
                className="text-decoration-none text-dark"
              >
                <div className="card h-100">
                  <img
                    src={p.productImage}
                    className="card-img-top"
                    alt={p.productName}
                  />
                  <div className="card-body">
                    <h6 className="card-title">{p.productName}</h6>
                    <p className="card-text text-danger fw-bold">
                      {p.productPrice.toLocaleString()}₫
                    </p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
          {filteredProducts.length === 0 && <p>There are no products.</p>}
        </div>
      </div>
    </div>
  );
}
