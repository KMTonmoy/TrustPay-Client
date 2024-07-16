import React, { useContext, useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { AuthContext } from '../../providers/AuthProvider';

const TransactionList = () => {
    const [transactions, setTransactions] = useState([]);
    const { user } = useContext(AuthContext);
    const myEmail = user?.email;

    useEffect(() => {
        const fetchTransactions = async () => {
            try {
                const response = await fetch(`http://localhost:8000/transaction/${myEmail}`);
                if (!response.ok) {
                    throw new Error('Failed to fetch transactions');
                }
                const data = await response.json();
                // Check if data.transactions exists before reversing
                const reversedTransactions = data.transactions ? data.transactions.reverse() : [];
                setTransactions(reversedTransactions);
            } catch (error) {
                console.error('Error fetching transactions:', error);
            }
        };

        fetchTransactions();
    }, [myEmail]);

    return (
        <div className='my-10'>
            <h2 className="text-2xl font-bold mb-4 text-center">My Transaction History</h2>
            {transactions.length === 0 ? (
                <p className="text-center">No transactions found.</p>
            ) : (
                <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                    {transactions.slice(0, 10).map(transaction => (
                        <motion.div
                            key={transaction.id}
                            className="bg-white p-4 shadow-md rounded-lg"
                            initial={{ opacity: 0, y: 50 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.5 }}
                            whileHover={{ scale: 1.05 }}
                        >
                            <p className="text-gray-800"><strong>Transaction ID:</strong> {transaction.id}</p>
                            <p className="text-gray-800"><strong>Type:</strong> {transaction.transactionType}</p>
                            <p className="text-gray-800"><strong>Amount:</strong> {transaction.amount} Taka</p>
                            <p className="text-gray-800"><strong>Recipient Mobile:</strong> {transaction.recipientMobileNumber}</p>
                            <p className="text-gray-800"><strong>Sender Mobile:</strong> {transaction.senderMobileNumber}</p>
                            <p className="text-gray-800"><strong>Date:</strong> {transaction.date}</p>
                        </motion.div>
                    ))}
                </div>
            )}
        </div>
    );
};

export default TransactionList;
