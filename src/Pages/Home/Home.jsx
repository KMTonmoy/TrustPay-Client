import React from 'react';
import Money from '../../Components/Money/Money';
import TransactionList from '../../Components/Trangection/Trangection';
import Info from '../../Components/InfoBox/Info';

const Home = () => {
    return (
        <div>
            <Money />
            <Info />
            <TransactionList></TransactionList>
        </div>
    );
};

export default Home;