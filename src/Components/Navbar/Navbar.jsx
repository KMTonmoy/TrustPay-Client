import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext);

    const handleLogout = () => {
        logOut();
    };

    return (
        <nav className="bg-primary p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">
                    TrustPay
                </Link>
                {user ? (
                    <div className="flex items-center">

                        <>
                            <Link to="/balance" className="text-white mx-2">
                                Balance Inquiry
                            </Link>
                            <Link to="/transactions" className="text-white mx-2">
                                Transaction History
                            </Link>
                        </>
                        {user.role === 'agent' && (
                            <>
                                <Link to="/agent/balance" className="text-white mx-2">
                                    Agent Balance Inquiry
                                </Link>
                                <Link to="/agent/transactions" className="text-white mx-2">
                                    Agent Transaction History
                                </Link>
                            </>
                        )}
                        <button onClick={handleLogout} className="text-white mx-2">
                            Logout
                        </button>
                    </div>
                ) : (
                    <div>
                        <Link to="/login" className="text-white mx-2">
                            Login
                        </Link>
                        <Link to="/register" className="text-white mx-2">
                            Register
                        </Link>
                    </div>
                )}
            </div>
        </nav>
    );
};

export default Navbar;
