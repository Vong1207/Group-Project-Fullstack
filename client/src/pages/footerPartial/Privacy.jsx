// # RMIT University Vietnam
// # Course: COSC2769 - Full Stack Development
// # Semester: 2025B
// # Assessment: Assignment 02
// # Author: Nguyen Trong Nhan, Nguyen Vu Linh
// # ID: s3975356, s3999487

import React from "react";
import Navbar from "../partials/Navbar.jsx";
import Footer from "../partials/Footer.jsx";;

export default function Privacy() {
  return (
    <>
      <Navbar />

      <div className="container py-5">
        <h1>Privacy Policy</h1>

        <p style={{ fontSize: "0.95em", color: "#555" }}>
          Source: Adapted from{" "}
          <a
            href="https://www.amazon.com/gp/help/customer/display.html?nodeId=468496&ref_=footer_privacy"
            target="_blank"
            rel="noopener noreferrer"
          >
            Amazon Privacy Notice
          </a>{" "}
          (adapted for Cartello)
        </p>

        <p>
          We know that you care how information about you is used and shared,
          and we appreciate your trust that we will do so carefully and
          sensibly. This Privacy Notice describes how Cartello.com and its
          affiliates (collectively "Cartello") collect and process your personal
          information through Cartello products, services, stores, website and
          physical locations, devices and applications that reference this
          Privacy Notice (together "Cartello Services"). By using Cartello
          Services, you are consenting to the practices described in this
          Privacy Notice.
        </p>

        <p>
          Please read our Additional State-Specific Privacy Disclosures and
          Consumer Health Data Privacy Disclosure for additional information
          about the processing of your personal data and your rights under
          applicable U.S. state data privacy laws.
        </p>

        <h3>What Personal Information About Customers Does Cartello Collect?</h3>
        <p>
          We collect your personal information in order to provide and
          continually improve our products and services.
        </p>
        <ul>
          <li>
            <strong>Information You Give Us:</strong> We receive and store any
            information you provide in relation to Cartello Services.
          </li>
          <li>
            <strong>Automatic Information:</strong> We automatically collect and
            store certain types of information about your use of Cartello
            Services, including information about your interaction with
            products, content, and services. Our physical stores may use
            cameras, sensors, and other technology.
          </li>
          <li>
            <strong>Information from Other Sources:</strong> We might receive
            information about you from other sources, such as updated delivery
            and address information from carriers.
          </li>
        </ul>

        <h3>For What Purposes Does Cartello Use Your Personal Information?</h3>
        <p>
          We use your personal information to operate, provide, develop, and
          improve the products and services that we offer. These purposes
          include:
        </p>
        <ul>
          <li>Purchase and delivery of products and services.</li>
          <li>Provide, troubleshoot, and improve Cartello Services.</li>
          <li>Recommendations and personalization.</li>
          <li>Provide voice, image and camera services.</li>
          <li>Comply with legal obligations.</li>
          <li>Communicate with you.</li>
          <li>Advertising (interest-based ads).</li>
          <li>Fraud prevention and credit risks.</li>
        </ul>

        <h3>What About Cookies and Other Identifiers?</h3>
        <p>
          To enable our systems to recognize your browser or device and to
          provide and improve Cartello Services, we use cookies and other
          identifiers. For more information, please read our Cookies Notice.
        </p>

        <h3>Does Cartello Share Your Personal Information?</h3>
        <p>
          We are not in the business of selling our customers' personal
          information to others. We share customers' personal information only
          as described in this Privacy Notice, including with subsidiaries,
          third parties involved in transactions, service providers, and for
          legal compliance.
        </p>

        <h3>How Secure Is Information About Me?</h3>
        <p>
          We work to protect your information during transmission by using
          encryption protocols, follow PCI DSS when handling credit card data,
          and maintain safeguards for storage and disclosure. We also recommend
          using unique passwords and signing out after using shared computers.
        </p>

        <h3>What About Advertising?</h3>
        <p>
          Cartello Services may include third-party advertising and links. We
          provide ad companies with information to serve relevant ads but never
          share your name or directly identifying information. You can adjust
          your advertising preferences in Your Ads Privacy Choices.
        </p>

        <h3>What Information Can I Access in My Account?</h3>
        <p>
          You can access your information, including name, address, payment
          options, profile information, and order history in the "Your Account"
          section of the website.
        </p>

        <h3>What Choices Do I Have?</h3>
        <p>
          You can choose not to provide certain information, adjust communication
          preferences, opt out of personalized ads, manage cookies, and control
          device permissions. You may also request access to or deletion of your
          personal information, as required by applicable law.
        </p>

        <h3>Are Children Allowed to Use Cartello Services?</h3>
        <p>
          Cartello does not sell products for purchase by children. If you are
          under 18, you may use Cartello Services only with the involvement of a
          parent or guardian. We do not knowingly collect personal information
          from children under 13 without parental consent.
        </p>

        <h3>Conditions of Use, Notices, and Revisions</h3>
        <p>
          If you choose to use Cartello Services, your use and any dispute is
          subject to this Notice and our Conditions of Use. Our Privacy Notice
          may change over time, but we will not make material changes that
          reduce protections without customer consent.
        </p>
      </div>

      <Footer />
    </>
  );
}
