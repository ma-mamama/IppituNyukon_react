import { createContext, useState, useContext, useEffect } from "react";
import { auth } from '../firebase';

const AuthContext = createContext();

export function useAuthContext() {
    //Contextは共有できる
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);

    const value = {
        user,
        loading,
    };
 
    useEffect(() => {
        //マウント時に実行
        //onAuthStateChangedはサインイン、サインアウトが行われると実行、
        //サインインの場合はuserオブジェクトにusereに関する値を持つ、
        //サインアウトの場合はnullとなる。
        const unsubscribed = auth.onAuthStateChanged((user) => {
            console.log(user);
            setUser(user);
            setLoading(false);
        })
        //クリーンアップ
        return () => {
            unsubscribed();
        };
    }, []);//更新はしない
    return <AuthContext.Provider value={value}>{!loading && children}</AuthContext.Provider>
}