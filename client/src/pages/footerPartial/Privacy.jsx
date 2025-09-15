// # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Your Names (e.g. Nguyen Van Minh)
// # ID: Your Student ID (e.g. 1234567)
import React from "react";

export default function Privacy() {
  return (
    <div className="container py-5">
      <h1>Privacy Policy</h1>
      <p>
        We respect your privacy. This website does not collect or store any
        personal information from users. All data is for demonstration purposes
        only and is not used for any commercial or tracking activities.
      </p>
      <p style={{ fontSize: "0.95em", color: "#888" }}>
        Source: Adapted from{" "}
        <a
          href="https://www.privacypolicies.com/blog/sample-privacy-policy-template/"
          target="_blank"
          rel="noopener noreferrer"
        >
          PrivacyPolicies.com
        </a>{" "}
        and{" "}
        <a
          href="https://www.shopify.com/legal/privacy"
          target="_blank"
          rel="noopener noreferrer"
        >
          Shopify Privacy Policy
        </a>
        .
      </p>
    </div>
  );
}
