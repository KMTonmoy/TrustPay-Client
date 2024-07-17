import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const Sendmoney = () => {
    const [recipientNumber, setRecipientNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');
    const [showError, setShowError] = useState(false);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showPinError, setShowPinError] = useState(false);
    const [showRecipientError, setShowRecipientError] = useState(false);
    const [recipientData, setRecipientData] = useState(null);
    const [extraCharge, setExtraCharge] = useState(0); // State for extra charge

    const handleSendMoney = async (e) => {
        e.preventDefault();

        const amountFloat = parseFloat(amount);

        if (amountFloat < 50) {
            setShowError(true);
            return;
        }

        setShowError(false);

        try {
            const response = await axios.get(`http://localhost:8000/users/mobile/${recipientNumber}`);
            const data = response.data;

            if (!data) {
                setShowRecipientError(true);
                toast.error('Recipient not found. Please check the number and try again.');
                return;
            }

            // Check if PIN matches

            const mainPin = pin + 1


            if (data.pin !== mainPin) {
                setShowPinError(true);
                toast.error('Incorrect PIN. Please try again.');
                return;
            }

            setShowRecipientError(false);
            setShowPinError(false);
            setRecipientData(data);

            // Calculate extra charge
            if (amountFloat >= 100) {
                setExtraCharge(5);
            } else {
                setExtraCharge(0);
            }

            setIsModalOpen(true);
        } catch (error) {
            console.error('Error sending money:', error.message);
            toast.error('Failed to send money. Please try again.');
        }
    };

    const confirmSendMoney = async () => {
        try {
            const amountFloat = parseFloat(amount);

            const newmoney = parseFloat(recipientData.money) + amountFloat + extraCharge;
            await axios.patch(`http://localhost:8000/users/mobile/${recipientData.mobileNumber}`, { money: newmoney });

            const confirmationMessage = amountFloat >= 100
                ? `Successfully sent ${amountFloat} Taka (+5 Taka extra) to ${recipientNumber}.`
                : `Successfully sent ${amountFloat} Taka to ${recipientNumber}.`;

            toast.success(confirmationMessage);
            setIsModalOpen(false);
            setRecipientNumber('');
            setAmount('');
            setPin('');
            setExtraCharge(0);
        } catch (error) {
            console.error('Error updating money:', error.message);
            toast.error('Failed to update recipient money. Please try again.');
        }
    };

    const openModal = () => {
        setIsModalOpen(true);
    };

    const closeModal = () => {
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
                        {showRecipientError && <p className="text-red-500 text-sm mt-2">Recipient number not found. Please check and try again.</p>}
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
                    <div>
                        <label htmlFor="pin" className="block text-lg font-medium text-gray-700">
                            PIN
                        </label>
                        <input
                            id="pin"
                            name="pin"
                            type="password" // Use type="password" to hide PIN characters
                            autoComplete="current-pin"
                            required
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-lg rounded-md"
                        />
                        {showPinError && <p className="text-red-500 text-sm mt-2">Incorrect PIN. Please try again.</p>}
                    </div>
                    <div className="mb-6 text-center">
                        <motion.button
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            type="submit" // Change to type="submit" to trigger form submission
                            className="bg-primary text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                        >
                            Send Money
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
                                Are you sure you want to send {amount} Taka {amount >= 100 ? `(+5 Taka extra)` : ''} to {recipientNumber}?
                            </p>
                            <div className="flex justify-center space-x-4">
                                <button
                                    onClick={closeModal}
                                    className="bg-gray-200 text-gray-700 font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
                                >
                                    Cancel
                                </button>
                                <button
                                    onClick={confirmSendMoney}
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

export default Sendmoney;
