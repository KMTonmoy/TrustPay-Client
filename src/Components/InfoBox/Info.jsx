import React, { useEffect, useState } from 'react';
import CountUp from 'react-countup'; // Import react-countup

const Info = () => {
    const [users, setUsers] = useState([]);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await fetch('http://localhost:8000/users');
                if (!response.ok) {
                    throw new Error('Failed to fetch users');
                }
                const data = await response.json();
                setUsers(data);
            } catch (error) {
                console.error('Error fetching users:', error);
            }
        };

        fetchUsers();
    }, []);

    const agentCount = users.filter(user => user.role === 'agent').length;

    return (
        <div className='flex justify-center flex-col gap-5 md:flex-row md:justify-evenly p-10'>
            <div className="bg-gradient-to-r from-purple-400 to-blue-500 p-10 rounded-2xl w-full md:w-[450px] h-[150px]">
                <span role="img" aria-label="total users" className="text-3xl text-white mr-4">👥</span>
                <p className="text-xl font-semibold text-white capitalize">
                    Total Users: <CountUp end={users.length} duration={2} separator="," />
                </p>
            </div>
            <div className="bg-gradient-to-r from-yellow-400 to-pink-500 p-10 rounded-2xl w-full md:w-[450px] h-[150px]">
                <span role="img" aria-label="total agents" className="text-3xl text-white mr-4">🕴️</span>
                <p className="text-xl font-semibold text-white capitalize">
                    Total Agents: <CountUp end={agentCount} duration={2} separator="," />
                </p>
            </div>
            <div className="bg-gradient-to-r from-green-400 to-blue-500 p-10 rounded-2xl w-full md:w-[450px] h-[150px]">
                <span role="img" aria-label="total members" className="text-3xl text-white mr-4">🧑‍🤝‍🧑</span>
                <p className="text-xl font-semibold text-white capitalize">
                    Total Members: <CountUp end={users.length} duration={2} separator="," />
                </p>
            </div>
        </div>
    );
};

export default Info;
