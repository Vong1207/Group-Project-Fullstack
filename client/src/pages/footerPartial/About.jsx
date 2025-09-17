// # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Trong Nhan, Nguyen Vu Linh
// # ID: s3975356, s3999487
import React from "react";
import Navbar from "../partials/Navbar.jsx";
import Footer from "../partials/Footer.jsx";

export default function About() {
  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h1>About This Project</h1>

        <p>
          This project aims to develop an e-commerce web application that
          provides customers with a friendly and hassle-free online buying
          experience. Users can browse products, view information through
          interactive image previews, and manage their shopping cart
          efficiently. While the full checkout process is simulated, real
          payment functionality has not yet been integrated.
        </p>

        <h3>Intended Users</h3>
        <p>
          The intended users of this application are general online shoppers,
          especially individuals looking for a convenient way to purchase
          clothing items without visiting physical stores. Additionally, the
          platform serves as a foundation for store owners or developers who may
          wish to extend the system with more features, such as secure payment
          gateways or inventory management tools.
        </p>

        <h3>Problem Statement</h3>
        <p>
          This application addresses the lack of lightweight and comfortable
          web-based shopping experiences for interactive clothing browsing. Many
          current systems are too complex for small businesses or lack engaging
          features for consumers. By emphasizing a minimalist design, intuitive
          navigation, and interactive previews, this app lowers the barrier to
          entry for both developers and consumers in the e-commerce space.
        </p>

        <h3>Project Scope</h3>
        <p>
          The scope of this project includes implementing essential features of
          an e-commerce site: product browsing, image preview on selection, cart
          functionality (add/remove), and a mock checkout process. Real payment
          processing and recommendation systems are out of scope for this
          version but are planned for future iterations.
        </p>

        <h3>Purpose of This Report</h3>
        <p>
          The purpose of the report is to document the application’s evolution
          — from initial planning through to design, implementation, and
          system assessment. It also includes a summary of challenges faced,
          lessons learned, and suggestions for future enhancements.
        </p>

        <hr className="my-5" />

        <h2>Marketplace Context and Rationale</h2>

        <p>
          Online marketplace websites have been one of the most prevalent
          alternatives to e-commerce, bringing together buyers and sellers in a
          web-based, convenient setting. Well-known brands such as Shopee,
          Lazada, Amazon, and eBay demonstrate the power of online marketplaces
          to revamp the way individuals buy and sell products by offering a vast
          selection of products, quick product discovery, and easy order
          management.
        </p>

        <p>
          Even though such monstrous systems arrive pre-stacked with features,
          they prove to be too advanced for small enterprises or developers who
          demand a basic foundation. The majority of start-ups need an easy
          solution that will have account management, product browsing, shopping
          cart functionality, and order management without involving
          high-infrastructure or intricate integrations like payment gateways.
        </p>

        <h3>Key Success Factors for E-Commerce Systems</h3>
        <ul>
          <li>
            <strong>User Experience (UX):</strong> Customers will remain and shop
            where navigation is easy, checkout operations are seamless, and
            interaction with products is responsive.
          </li>
          <li>
            <strong>Interactivity:</strong> Real-time shopping cart updates,
            order tracking, and vendor management improve trust and engagement.
          </li>
          <li>
            <strong>Accessibility:</strong> Cross-device accessibility and
            accessible design allow users to shop from desktops, tablets, or
            mobile phones in comfort.
          </li>
        </ul>

        <h3>What This System Offers</h3>
        <p>
          Our project extends those concepts by developing a lightweight web
          application for e-commerce wherein users can:
        </p>
        <ul>
          <li>Customers register, browse, add to cart, and purchase.</li>
          <li>Vendors manage product lists and fill orders received.</li>
          <li>Shippers see assigned deliveries and update status (delivered/cancelled).</li>
        </ul>

        <p>
          Unlike large-commerce platforms that rely on high volumes, this system
          intentionally does not include a payment gateway, focusing instead on
          the essential shopping-to-delivery flow. This makes the application
          easier to deploy, test, and scale in future work.
        </p>

        <p>
          Briefly put, the project exists at the intersection of research and
          practice — a well-organized but not overly complex depiction of how
          contemporary e-commerce sites operate, while remaining simple enough to
          build on for the purposes of a university-level software project.
        </p>
      </div>

      <Footer />
    </>
  );
}
