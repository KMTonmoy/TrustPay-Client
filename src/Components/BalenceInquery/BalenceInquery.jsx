import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../providers/AuthProvider';

const BalanceInquiry = () => {
    const { user } = useContext(AuthContext);
    const [balance, setBalance] = useState(0);
    const myEmail = user?.email;

    useEffect(() => {
        const fetchBalance = async () => {
            try {
                const response = await fetch(`http://localhost:8000/balance/${myEmail}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch balance');
                }
                const data = await response.json();
                setBalance(data.balance);
            } catch (error) {
                console.error('Error fetching balance:', error);
            }
        };

        fetchBalance();
    }, [myEmail]);

    return (
        <motion.div
            className="flex items-center justify-center h-screen bg-gradient-to-r from-purple-400 to-blue-500 p-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="bg-white p-10 rounded-2xl shadow-lg max-w-md w-full text-center">
                <h2 className="text-3xl font-bold mb-4 text-gray-800">Balance Inquiry</h2>
                <p className="text-xl font-semibold text-gray-600">Current Balance:</p>
                <p className="text-4xl font-bold text-gray-800 mt-4">{balance} Taka</p>
            </div>
        </motion.div>
    );
};

export default BalanceInquiry;
