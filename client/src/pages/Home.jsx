import React from 'react';
import Header from "../components/layout/Header";
import Hero from "../components/route/Hero/Hero";

const Home = () => {
  return (
    <div>
        <Header activeHeading={1}/>
        <Hero />
    </div>
  )
}

export default Home;