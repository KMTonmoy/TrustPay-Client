import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../providers/AuthProvider';
import axios from 'axios';
import CountUp from 'react-countup';
const BalanceInquiry = () => {
    const { user } = useContext(AuthContext);
    const [myMoney, setMyBalance] = useState(0);

    const mobile = user?.photoURL;

    useEffect(() => {
        if (mobile) {
            fetchUserBalance(mobile);
        }
    }, [mobile]);

    const fetchUserBalance = (mobileNumber) => {
        axios.get(`http://localhost:8000/users/mobile/${mobileNumber}`)
            .then(response => {
                setMyBalance(response.data.money);
            })
            .catch(error => {
                console.error('Error fetching user balance:', error);
            });
    };
    return (
        <motion.div
            className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-blue-500 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Current Balance:</h2>
                <p className="text-4xl font-bold text-gray-800 mt-4"><CountUp end={myMoney} duration={2} separator="," />  Taka</p>
            </div>
        </motion.div>
    );
};

export default BalanceInquiry;
