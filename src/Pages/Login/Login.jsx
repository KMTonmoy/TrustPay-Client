import React, { useContext, useState } from 'react';
import { Link } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';

const Login = () => {
    const { loading } = useContext(AuthContext);

    const [formData, setFormData] = useState({
        emailPhone: '',
        pin: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const pinMain = formData.pin + 1;
        try {
            const response = await axios.get('http://localhost:8000/users');
            const users = response.data;

            const user = users.find(user => user.email === formData.emailPhone || user.mobileNumber === formData.emailPhone);

            if (user && user.pin === pinMain) {
                const auth = getAuth();
                await signInWithEmailAndPassword(auth, user.email, user.pin);
                toast.success('Logged in successfully!');
            } else {
                toast.error('Invalid email/phone number or PIN.');
            }
        } catch (error) {
            console.error('Error logging in:', error.message);
            toast.error('Failed to log in. Please check your credentials.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-primary">Log in to your account</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="emailPhone" className="block text-lg font-medium text-gray-700">
                                Phone No
                            </label>
                            <input
                                id="emailPhone"
                                name="emailPhone"
                                type="text"
                                autoComplete="emailPhone"
                                required
                                value={formData.emailPhone}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-lg rounded-md"
                            />
                        </div>

                        <div>
                            <label htmlFor="pin" className="block text-lg font-medium text-gray-700">
                                PIN
                            </label>
                            <input
                                id="pin"
                                name="pin"
                                type="password"
                                autoComplete="current-pin"
                                required
                                value={formData.pin}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-lg rounded-md"
                            />
                        </div>

                        <div className="flex items-center justify-between">
                            <div className="text-sm">
                                <Link to="/" className="font-medium text-primary hover:text-primary-dark">
                                    Forgot your password?
                                </Link>
                            </div>
                        </div>

                        <div>
                            <button
                                type="submit"
                                className={`${loading ? 'opacity-50 cursor-not-allowed' : ''} w-full bg-primary text-white py-3 px-4 mt-4 sm:text-lg rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary`}
                                disabled={loading}
                            >
                                {loading ? 'Logging in...' : 'Log in'}
                            </button>
                            <p className="mt-4 text-center text-sm text-gray-600">
                                Don't have an account? <Link to="/signup" className="font-medium text-primary">Create one here</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Login;
