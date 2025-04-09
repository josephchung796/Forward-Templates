import React from "react";

import Header from "./layout/Header";
import Footer from "./layout/Footer";
import Hero from "./components/Hero";
import Service from "./components/Service";

import "aos/dist/aos.css";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";

const App = () => {
  return (
    <div className="index-page">
      <Header />
      <main className="main">
        <Hero />
        <Service />
      </main>
      <Footer />
    </div>
  );
};

export default App;
