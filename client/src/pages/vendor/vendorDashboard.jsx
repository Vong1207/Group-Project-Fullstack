import React, { useState } from "react";
import "./vendorDashboard.css";

const mockProducts = [
  { productID: "P001", name: "Brownie Box", price: 120000, stock: 12 },
  { productID: "P002", name: "Matcha Cookies", price: 90000, stock: 8 },
  { productID: "P003", name: "Cheese Cake", price: 150000, stock: 5 },
  { productID: "P004", name: "Croissant Pack", price: 70000, stock: 20 },
];

export default function VendorDashboard() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [tab, setTab] = useState("products"); 
  const [vendorName, setVendorName] = useState("Vendor");
  const [avatarUrl, setAvatarUrl] = useState("");

  // state to save form errors
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [imageFile, setImageFile] = useState(null);
  const [errors, setErrors] = useState({});

  const handleSidebarItemClick = (t) => {
    setTab(t);
    setSidebarOpen(false);
  };

  const handleLogout = () => {
    window.location.href = "/signin";
  };

  const onPickAvatar = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = (ev) => setAvatarUrl(ev.target.result);
    reader.readAsDataURL(file);
  };

  const handleCreateProduct = (e) => {
    e.preventDefault();
    const newErrors = {};

    if (name.trim().length < 10 || name.trim().length > 20) {
      newErrors.name = "Name must be between 10 and 20 characters.";
    }

    if (!price || Number(price) <= 0) {
      newErrors.price = "Price must be a positive number.";
    }

    if (desc.trim().length > 500) {
      newErrors.desc = "Description must be at most 500 characters.";
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    console.log({ name, price, desc, imageFile });
    alert("Product is valid!");

    // Reset form
    setName("");
    setPrice("");
    setDesc("");
    setImageFile(null);
    setErrors({});
  };

  return (
    <div className="vendor-dashboard-uiux d-flex min-vh-100">
      {/* Sidebar */}
      <aside
        className={`vendor-sidebar d-none d-md-flex flex-column align-items-center position-relative shadow-sm ${
          sidebarOpen ? "open" : ""
        }`}
      >
        <div className="sidebar-logo">🛒</div>
        <nav className="w-100">
          <ul className="list-unstyled w-100 mb-0">
            <li
              className={`d-flex align-items-center gap-2 px-4 py-3 ${
                tab === "products" ? "active" : ""
              }`}
              onClick={() => handleSidebarItemClick("products")}
            >
              <i className="bi bi-box-seam" />{" "}
              <span className="sidebar-text">My Products</span>
            </li>
            <li
              className={`d-flex align-items-center gap-2 px-4 py-3 ${
                tab === "add" ? "active" : ""
              }`}
              onClick={() => handleSidebarItemClick("add")}
            >
              <i className="bi bi-plus-circle" />{" "}
              <span className="sidebar-text">Add Product</span>
            </li>
            <li
              className={`d-flex align-items-center gap-2 px-4 py-3 ${
                tab === "account" ? "active" : ""
              }`}
              onClick={() => handleSidebarItemClick("account")}
            >
              <i className="bi bi-person" />{" "}
              <span className="sidebar-text">Account</span>
            </li>
            <li
              className={`d-flex align-items-center gap-2 px-4 py-3 ${
                tab === "settings" ? "active" : ""
              }`}
              onClick={() => handleSidebarItemClick("settings")}
            >
              <i className="bi bi-gear" />{" "}
              <span className="sidebar-text">Settings</span>
            </li>
          </ul>
          <a
            href="/"
            className="btn btn-outline-light rounded-pill position-absolute bottom-0 start-0 m-3 d-inline-flex align-items-center gap-2"
          >
            Get back home
          </a>
        </nav>
      </aside>

      {/* Bottom tab bar (mobile) */}
      <nav className="vendor-tabbar-mobile d-flex d-md-none fixed-bottom align-items-center border-top">
        <button
          className={`flex-fill btn-tab ${tab === "products" ? "active" : ""}`}
          onClick={() => handleSidebarItemClick("products")}
        >
          <i className="bi bi-box-seam" />
          <span>My Products</span>
        </button>
        <button
          className={`flex-fill btn-tab ${tab === "add" ? "active" : ""}`}
          onClick={() => handleSidebarItemClick("add")}
        >
          <i className="bi bi-plus-circle" />
          <span>Add Product</span>
        </button>
        <button
          className={`flex-fill btn-tab ${tab === "account" ? "active" : ""}`}
          onClick={() => handleSidebarItemClick("account")}
        >
          <i className="bi bi-person" />
          <span>Account</span>
        </button>
        <button
          className={`flex-fill btn-tab ${tab === "settings" ? "active" : ""}`}
          onClick={() => handleSidebarItemClick("settings")}
        >
          <i className="bi bi-gear" />
          <span>Settings</span>
        </button>
      </nav>

      {/* Main */}
      <main className="vendor-main d-flex flex-column flex-grow-1">
        {/* Header */}
        <header className="vendor-header d-flex justify-content-between align-items-center py-4 px-4 px-md-5">
          <div className="header-title">
            <h1 className="m-0 fw-bold">Vendor Dashboard</h1>
            <span className="header-sub text-brand">
              Manage products & sales
            </span>
          </div>
          <div className="header-user d-flex align-items-center gap-2">
            <span className="user-avatar rounded-circle d-flex align-items-center justify-content-center fw-semibold">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  className="w-100 h-100 rounded-circle object-fit-cover"
                />
              ) : (
                vendorName.charAt(0).toUpperCase()
              )}
            </span>
            <span className="user-name fw-medium">{vendorName}</span>
          </div>
        </header>

        {/* Products */}
        {tab === "products" && (
          <section className="products-section px-4 pb-4">
            <h2 className="section-title fw-semibold mb-3">My Products</h2>

            <div className="row g-3">
              {mockProducts.map((p) => (
                <div
                  className="col-12 col-md-6 col-lg-4 d-flex"
                  key={p.productID}
                >
                  <article className="card shadow-sm w-100 h-100 border-0">
                    <div className="product-thumb bg-light" />
                    <div className="card-body d-flex flex-column gap-2">
                      <div className="product-name fw-semibold text-dark">
                        {p.name}
                      </div>
                      <div className="d-flex justify-content-between text-secondary">
                        <span className="price">
                          {p.price.toLocaleString("vi-VN")}₫
                        </span>
                        <span className="stock">Stock: {p.stock}</span>
                      </div>
                      <div className="d-flex gap-2 mt-1">
                        <button className="btn btn-outline-secondary btn-sm">
                          Edit
                        </button>
                        <button className="btn btn-dark btn-sm">Delete</button>
                      </div>
                    </div>
                  </article>
                </div>
              ))}
            </div>
          </section>
        )}

        {/* add */}
        {tab === "add" && (
          <section className="add-section px-4 pb-4">
            <h2 className="section-title fw-semibold mb-3">Add Product</h2>

            <div className="card shadow-sm border-0">
              <div className="card-body">
                <form onSubmit={handleCreateProduct}>
                  <div className="row g-3">
                    {/* Product name */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="prodName" className="form-label">
                        Product name
                      </label>
                      <input
                        id="prodName"
                        type="text"
                        className="form-control"
                        placeholder="e.g. Brownie Box"
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                      />
                      {errors.name && (
                        <div className="text-danger">{errors.name}</div>
                      )}
                    </div>

                    {/* Price */}
                    <div className="col-12 col-md-6">
                    <label htmlFor="prodPrice" className="form-label">
                      Price (VND)
                    </label>
                    <div className="input-group w-100">
                      <span className="input-group-text">₫</span>
                      <input
                        id="prodPrice"
                        type="number"
                        className="form-control"
                        placeholder="e.g. 120000"
                        value={price}
                        onChange={(e) => setPrice(e.target.value)}
                      />
                    </div>
                    {errors.price && (
                      <div className="text-danger mt-1">{errors.price}</div>
                    )}
                  </div>


                    {/* Image + static preview box */}
                    <div className="col-12 col-md-6">
                      <label htmlFor="prodImage" className="form-label">
                        Image
                      </label>
                      <input
                        id="prodImage"
                        type="file"
                        accept="image/*"
                        className="form-control"
                        onChange={(e) => setImageFile(e.target.files[0])}
                      />
                    </div>

                    {/* Description */}
                    <div className="col-12">
                      <label htmlFor="prodDesc" className="form-label">
                        Description
                      </label>
                      <textarea
                        id="prodDesc"
                        className="form-control"
                        rows={4}
                        placeholder="Describe your product"
                        value={desc}
                        onChange={(e) => setDesc(e.target.value)}
                      />
                      {errors.desc && (
                        <div className="text-danger mt-1">{errors.desc}</div>
                      )}
                    </div>
                  </div>

                  {/* Actions (layout-only) */}
                  <div className="d-flex gap-2 mt-3">
                    <button type="submit" className="btn btn-primary">
                      Create product
                    </button>
                    <button type="button" className="btn btn-outline-secondary">
                      Reset
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </section>
        )}

        {/* Account */}
        {tab === "account" && (
          <section className="account-section px-4 pb-4">
            <h2 className="section-title fw-semibold mb-3">Account</h2>
            <div className="account-form d-flex align-items-center gap-3 mt-2">
              <div className="account-avatar">
                <label
                  htmlFor="vendor-ava"
                  className="d-inline-flex align-items-center justify-content-center"
                >
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="avatar"
                      className="rounded-circle object-fit-cover"
                      style={{ width: 80, height: 80 }}
                    />
                  ) : (
                    <span className="user-avatar-large rounded-circle d-inline-flex align-items-center justify-content-center fw-bold text-white">
                      {vendorName.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <input
                    id="vendor-ava"
                    type="file"
                    accept="image/*"
                    className="d-none"
                    onChange={onPickAvatar}
                  />
                </label>
              </div>

              <div className="account-field d-flex flex-column gap-1">
                <label
                  htmlFor="vendor-name"
                  className="fw-medium text-dark mb-1"
                >
                  Display Name
                </label>
                <input
                  id="vendor-name"
                  type="text"
                  className="form-control"
                  value={vendorName}
                  onChange={(e) => setVendorName(e.target.value)}
                />
              </div>
            </div>
          </section>
        )}

        {/* Settings */}
        {tab === "settings" && (
          <section className="settings-section px-4 pb-4">
            <h2 className="section-title fw-semibold mb-3">Settings</h2>
            <button
              className="btn btn-brand d-inline-flex align-items-center gap-2"
              onClick={handleLogout}
            >
              <i className="bi bi-box-arrow-right" /> Logout
            </button>
          </section>
        )}
      </main>
    </div>
  );
}
