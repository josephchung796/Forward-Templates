import React from "react";
import { Container } from "react-bootstrap";

const Header = () => (
  <header id="header" className="header d-flex align-items-center fixed-top">
    <Container
      fluid
      className="container-xl position-relative d-flex align-items-center"
    >
      <a href="/" className="logo d-flex align-items-center me-auto">
        <h1 className="sitename">Forward Protocol</h1>
      </a>
      <nav className="navmenu">
        <ul>
          <li>
            <a href="#hero" className="active">
              Home
            </a>
          </li>
          <li>
            <a href="#about">About</a>
          </li>
          <li>
            <a href="#services">Services</a>
          </li>
        </ul>
      </nav>
      <a className="btn-getstarted" href="#services">
        Get Started
      </a>
    </Container>
  </header>
);

export default Header;
