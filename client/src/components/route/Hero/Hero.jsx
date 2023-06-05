import React from 'react';
import { Link } from "react-router-dom";
import styles from '../../../styles/styles';

const Hero = () => {
    return(
        <div className={`relative min-h-[70vh] 800px:min-h-[80vh] w-full bg-cover bg-no-repeat ${styles.normalFlex}`}
        style={
            {backgroundImage: "url(https://themes.rslahmed.dev/rafcart/assets/images/banner-2.jpg)", }
        }>
            <div className={`${styles.section} w-[90%] 800px:w-[60%]`}>
                <h1 className={`text-[35px] leading-[1.2] 800px:text-[60px] text-[#3d3a3a] font-[600] capitalize`}>
                Best Collection of <br /> HandiCrafts
                </h1>
                <p className="pt-5 text-[16px] font-[Poppins] font-[400] text-[#000000ba]">
                Welcome to Crafted, your ultimate destination for exquisite handicrafts {" "} <br />created by talented artisans from diverse cultures and traditions. {" "} <br />We take pride in curating a vibrant marketplace where you can discover a wide range of {" "} <br />beautifully crafted products that showcase the artistry and creativity of skilled individuals.{" "} <br /> 
                </p>
                <Link to="/products" className="inline-block">
                    <div className={`${styles.button} mt-5`}>
                        <span className="text-[#fff] font-[Poppins] text-[18px]">
                            Shop Now
                        </span>
                    </div>
                </Link>
            </div>
        </div>
    );
};

export default Hero;