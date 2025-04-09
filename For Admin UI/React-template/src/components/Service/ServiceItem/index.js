import React from "react";
import { Col } from "react-bootstrap";

const ServiceItem = ({ icon, title, content, onClick }) => (
  <Col xl={3} md={6} className="d-flex" data-aos="fade-up">
    <div className="service-item position-relative" onClick={onClick}>
      <div className="icon">
        <i className={`bi ${icon}`}></i>
      </div>
      <h4>
        <span className="stretched-link">{title}</span>
      </h4>
      <p className="p-result">{content}</p>
    </div>
  </Col>
);

export default ServiceItem;
