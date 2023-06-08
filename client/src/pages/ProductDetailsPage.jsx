import React from 'react';
import ProductDetails from "../components/Products/ProductDetails";
import Header from '../components/layout/Header';

const ProductDetailsPage = () => {
    return(
        <div>
            <Header />
            <ProductDetails />
            <Footer />
        </div>
    )
}

export default ProductDetailsPage;