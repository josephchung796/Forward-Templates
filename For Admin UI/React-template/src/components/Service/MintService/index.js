import React from "react";
import { Col } from "react-bootstrap";

const MintService = ({ handleWrite, txHash, amount, setAmount, setMintTx }) => (
  <Col xl={3} md={6} className="d-flex" data-aos="fade-up">
    <div className="w-100">
      <div
        className="service-item"
        onClick={() => handleWrite(7, setMintTx, amount)}
      >
        <div className="icon">
          <i className="bi bi-calendar4-week"></i>
        </div>
        <h4>
          <span className="stretched-link">Mint Tokens</span>
        </h4>
        <p className="p-result">{txHash}</p>
      </div>
      <input
        className="form-control mt-3"
        type="text"
        placeholder="Token amount to mint"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  </Col>
);

export default MintService;
