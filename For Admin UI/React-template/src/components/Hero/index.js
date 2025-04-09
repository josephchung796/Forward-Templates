import React from "react";
import { Container, Row, Col } from "react-bootstrap";

const Hero = () => (
  <section id="hero" className="hero section dark-background">
    <Container>
      <Row className="gy-4">
        <Col
          lg={6}
          className="order-2 order-lg-1 d-flex flex-column justify-content-center"
          data-aos="zoom-out"
        >
          <h1>Better Solutions For Your Business</h1>
          <p>We offer a range of essential services for our ERC20 Token...</p>
          <div className="d-flex">
            <a href="#services" className="btn-get-started">
              Go to Services
            </a>
            <a
              href="https://www.youtube.com"
              className="glightbox btn-watch-video d-flex align-items-center"
            >
              <i className="bi bi-play-circle"></i>
              <span>Watch Video</span>
            </a>
          </div>
        </Col>
        <Col
          lg={6}
          className="order-1 order-lg-2 hero-img"
          data-aos="zoom-out"
          data-aos-delay="200"
        >
          <img
            src="assets/img/hero-img.png"
            className="img-fluid animated"
            alt=""
          />
        </Col>
      </Row>
    </Container>
  </section>
);

export default Hero;
