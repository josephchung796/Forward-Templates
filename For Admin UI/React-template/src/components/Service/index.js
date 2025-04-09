import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";

import { ethers } from "ethers";
import AOS from "aos";
import GLightbox from "glightbox";

import ServiceItem from "./ServiceItem";
import MintService from "./MintService";
import TransferService from "./TransferService";

import { executeContractFunction, fetchAppData } from "../../lib/utils";

const Service = () => {
  const [subdomain, setSubdomain] = useState("");
  const [tokenName, setTokenName] = useState(
    "Token name will be displayed here"
  );
  const [tokenSymbol, setTokenSymbol] = useState(
    "Token symbol will be displayed here"
  );
  const [mintTx, setMintTx] = useState(
    "Token mint transaction hash will be displayed here"
  );
  const [transferTx, setTransferTx] = useState(
    "Token transfer transaction hash will be displayed here"
  );
  const [mintAmount, setMintAmount] = useState("");
  const [receiverAddress, setReceiverAddress] = useState("");
  const [sendAmount, setSendAmount] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000 });
    GLightbox({ selector: ".glightbox" });

    window.addEventListener("message", (event) => {
      if (event.data.type === "urlData") {
        setSubdomain(event.data.payload);
      }
    });

    const toggleScrolled = () => {
      document.body.classList.toggle("scrolled", window.scrollY > 100);
    };

    window.addEventListener("scroll", toggleScrolled);
    return () => window.removeEventListener("scroll", toggleScrolled);
  }, []);

  const handleRead = async (index, setter) => {
    try {
      const app = await fetchAppData(subdomain);
      if (app.adminAppId) {
        const result = await executeContractFunction(
          app.adminAppId,
          app.contractAbi[index].name
        );
        setter(result.result);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleWrite = async (index, setter, param1 = null, param2 = null) => {
    try {
      if (!window.ethereum) throw new Error("Please install MetaMask!");

      const app = await fetchAppData(subdomain);
      if (!app.adminAppId) throw new Error("Invalid application data");

      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const currentNetwork = await provider.getNetwork();
      if (currentNetwork.chainId !== app.deployedNetwork.chainId)
        await switchChain(app.deployedNetwork);

      const signer = await provider.getSigner();
      const contract = new ethers.Contract(
        app.contractAddress,
        app.contractAbi,
        signer
      );

      let tx;
      if (param1 && param2)
        tx = await contract[app.contractAbi[index].name](param1, param2);
      else if (param1 && !param2)
        tx = await contract[app.contractAbi[index].name](param1);
      await tx.wait();
      setter(tx.hash);
    } catch (error) {
      console.error(error);
    }
  };

  // Add chain switching function
  const switchChain = async (network) => {
    try {
      await window.ethereum.request({
        method: "wallet_switchEthereumChain",
        params: [{ chainId: `0x${network.chainId.toString(16)}` }],
      });
    } catch (switchError) {
      // If chain not added in wallet, add it
      if (switchError.code === 4902) {
        try {
          await window.ethereum.request({
            method: "wallet_addEthereumChain",
            params: [
              {
                ...network,
                chainId: `0x${network.chainId.toString(16)}`,
              },
            ],
          });
        } catch (addError) {
          throw new Error("Failed to add network");
        }
      }
      throw new Error("Failed to switch network");
    }
  };

  return (
    <section id="services" className="services section light-background">
      <Container className="section-title" data-aos="fade-up">
        <h2>Services</h2>
        <p>Explore our services below</p>
      </Container>
      <Container>
        <Row className="gy-4">
          <ServiceItem
            icon="bi-activity"
            title="Get Token Name"
            content={tokenName}
            onClick={() => handleRead(8, setTokenName)}
          />
          <ServiceItem
            icon="bi-bounding-box-circles"
            title="Get Token Symbol"
            content={tokenSymbol}
            onClick={() => handleRead(9, setTokenSymbol)}
          />
          <MintService
            handleWrite={handleWrite}
            txHash={mintTx}
            amount={mintAmount}
            setAmount={setMintAmount}
            setMintTx={setMintTx}
          />
          <TransferService
            handleWrite={handleWrite}
            txHash={transferTx}
            receiver={receiverAddress}
            setReceiver={setReceiverAddress}
            amount={sendAmount}
            setAmount={setSendAmount}
            setTransferTx={setTransferTx}
          />
        </Row>
      </Container>
    </section>
  );
};

export default Service;
