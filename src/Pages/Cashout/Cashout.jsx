import React, {useEffect, useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../providers/AuthProvider';

const Cashout = () => {
    const [agentNumber, setAgentNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [showError, setShowError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPinError, setShowPinError] = useState(false);
    const [myBalance, setMyBalance] = useState(0);
    const { user } = useContext(AuthContext);
    const mobile = user?.photoURL;

    const fetchUserBalance = (mobileNumber) => {
        axios.get(`http://localhost:8000/users/mobile/${mobileNumber}`)
            .then(response => {
                setMyBalance(response.data.money);
            })
            .catch(error => {
                console.error('Error fetching user balance:', error);
            });
    };

    useEffect(() => {
        if (mobile) {
            fetchUserBalance(mobile);
        }
    }, [mobile]);

    const handleCashout = async (e) => {
        e.preventDefault();

        const amountFloat = parseFloat(amount);

        if (amountFloat <= 0) {
            setShowError(true);
            return;
        }

        setShowError(false);

        try {
            const response = await axios.get(`http://localhost:8000/users/mobile/${agentNumber}`);
            const agentData = response.data;

            if (!agentData || agentData.role !== 'agent') {
                toast.error('Agent not found or invalid. Please check and try again.');
                return;
            }

            const fee = amountFloat * 0.015; // 1.5% fee
            const totalAmount = amountFloat + fee;

            if (myBalance >= totalAmount) {
                const newAgentMoney = parseFloat(agentData.money) + amountFloat;
                const newSenderMoney = myBalance - totalAmount;

                // Update balances
                await axios.patch(`http://localhost:8000/users/mobile/${agentNumber}`, { money: newAgentMoney });
                await axios.patch(`http://localhost:8000/users/mobile/${mobile}`, { money: newSenderMoney });

                toast.success(`Successfully cashed out ${amountFloat} Taka to Agent ${agentNumber}.`);
                setIsModalOpen(false);
                setAgentNumber('');
                setAmount('');
                setPin('');
                setMyBalance(newSenderMoney);
            } else {
                toast.error('Insufficient balance. Please check your balance and try again.');
            }
        } catch (error) {
            console.error('Error processing cashout:', error);
            toast.error('Failed to process cashout. Please try again.');
        }
    };

    const closeModal = () => {
        setIsModalOpen(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Cash Out</h2>
                <form onSubmit={handleCashout}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="agentNumber">
                            Agent Number
                        </label>
                        <input
                            id="agentNumber"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={agentNumber}
                            onChange={(e) => setAgentNumber(e.target.value)}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                            Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                        {showError && <p className="text-red-500 text-sm mt-2">Amount must be greater than 0.</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pin">
                            PIN
                        </label>
                        <input
                            id="pin"
                            type="password" // Changed type to password for sensitive input
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            required
                        />
                        {showPinError && <p className="text-red-500 text-sm mt-2">Incorrect PIN. Please try again.</p>}
                    </div>
                    <div className="mb-6 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit"
                            className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Cash Out
                        </motion.button>
                    </div>
                </form>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
                        <motion.div
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -50 }}
                            transition={{ duration: 0.3 }}
                            className="bg-white p-8 rounded-lg shadow-lg max-w-md"
                        >
                            <h2 className="text-2xl font-bold mb-4 text-center">Confirmation</h2>
                            <p className="text-lg mb-4">
                                Are you sure you want to cash out {amount} Taka to Agent {agentNumber}?
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={handleCashout}
                                    className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Confirm
                                </button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Cashout;
