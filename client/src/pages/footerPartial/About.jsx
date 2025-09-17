// # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Trong Nhan
// # ID: s3975356
import React from "react";

export default function About() {
  return (
    <div className="container py-5">
      <h1>About</h1>
      <p>
        This website is a group project for educational purposes. It
        demonstrates a full-stack e-commerce platform, including features for
        customers, vendors, and shippers. All data and content are for demo only
        and do not represent any real business.
      </p>
      <p style={{ fontSize: "0.95em", color: "#888" }}>
        Some content adapted from{" "}
        <a
          href="https://www.shopify.com/about"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shopify About
        </a>{" "}
        and{" "}
        <a
          href="https://en.wikipedia.org/wiki/E-commerce"
          target="_blank"
          rel="noopener noreferrer"
        >
          Wikipedia E-commerce
        </a>
        .
      </p>
    </div>
  );
}
