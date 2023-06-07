import React, { useState } from 'react';
import { RxCross1 } from 'react-icons/rx';
import { IoBagHandleOutline } from "react-icons/io5";
import { HiPlus, HiOutlineMinus } from "react-icons/hi";
import styles from '../../styles/styles';
import { Link } from "react-router-dom";

const Cart = ({ setOpenCart }) => {

    const cartData = [
        {
            name: "Iphone 14 pro max 256gb ssd and 8gb ram silver colour",
            description: "test",
            price: 999,
        },
        {
            name: "Iphone 14 pro max 256gb ssd and 8gb ram silver colour",
            description: "test",
            price: 999,
        },
        {
            name: "Iphone 14 pro max 256gb ssd and 8gb ram silver colour",
            description: "test",
            price: 999,
        },

    ]
    return (
        <div className='fixed top-0 left-0 w-full bg-[#0000004b] h-screen z-10'>
            <div className="fixed top-0 right-0 min-h-full w-[25%] bg-white flex flex-col justify-between shadow-sm">
                <div>
                    <div className="flex w-full justify-end pt-4 pr-5">
                        <RxCross1
                            size={15}
                            className="cursor-pointer"
                            onClick={() => setOpenCart(false)}
                        />
                    </div>
                    {/* Item length */}
                    <div className={`${styles.normalFlex} p-4`}>
                        <IoBagHandleOutline size={25} />
                        <h5 className="pl-2 text-[20px] font-[500]">3 items</h5>
                    </div>

                    {/* cart Single Items */}
                    <div className="w-full border-t">
                        {cartData && cartData.map((i, index) => (
                            <CartSingle key={index} data={i} />
                        ))
                        }
                    </div>
                </div>

                <div className="px-5 mb-3">
                    {/* checkout buttons */}
                    <Link to="/checkout">
                        <div className={`h-[45px] flex items-center justify-center w-[100%] bg-[#617A55] rounded-[5px]`}>
                            <h1 className="text-[#fff] text-[18px] font-[600]">
                                Checkout Now (USD$876)
                            </h1>
                        </div>
                    </Link>
                </div>

            </div>
        </div>
    )
}

const CartSingle = ({ data }) => {
    const [value, setValue] = useState(1);
    const totalPrice = data.price * value;

    return (
        <div className="border-b p-4">
            <div className="w-full flex items-center">
                <div>
                    <div className={`${styles.normalFlex} bg-[#617A55] border border-[#99A98F] rounded-full w-[25px] h-[25px] justify-center cursor-pointer`}
                        onClick={() => setValue(value + 1)}
                    >
                        <HiPlus size={18} color="#fff" />
                    </div>
                    <span className="pl-[10px]">{value}</span>
                    <div className="bg-[#a7abb14f] rounded-full w-[25px] h-[25px] flex items-center justify-center cursor-pointer"
                        onClick={() => setValue(value === 1 ? 1 : value - 1)}
                    >
                        <HiOutlineMinus size={16} color="#7d879c" />
                    </div>
                </div>
                <img
                    src="data:image/jpeg;base64,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"
                    alt=""
                    className="w-[80px] h-[80px] ml-2 mr-2 rounded-[5px]"
                />
                <div className="pl-[5px]">
                    <h1>{data.name}</h1>
                    <h4 className="font-[400] text-[15px] text-[#00000082]">
                        ${data.price} * {value}
                    </h4>
                    <h4 className="font-[600] text-[17px] pt-[3px] text-[#617A55] font-Roboto">
                        US${totalPrice}
                    </h4>
                </div>
                <RxCross1
                    className="cursor-pointer"
                />
            </div>
        </div>
    )
}

export default Cart;