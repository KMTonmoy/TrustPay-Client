import { createContext, useEffect, useState } from "react";
import {
    createUserWithEmailAndPassword,
    getAuth,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signOut,
    updateProfile
} from "firebase/auth";
import { app } from "../firebase/firebase.config";
import axios from 'axios';

export const AuthContext = createContext(null);

const auth = getAuth(app);


const AuthProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const createUser = async (email, password) => {
        setLoading(true);
        try {
            await createUserWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error creating user:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const signIn = async (email, password) => {
        setLoading(true);
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (error) {
            console.error("Error signing in:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logOut = async () => {
        setLoading(true);
        try {
            await axios.get(`${import.meta.env.VITE_API_URL}/logout`, {
                withCredentials: true,
            });
            await signOut(auth);
        } catch (error) {
            console.error("Error logging out:", error);
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const updateUserProfile = async (name, pin) => {
        try {
            await updateProfile(auth.currentUser, {
                displayName: name,
                photoURL: pin
            });
        } catch (error) {
            console.error("Error updating user profile:", error);
            throw error;
        }
    };

    const getToken = async (email) => {
        try {
            const { data } = await axios.post(
                `${import.meta.env.VITE_API_URL}/jwt`,
                { email },
                { withCredentials: true }
            );
            return data.token;
        } catch (error) {
            console.error("Error getting token:", error);
            throw error;
        }
    };


    useEffect(() => {
        const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
            setUser(currentUser);
            if (currentUser) {
                try {
                    const token = await getToken(currentUser.email)
                    localStorage.setItem('access-token', token);

                    axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
                } catch (error) {
                    console.error("Error handling auth state change:", error);
                }
            } else {
                localStorage.removeItem('access-token');
            }
            setLoading(false);
        });
        return () => unsubscribe();
    }, []);

    const authInfo = {
        user,
        loading,
        createUser,
        signIn,
        logOut,
        updateUserProfile
    };

    return (
        <AuthContext.Provider value={authInfo}>
            {children}
        </AuthContext.Provider>
    );
};

export default AuthProvider;
