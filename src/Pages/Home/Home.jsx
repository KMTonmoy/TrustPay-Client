import React, { useContext } from 'react';
import Money from '../../Components/Money/Money';
import TransactionList from '../../Components/Trangection/Trangection';
import Info from '../../Components/InfoBox/Info';
import { AuthContext } from '../../providers/AuthProvider';

const Home = () => {
    const { user } = useContext(AuthContext)
    console.log(user)
    return (
        <div>
            <Money />
            <Info />
            <TransactionList></TransactionList>
        </div>
    );
};

export default Home;