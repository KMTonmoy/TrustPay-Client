import React, { useContext, useEffect, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { IoCashOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import { BsCashCoin } from "react-icons/bs";
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';

const Money = () => {
    const { user } = useContext(AuthContext);
    const [currentModal, setCurrentModal] = useState(null);
    const [recipientNumber, setRecipientNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [showError, setShowError] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);







    const handleSendMoney = () => {

        let totalWithFee = parseFloat(amount);
        if (totalWithFee > 100) {
            totalWithFee += 5;
        }

        setTotalAmount(totalWithFee);

        openModal('sendMoney');
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        setShowError(value < 50);
    };
    const handelChangePIN = (e) => {
        const value = e.target.value;
        setPin(value);

    };

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="w-full h-[500px] py-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-4 py-8 sm:px-10">
                    <h1 className="text-4xl font-bold text-center text-primary mb-4">$ 5730</h1>
                    <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">My Balance</h2>
                    <div className="flex justify-center space-x-6">
                        <Link to={'/sendmoney'}>
                            <motion.button
                                onClick={() => handleSendMoney()}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex flex-col items-center p-4 rounded-2xl w-[150px] bg-primary text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                <IoIosSend className="text-4xl mb-2" />
                                <p className="text-lg font-semibold">Send Money</p>
                            </motion.button>
                        </Link>

                        <Link to={'/cashout'}>
                            <motion.button
                                onClick={() => openModal('cashOut')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex flex-col items-center p-4 rounded-2xl w-[150px] bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                <IoCashOutline className="text-4xl mb-2 text-primary" />
                                <p className="text-lg font-semibold">Cash Out</p>
                            </motion.button>
                        </Link>

                        <Link to={'/cashin'}>

                            <motion.button
                                onClick={() => openModal('cashIn')}
                                whileHover={{ scale: 1.05 }}
                                whileTap={{ scale: 0.95 }}
                                className="flex flex-col items-center p-4 rounded-2xl w-[150px] bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                            >
                                <BsCashCoin className="text-4xl mb-2 text-primary" />
                                <p className="text-lg font-semibold">Cash In</p>
                            </motion.button>

                        </Link>

                    </div>
                </div>
            </div>

        </div>
    );
};

export default Money;