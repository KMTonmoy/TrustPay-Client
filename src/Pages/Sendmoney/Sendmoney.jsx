import React, { useContext, useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from '../../providers/AuthProvider';

const Sendmoney = () => {
    const [recipientNumber, setRecipientNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [totalAmount, setTotalAmount] = useState(0);
    const [showError, setShowError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPinError, setShowPinError] = useState(false);
    const { user } = useContext(AuthContext);
    const userEmail = user?.email;

    const handleSendMoney = async (e) => {
        e.preventDefault();

        let totalWithFee = parseFloat(amount);
        if (totalWithFee > 100) {
            totalWithFee += 5;
        }

        setTotalAmount(totalWithFee);

        if (amount < 50) {
            setShowError(true);
            return;
        }

        setShowError(false);

        const response = await axios.get(`http://localhost:8000/users/${userEmail}`);
        const userData = response.data;

        if (userData.pin === pin) {
            setIsModalOpen(true);
            setShowPinError(false);
        } else {
            setShowPinError(true);
            toast.error('Incorrect PIN. Please try again.');
        }

    };

    const confirmSendMoney = () => {
        toast.success(`Sending ${totalAmount.toFixed(2)} Taka to ${recipientNumber} with PIN ${pin}`);
        setIsModalOpen(false);
    };

    return (
        <div className="flex items-center justify-center min-h-screen bg-gray-100">
            <ToastContainer />
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-4 text-center">Send Money</h2>
                <form onSubmit={handleSendMoney}>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientNumber">
                            Recipient Number
                        </label>
                        <input
                            id="recipientNumber"
                            type="text"
                            className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                            value={recipientNumber}
                            onChange={(e) => setRecipientNumber(e.target.value)}
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
                        {showError && <p className="text-red-500 text-sm mt-2">Amount must be at least 50 Taka</p>}
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="pin">
                            PIN
                        </label>
                        <input
                            id="pin"
                            type="text"
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
                            Send Money
                        </motion.button>
                    </div>
                </form>
            </div>

            <AnimatePresence>
                {isModalOpen && (
                    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                        <motion.div
                            className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 shadow-lg"
                            initial={{ opacity: 0, y: -50 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: 50 }}
                        >
                            <h2 className="text-2xl font-bold mb-4">Confirm Send Money</h2>
                            <p className="mb-4">
                                You are sending {totalAmount.toFixed(2)} Taka to {recipientNumber}.
                            </p>
                            <div className="flex justify-end space-x-4">
                                <button
                                    onClick={() => setIsModalOpen(false)}
                                    className="bg-gray-500 text-white px-4 py-2 rounded"
                                >
                                    Cancel
                                </button>
                                <motion.button
                                    whileHover={{ scale: 1.05 }}
                                    whileTap={{ scale: 0.95 }}
                                    onClick={confirmSendMoney}
                                    className="bg-green-500 text-white px-4 py-2 rounded"
                                >
                                    Send
                                </motion.button>
                            </div>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default Sendmoney;
