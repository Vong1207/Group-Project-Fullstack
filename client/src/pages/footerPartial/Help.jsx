// # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Trong Nhan, Nguyen Vu Linh
// # ID: s3975356, s3999487
import React from "react";
import Navbar from "../partials/Navbar.jsx";
import Footer from "../partials/Footer.jsx";

export default function Help() {
  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <div className="container py-5 flex-grow-1">
        <h1>Help & Contact</h1>

        <p>
          For assistance, please refer to the FAQ section or contact our support
          team. This website is for demo purposes only; no real transactions or
          customer support are provided.
        </p>

        <h4>Contact Information</h4>
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          <li>
            <strong>Address:</strong> 702 Nguyen Van Linh Boulevard, Tan Hung Ward, Ho Chi Minh City, Vietnam
          </li>
          <li>
            <strong>Phone:</strong> (+84) 28 3776 1369
          </li>
          <li>
            <strong>Email:</strong> <a href="mailto:CartelloGroup2025@gmail.com">CartelloGroup2025@gmail.com</a>
          </li>
        </ul>

        <p style={{ fontSize: "0.95em", color: "#888" }}>
          Source: Adapted from{" "}
          <a
            href="https://www.shopify.com/faq"
            target="_blank"
            rel="noopener noreferrer"
          >
            Shopify FAQ
          </a>{" "}
          and{" "}
          <a
            href="https://www.privacypolicies.com/blog/sample-privacy-policy-template/"
            target="_blank"
            rel="noopener noreferrer"
          >
            PrivacyPolicies.com
          </a>
          .
        </p>
      </div>

      <div className="mt-auto">
        <Footer />
      </div>
    </div>
  );
}
