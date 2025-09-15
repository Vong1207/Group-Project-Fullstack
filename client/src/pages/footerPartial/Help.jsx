// # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Your Names (e.g. Nguyen Van Minh)
// # ID: Your Student ID (e.g. 1234567)
import React from "react";

export default function Help() {
  return (
    <div className="container py-5">
      <h1>Help</h1>
      <p>
        For assistance, please refer to the FAQ section or contact our support
        team at CartelloGroup2025@gmail.com. This website is for demo purposes
        only; no real transactions or support are provided.
      </p>
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
  );
}
