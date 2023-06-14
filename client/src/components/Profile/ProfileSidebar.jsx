import React from 'react';
import { useNavigate } from "react-router-dom";
import { RxPerson } from "react-icons/rx";
import { HiOutlineReceiptRefund, HiOutlineShoppingBag } from "react-icons/hi";
import { AiOutlineCreditCard, AiOutlineLogin, AiOutlineLogout, AiOutlineMessage } from "react-icons/ai";
import {
    MdOutlineAdminPanelSettings,
    MdOutlinePassword,
    MdOutlineTrackChanges,
} from "react-icons/md";
import {server} from '../../server'
import axios from 'axios'
import { toast } from "react-toastify";
import { TbAddressBook } from "react-icons/tb";

const ProfileSidebar = ({setActive, active})=> {
    const navigate = useNavigate();
    const logout=()=>{
        console.log("logout")
        axios.get(`${server}/user/logout`,{withCredentials:true}).then((res)=>{
            toast.success(res.data.message)
            window.location.reload(true)
            navigate("/login")
           
        }).catch((err)=>{
            console.log(err.response.data.message)
        })

        
    }
    return(
        <div className='w-full bg-white shadow-sm rounded-[10px] p-4 pt-8'>
            <div className='flex items-center cursor-pointer w-full mb-8'
            onClick = {() => setActive(1)}>
                <RxPerson size={20} color={active === 1 ? "red" : ""} />
                <span className={`pl-3 ${active === 1 ? "text-[red]" : ""}md:block hidden`}>
                    Profile
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8"
            onClick = {() => setActive(2)}>
                <HiOutlineShoppingBag size={20} color={active === 2 ? "red" : ""} />
                <span className={`pl-3 ${active === 2 ? "text-[red]" : ""}md:block hidden`}>
                    Orders
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8"
            onClick = {() => setActive(3)}>
                <HiOutlineReceiptRefund size={20} color={active === 3 ? "red" : ""} />
                <span className={`pl-3 ${active === 3 ? "text-[red]" : ""}md:block hidden`}>
                    Refunds
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8"
            onClick = {() => setActive(4) || navigate("/inbox")}>
                <AiOutlineMessage size={20} color={active === 4 ? "red" : ""} />
                <span className={`pl-3 ${active === 4 ? "text-[red]" : ""}md:block hidden`}>
                    Inbox
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8"
            onClick = {() => setActive(5)}>
                <MdOutlineTrackChanges size={20} color={active === 5 ? "red" : ""} />
                <span className={`pl-3 ${active === 5 ? "text-[red]" : ""}md:block hidden`}>
                    Track Order
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8"
            onClick = {() => setActive(6)}>
                <AiOutlineCreditCard size={20} color={active === 6 ? "red" : ""} />
                <span className={`pl-3 ${active === 6 ? "text-[red]" : ""}md:block hidden`}>
                    Payment Methods
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8"
            onClick = {() => setActive(7)}>
                <TbAddressBook size={20} color={active === 7 ? "red" : ""} />
                <span className={`pl-3 ${active === 7 ? "text-[red]" : ""}md:block hidden`}>
                    Address
                </span>
            </div>

            <div className="flex items-center cursor-pointer w-full mb-8"
            onClick = {logout}>
                <AiOutlineLogout size={20} color={active === 8 ? "red" : ""} />
                <span className={`pl-3 ${active === 8 ? "text-[red]" : ""}md:block hidden`}>
                    Logout
                </span>
            </div>



        </div>
    )
}

export default ProfileSidebar;