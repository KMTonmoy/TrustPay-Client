import React from 'react';

const Login = () => {
    return (
        <div className="min-h-screen bg-gray-100 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-md">
                <h2 className="text-center text-3xl font-extrabold text-primary">Log in to your account</h2>
            </div>

            <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
                <div className="bg-white py-8 px-4 shadow sm:rounded-lg sm:px-10">
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="Enquery" className="block text-lg font-medium text-gray-700">
                                Email address / Phone No
                            </label>
                            <input
                                id="Enquery"
                                name="Enquery"
                                type="text"
                                autoComplete="Enquery"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-lg rounded-md"
                            />
                        </div>

                        <div>
                            <label htmlFor="password" className="block text-lg font-medium text-gray-700">
                                PIN
                            </label>
                            <input
                                id="password"
                                name="password"
                                type="password"
                                autoComplete="current-password"
                                required
                                className="mt-1 block w-full px-3 py-2 border border-gray-300 shadow-sm focus:ring-primary focus:border-primary sm:text-lg rounded-md"
                            />
                        </div>

                        <div>
                            <button
                                type="submit"
                                className="w-full bg-primary text-white py-3 px-4 mt-4 sm:text-lg rounded-md hover:bg-opacity-80 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
                            >
                                Log in
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default Login;
