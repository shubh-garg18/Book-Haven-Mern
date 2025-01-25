import {
    createUserWithEmailAndPassword,
    GoogleAuthProvider,
    onAuthStateChanged,
    signInWithEmailAndPassword,
    signInWithPopup,
    signOut,
} from "firebase/auth";
import { createContext, useContext, useEffect, useState } from "react";
import { auth } from "../firebase/firebase.config";

const AuthContext = createContext();

export const useAuth = () => {
    const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within a AuthProvider");
    }
    return context;
};

export const AuthProvider = ({ children }) => {
    const [currentUser, setCurrentUser] = useState(null);
    const [loading, setLoading] = useState(true);

    const registerUser = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await createUserWithEmailAndPassword(
                auth,
                email,
                password
            );
            setLoading(false);
            setCurrentUser(userCredential.user);
        } catch (error) {
            setLoading(false);
        }
    };

    const loginUser = async (email, password) => {
        setLoading(true);
        try {
            const userCredential = await signInWithEmailAndPassword(
                auth,
                email,
                password
            );
            setLoading(false);
            setCurrentUser(userCredential.user);
        } catch (error) {
            setLoading(false);
        }
    };

    const signInWithGoogle = async () => {
        setLoading(true);
        try {
            const googleProvider = new GoogleAuthProvider();
            const userCredential = await signInWithPopup(
                auth,
                googleProvider
            );
            setLoading(false);
            setCurrentUser(userCredential.user);
        } catch (error) {
            setLoading(false);
        }
    };

    const logoutUser = async () => {
        setLoading(true);
        try {
            signOut(auth);
            setCurrentUser(null);
            setLoading(false);
        } catch (error) {
            setLoading(false);
        }
    };

    // manage user

    // useEffect(() => {
    //     const unsubscribe = onAuthStateChanged(auth, ((user) => {
    //         setCurrentUser(user);
    //         setLoading(false);

    //         if(user){
    //             const {}
    //         }
    //     }));
    //     return unsubscribe;
    // }, []);

    const value = {
        currentUser,
        loading,
        registerUser,
        loginUser,
        signInWithGoogle,
        logoutUser,
    };
    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
};
