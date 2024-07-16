import React, { useContext, useState } from 'react';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { AuthContext } from '../../providers/AuthProvider';
import { Link } from 'react-router-dom';

const Registration = () => {
    const { createUser, user, updateUserProfile } = useContext(AuthContext);
    const [formData, setFormData] = useState({
        name: '',
        pin: '',
        mobileNumber: '',
        email: ''
    });

    console.log(user);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (formData.pin.length !== 5) {
            toast.error('PIN must be a 5-digit number.');
            return;
        }

        const pinMain = formData.pin + 1;

        try {
            await createUser(formData.email, pinMain, formData.mobileNumber);
            toast.success('Registration successful!');
            await updateUserProfile(formData.name, pinMain);

            const userData = {
                name: formData.name,
                pin: pinMain,
                mobileNumber: formData.mobileNumber,
                email: formData.email
            };


            await axios.post('http://localhost:8000/user', userData);

            console.log('User registered successfully:', formData.email);
            setFormData({
                name: '',
                pin: '',
                mobileNumber: '',
                email: ''
            });
        } catch (error) {
            console.error('Error registering user:', error.message);
            toast.error('Failed to register user. Please try again.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-primary">Register an account</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6" onSubmit={handleSubmit}>
                        <div>
                            <label htmlFor="name" className="block text-lg font-medium text-gray-700">
                                Name
                            </label>
                            <input
                                id="name"
                                name="name"
                                type="text"
                                autoComplete="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-lg rounded-md"
                            />
                        </div>

                        <div>
                            <label htmlFor="pin" className="block text-lg font-medium text-gray-700">
                                5-digit PIN
                            </label>
                            <input
                                id="pin"
                                name="pin"
                                type="number"
                                minLength="5"
                                maxLength="5"
                                autoComplete="off"
                                required
                                value={formData.pin}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-lg rounded-md"
                            />
                        </div>

                        <div>
                            <label htmlFor="mobileNumber" className="block text-lg font-medium text-gray-700">
                                Mobile Number
                            </label>
                            <input
                                id="mobileNumber"
                                name="mobileNumber"
                                type="number"
                                autoComplete="tel"
                                required
                                value={formData.mobileNumber}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-lg rounded-md"
                            />
                        </div>

                        <div>
                            <label htmlFor="email" className="block text-lg font-medium text-gray-700">
                                Email address
                            </label>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                autoComplete="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-lg rounded-md"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 px-4 mt-4 sm:text-lg rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                Register
                            </button>
                            <p className="mt-4 text-center text-sm text-gray-600">
                                Already Have An Account!! <Link to={'/login'} className="font-medium text-primary">Please Login</Link>
                            </p>
                        </div>
                    </form>
                </div>
            </div>

            <ToastContainer position="top-center" autoClose={3000} hideProgressBar={false} newestOnTop={false} closeOnClick rtl={false} pauseOnFocusLoss draggable pauseOnHover />
        </div>
    );
};

export default Registration;
