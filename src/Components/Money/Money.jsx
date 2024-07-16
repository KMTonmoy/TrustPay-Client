import React from 'react';
import { IoIosSend } from "react-icons/io";
import { MdOutlineCallReceived } from "react-icons/md";

const Money = () => {
    return (
        <div>
            <div>
                <h1 className='text-center '>$ 5730</h1>
                <h2 className='text-center'>My Balence</h2>
                <div className='flex-wrap flex'>
                    <button className='rounded-full text-2xl '><IoIosSend /></button>
                    <button className='rounded-full text-2xl '><MdOutlineCallReceived /></button>
                    <button className='rounded-full text-2xl '><MdOutlineCallReceived /></button>
                </div>
            </div>
        </div>
    );
};

export default Money;