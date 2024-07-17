import React, { useState } from 'react';

const Cashin = () => {
    const [agentPhone, setAgentPhone] = useState('');
    const [amount, setAmount] = useState('');
    const [pin, setPin] = useState('');

    const handleCashinRequest = () => {
        // Handle cash-in request logic here
        console.log(`Agent Phone: ${agentPhone}, Amount: ${amount}, PIN: ${pin}`);
        // Reset form after submission (optional)
        setAgentPhone('');
        setAmount('');
        setPin('');
    };

    return (
        <div className="flex justify-center items-center h-screen">
            <div className="w-full max-w-md bg-white p-8 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Cash In Request</h2>
                <form className="space-y-4">
                    <div>
                        <label htmlFor="agentPhone" className="block text-sm font-medium text-gray-700">
                            Agent Phone Number
                        </label>
                        <input
                            id="agentPhone"
                            type="text"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            placeholder="Enter agent's phone number"
                            value={agentPhone}
                            onChange={(e) => setAgentPhone(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="amount" className="block text-sm font-medium text-gray-700">
                            Amount
                        </label>
                        <input
                            id="amount"
                            type="number"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            placeholder="Enter amount to cash in"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <label htmlFor="pin" className="block text-sm font-medium text-gray-700">
                            PIN
                        </label>
                        <input
                            id="pin"
                            type="password"
                            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-primary focus:ring focus:ring-primary focus:ring-opacity-50"
                            placeholder="Enter PIN"
                            value={pin}
                            onChange={(e) => setPin(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <button
                            type="button"
                            onClick={handleCashinRequest}
                            className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-white bg-primary hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                        >
                            Request Cash In
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Cashin;
