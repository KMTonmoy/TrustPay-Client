import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../../providers/AuthProvider';

const Navbar = () => {
    const { user, logOut } = useContext(AuthContext)
    const Logout = () => {
        logOut()
    }
    return (
        <nav className="bg-primary p-4">
            <div className="container mx-auto flex justify-between items-center">
                <Link to="/" className="text-white text-2xl font-bold">TrustPay</Link>
                {
                    user ? (
                        <div>
                            <button onClick={Logout} className="text-white mx-2">Logout</button>
                        </div>
                    ) : (
                        <div>
                            <Link to="/login" className="text-white mx-2">Login</Link>
                            <Link to="/register" className="text-white mx-2">Register</Link>
                        </div>
                    )
                }
            </div>
        </nav>
    );
};

export default Navbar;
