import React, { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion'; // Import motion from Framer Motion
import { AuthContext } from '../../providers/AuthProvider';

const Transaction = () => {
    const [transactions, setTransactions] = useState([]);
    const { user } = useContext(AuthContext);
    const mobile = user?.photoURL;

    useEffect(() => {
        if (mobile) {
            fetchTransactions(mobile);
        }
    }, [mobile]);

    const fetchTransactions = async (mobileNumber) => {
        try {
            const response = await axios.get('http://localhost:8000/transaction');
            const allTransactions = response.data;
            const filteredTransactions = allTransactions.filter(
                transaction => transaction.senderMobile === mobileNumber
            );

            const reversedTransactions = filteredTransactions.reverse().slice(0, 10);
            setTransactions(reversedTransactions);
        } catch (error) {
            console.error('Error fetching transactions:', error);
        }
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Transaction History</h2>
            {transactions.length === 0 ? (
                <p>No transactions found.</p>
            ) : (
                <motion.table
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5 }}
                    className="min-w-full bg-white shadow-lg rounded-lg overflow-hidden"
                >
                    <thead className="bg-gray-200">
                        <tr>
                            <th className="py-2 px-4">Transaction ID</th>
                            <th className="py-2 px-4">Recipient Number</th>
                            <th className="py-2 px-4">Amount</th>
                            <th className="py-2 px-4">Date</th>
                            <th className="py-2 px-4">Type</th>
                        </tr>
                    </thead>
                    <motion.tbody
                        initial="hidden"
                        animate="visible"
                        variants={{
                            visible: { opacity: 1, transition: { delay: 0.1, staggerChildren: 0.1 } },
                            hidden: { opacity: 0 },
                        }}
                    >
                        {transactions.map(transaction => (
                            <motion.tr
                                key={transaction._id}
                                className="text-center"
                                variants={{
                                    visible: { opacity: 1, y: 0 },
                                    hidden: { opacity: 0, y: -20 },
                                }}
                            >
                                <motion.td className="py-2 px-4">{transaction.transactionId}</motion.td>
                                <motion.td className="py-2 px-4">{transaction.recipientMobile}</motion.td>
                                <motion.td className="py-2 px-4">{transaction.amount}</motion.td>
                                <motion.td className="py-2 px-4">{new Date(transaction.date).toLocaleString()}</motion.td>
                                <motion.td className="py-2 px-4">{transaction.transactionType}</motion.td>
                            </motion.tr>
                        ))}
                    </motion.tbody>
                </motion.table>
            )}
        </div>
    );
};

export default Transaction;
