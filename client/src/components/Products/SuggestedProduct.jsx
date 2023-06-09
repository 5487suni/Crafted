import React, { useEffect, useState } from 'react'
import { productData } from '../../static/data';

const SuggestedProduct = ({data}) => {
    const [Products,setProduct] = useState(null);
    useEffect(() => {
        const d =
        productData && productData.filter((i) => i.category === data.category);
        setProduct(d);
      }, []);
    
  return (
    <div>
          {data ? (
        <div className={`p-4 ${styles.section}`}>
          <h2
            className={`${styles.heading} text-[25px] font-[500] border-b mb-5`}
          >
            Related Product
          </h2>
          <div className="grid grid-cols-1 gap-[20px] md:grid-cols-2 md:gap-[25px] lg:grid-cols-4 lg:gap-[25px] xl:grid-cols-5 xl:gap-[30px] mb-12">
             {
                Products && Products.map((i,index) => (
                    <ProductCard data={i} key={index} />
                ))
             }
      </div>
        </div>
      ) : null}
    </div>
  )
}

export default SuggestedProduct