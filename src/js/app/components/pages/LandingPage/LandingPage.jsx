import React from "react";
import style from "./_layout.module.scss";

import Hero from "../../common/Hero";
import Features from "../../common/Features";
import CallToAction from "../../common/CallToAction";
import Footer from "../../common/Footer/Footer";
import Container from "../../common/Container";

const LandingPage = () => {
  return (
    <Container maxWidth="true">
      <Hero />
      <Features />
      <CallToAction />
      <Footer />
    </Container>
  );
};

export default LandingPage;
