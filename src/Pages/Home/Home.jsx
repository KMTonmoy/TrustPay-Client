import React, { useContext } from 'react';
import Money from '../../Components/Money/Money';

import Info from '../../Components/InfoBox/Info';
import { AuthContext } from '../../providers/AuthProvider';
import Trangection from '../../Components/Trangection/Trangection';

const Home = () => {
    const { user } = useContext(AuthContext)
    console.log(user)
    return (
        <div>
            <Money />
            <Info />
            <Trangection />
        </div>
    );
};

export default Home;