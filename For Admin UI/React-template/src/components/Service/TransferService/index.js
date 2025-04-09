import React from "react";
import { Col } from "react-bootstrap";

const TransferService = ({
  handleWrite,
  txHash,
  receiver,
  setReceiver,
  amount,
  setAmount,
  setTransferTx,
}) => (
  <Col xl={3} md={6} className="d-flex" data-aos="fade-up">
    <div className="w-100">
      <div
        className="service-item"
        onClick={() => handleWrite(11, setTransferTx, receiver, amount)}
      >
        <div className="icon">
          <i className="bi bi-calendar4-week"></i>
        </div>
        <h4>
          <span className="stretched-link">Transfer Token</span>
        </h4>
        <p className="p-result">{txHash}</p>
      </div>
      <input
        className="form-control mt-3"
        placeholder="Receiver address"
        value={receiver}
        onChange={(e) => setReceiver(e.target.value)}
      />
      <input
        className="form-control mt-3"
        placeholder="Token amount to send"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
      />
    </div>
  </Col>
);

export default TransferService;
