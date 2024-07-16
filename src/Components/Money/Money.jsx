import React, { useContext, useState } from 'react';
import { IoIosSend } from "react-icons/io";
import { IoCashOutline } from "react-icons/io5";
import { motion } from 'framer-motion';
import { BsCashCoin } from "react-icons/bs";
import { AuthContext } from '../../providers/AuthProvider';

const Money = () => {
    const { user } = useContext(AuthContext);
    const [isSendMoneyModalOpen, setIsSendMoneyModalOpen] = useState(false);
    const [isCashOutModalOpen, setIsCashOutModalOpen] = useState(false);
    const [isCashInModalOpen, setIsCashInModalOpen] = useState(false);
    const [recipientNumber, setRecipientNumber] = useState('');
    const [amount, setAmount] = useState('');
    const [showError, setShowError] = useState(false);
    const [totalAmount, setTotalAmount] = useState(0);

    const openSendMoneyModal = () => setIsSendMoneyModalOpen(true);
    const closeSendMoneyModal = () => setIsSendMoneyModalOpen(false);
    const openCashOutModal = () => setIsCashOutModalOpen(true);
    const closeCashOutModal = () => setIsCashOutModalOpen(false);
    const openCashInModal = () => setIsCashInModalOpen(true);
    const closeCashInModal = () => setIsCashInModalOpen(false);

    const handleSendMoney = () => {
        // Handle sending money logic here
        console.log(`Sending ${amount} Taka to ${recipientNumber}`);

        let totalWithFee = parseFloat(amount);

        // Apply fee if amount is over 100 Taka
        if (totalWithFee > 100) {
            totalWithFee += 5; // Add 5 Taka fee
        }

        // Set total amount state
        setTotalAmount(totalWithFee);

        // Open the modal
        openSendMoneyModal();
    };

    const handleAmountChange = (e) => {
        const value = e.target.value;
        setAmount(value);
        setShowError(value < 50);
    };

    return (
        <div className="bg-gray-100 flex items-center justify-center">
            <div className="w-full h-[500px] py-20 mx-auto bg-white shadow-md rounded-lg overflow-hidden">
                <div className="px-4 py-8 sm:px-10">
                    <h1 className="text-4xl font-bold text-center text-primary mb-4">$ 5730</h1>
                    <h2 className="text-xl font-semibold text-center text-gray-700 mb-6">My Balance</h2>
                    <div className="flex justify-center space-x-6">
                        <motion.button
                            onClick={handleSendMoney}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center p-4 rounded-2xl w-[150px] bg-primary text-white hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            <IoIosSend className="text-4xl mb-2" />
                            <p className="text-lg font-semibold">Send Money</p>
                        </motion.button>
                        <motion.button
                            onClick={openCashOutModal}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center p-4 rounded-2xl w-[150px] bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            <IoCashOutline className="text-4xl mb-2 text-primary" />
                            <p className="text-lg font-semibold">Cash Out</p>
                        </motion.button>
                        <motion.button
                            onClick={openCashInModal}
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.95 }}
                            className="flex flex-col items-center p-4 rounded-2xl w-[150px] bg-gray-200 text-gray-700 hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500"
                        >
                            <BsCashCoin className="text-4xl mb-2 text-primary" />
                            <p className="text-lg font-semibold">Cash In</p>
                        </motion.button>
                    </div>
                </div>
            </div>

            {isSendMoneyModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <motion.div
                        className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 shadow-lg"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Send Money</h2>
                        <p className="mb-4">Total amount including fee: ${totalAmount.toFixed(2)}</p>


                        <form>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="recipientNumber">
                                    Recipient Number
                                </label>
                                <input
                                    required
                                    id="recipientNumber"
                                    type="text"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={recipientNumber}
                                    onChange={(e) => setRecipientNumber(e.target.value)}
                                />
                            </div>
                            <div className="mb-4">
                                <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="amount">
                                    Amount
                                </label>
                                <input
                                    required
                                    id="amount"
                                    type="number"
                                    className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
                                    value={amount}
                                    onChange={handleAmountChange}
                                />
                                {showError && <p className="text-red-500 text-sm mt-2">Amount must be at least 50 Taka</p>}
                            </div>
                            <div className="flex justify-between">
                                <button
                                    onClick={handleSendMoney}
                                    className={`px-4 py-2 rounded ${amount < 50 ? 'bg-gray-500 cursor-not-allowed' : 'bg-green-500 text-white cursor-pointer'}`}
                                    disabled={amount < 50}
                                >
                                    Send
                                </button>
                                <button
                                    onClick={closeSendMoneyModal}
                                    className="bg-red-500 text-white px-4 py-2 rounded"
                                >
                                    Close
                                </button>
                            </div>
                        </form>


                    </motion.div>
                </div>
            )}

            {isCashOutModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <motion.div
                        className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 shadow-lg"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Cash Out</h2>
                        <p>Cash out form and details go here.</p>
                        <button onClick={closeCashOutModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
                    </motion.div>
                </div>
            )}

            {isCashInModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <motion.div
                        className="bg-white p-6 rounded-lg max-w-lg w-full mx-4 shadow-lg"
                        initial={{ opacity: 0, y: -50 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 50 }}
                    >
                        <h2 className="text-2xl font-bold mb-4">Cash In</h2>
                        <p>Cash in form and details go here.</p>
                        <button onClick={closeCashInModal} className="mt-4 bg-red-500 text-white px-4 py-2 rounded">Close</button>
                    </motion.div>
                </div>
            )}
        </div>
    );
};

export default Money;
