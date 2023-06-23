import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";
import ProductDetails from "../components/Products/ProductDetails";
import { useSelector } from 'react-redux';


const ProductDetailsPage = () => {
    const { name } = useParams();
    const [data,setData] = useState(null);
    const productName = name.replace(/-/g, " ");
    const {allProducts}=useSelector((state)=>state.products)
    
    useEffect(() => {
        const data = allProducts.find((i) => i.name === productName);
        setData(data);
    }, [allProducts])

    return (
        <div>
            <Header />
            <ProductDetails data={data} />
            <Footer />
        </div>
    );
};

export default ProductDetailsPage;