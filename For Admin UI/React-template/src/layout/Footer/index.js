import React from "react";
import { Container } from "react-bootstrap";

const Footer = () => (
  <footer id="footer" className="footer">
    <Container className="footer-top">
      {/* Footer content same as original */}
    </Container>
    <Container className="copyright text-center mt-4">
      <p>
        © <strong className="px-1 sitename">Forward Protocol</strong> All Rights
        Reserved
      </p>
    </Container>
  </footer>
);

export default Footer;
