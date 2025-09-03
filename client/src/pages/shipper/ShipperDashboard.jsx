import React, { useState, useEffect } from "react";
import "./ShipperDashboard.css";
import axios from "axios";

const ShipperDashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [orders, setOrders] = useState([]);
  const [tab, setTab] = useState("orders");
  useEffect(() => {
    // get the orders from server
    const fetchOrders = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/shipper/orders",
          { withCredentials: true }
        );
        setOrders(response.data.orders);
      } catch (error) {
        console.error("Error fetching orders:", error);
      }
    };

    if (tab === "orders") {
      fetchOrders();
    }
  }, [tab]);

  const [shipperName, setShipperName] = useState("Shipper");
  const [avatar, setAvatar] = useState(null);
  const [avatarUrl, setAvatarUrl] = useState("");

  const handleSidebarItemClick = (tabName) => {
    setTab(tabName);
    setSidebarOpen(false);
  };
  const handleNameChange = (e) => setShipperName(e.target.value);
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    setAvatar(file);
    if (file) {
      const reader = new FileReader();
      reader.onload = (ev) => setAvatarUrl(ev.target.result);
      reader.readAsDataURL(file);
    }
  };
  const handleLogout = () => {
    // Xử lý logout thực tế ở đây nếu có
    window.location.href = "/signin";
  };
  return (
    <div className="shipper-dashboard-uiux">
      <aside className={`shipper-sidebar${sidebarOpen ? " open" : ""}`}>
        <div className="sidebar-logo">🚚</div>
        <nav>
          <ul>
            <li
              className={tab === "orders" ? "active" : ""}
              onClick={() => handleSidebarItemClick("orders")}
            >
              <i className="bi bi-box"></i>{" "}
              <span className="sidebar-text">Orders</span>
            </li>
            <li
              className={tab === "account" ? "active" : ""}
              onClick={() => handleSidebarItemClick("account")}
            >
              <i className="bi bi-person"></i>{" "}
              <span className="sidebar-text">Account</span>
            </li>
            <li
              className={tab === "settings" ? "active" : ""}
              onClick={() => handleSidebarItemClick("settings")}
            >
              <i className="bi bi-gear"></i>{" "}
              <span className="sidebar-text">Settings</span>
            </li>
          </ul>
        </nav>
      </aside>
      <main className="shipper-main">
        {/* Bottom tab bar for mobile */}
        <nav className="shipper-tabbar-mobile">
          <button
            className={tab === "orders" ? "active" : ""}
            onClick={() => handleSidebarItemClick("orders")}
          >
            <i className="bi bi-box"></i>
            <span>Orders</span>
          </button>
          <button
            className={tab === "account" ? "active" : ""}
            onClick={() => handleSidebarItemClick("account")}
          >
            <i className="bi bi-person"></i>
            <span>Account</span>
          </button>
          <button
            className={tab === "settings" ? "active" : ""}
            onClick={() => handleSidebarItemClick("settings")}
          >
            <i className="bi bi-gear"></i>
            <span>Settings</span>
          </button>
        </nav>
        <header className="shipper-header">
          <div className="header-title">
            <h1>Shipper Dashboard</h1>
            <span className="header-sub">Fast & Safe Delivery</span>
          </div>
          <div className="header-user">
            <span className="user-avatar">
              {avatarUrl ? (
                <img
                  src={avatarUrl}
                  alt="avatar"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    borderRadius: "50%",
                  }}
                />
              ) : (
                shipperName.charAt(0).toUpperCase()
              )}
            </span>
            <span className="user-name">{shipperName}</span>
          </div>
        </header>
        {tab === "orders" && (
          <section className="orders-section">
            <h2 className="section-title">New Orders</h2>
            <div className="orders-list-uiux">
              {orders.map((order) => (
                <div className="order-card-uiux" key={order._id}>
                  <div className="order-card-header">
                    <span className="order-id">#{order._id}</span>
                    <span className="order-status">{order.status}</span>
                  </div>
                  <div className="order-info">
                    <div className="order-customer">
                      <i className="bi bi-person"></i>{" "}
                      {order.customer.displayName}
                    </div>
                    <div className="order-address">
                      <i className="bi bi-geo-alt"></i>{" "}
                      {order.customer.customerAddress}
                    </div>
                  </div>
                  <ul className="order-items">
                    {order.cart.map((item, idx) => (
                      <li key={idx}>
                        <i className="bi bi-bag"></i> {item.product.productName}
                        <span>x{item.quantity}</span>
                      </li>
                    ))}
                  </ul>
                  <button className="btn-accept-uiux">Accept</button>
                </div>
              ))}
            </div>
          </section>
        )}
        {tab === "account" && (
          <section className="account-section">
            <h2 className="section-title">Account Info</h2>
            <div className="account-form">
              <div className="account-avatar">
                <label htmlFor="avatar-upload">
                  {avatarUrl ? (
                    <img
                      src={avatarUrl}
                      alt="avatar"
                      style={{
                        width: 80,
                        height: 80,
                        objectFit: "cover",
                        borderRadius: "50%",
                      }}
                    />
                  ) : (
                    <span className="user-avatar-large">
                      {shipperName.charAt(0).toUpperCase()}
                    </span>
                  )}
                  <input
                    id="avatar-upload"
                    type="file"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={handleAvatarChange}
                  />
                </label>
              </div>
              <div className="account-field">
                <label htmlFor="shipper-name">Display Name</label>
                <input
                  id="shipper-name"
                  type="text"
                  value={shipperName}
                  onChange={handleNameChange}
                />
              </div>
            </div>
          </section>
        )}
        {tab === "settings" && (
          <section className="settings-section">
            <h2 className="section-title">Settings</h2>
            <button className="btn-logout" onClick={handleLogout}>
              <i className="bi bi-box-arrow-right"></i> Logout
            </button>
          </section>
        )}
      </main>
    </div>
  );
};

export default ShipperDashboard;
