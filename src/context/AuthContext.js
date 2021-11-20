import { createContext, useState, useContext, useEffect } from "react";
import { auth } from '../firebase';

const AuthContext = createContext();

export const useAuthContext =　() => {
    //Contextは共有できる
    return useContext(AuthContext);
}

export const AuthProvider =( { children }) => {
    const [user, setUser] = useState('');
    const [loading, setLoading] = useState(true);
    const [userName, setUserName] = useState('');

    const currentUser =  auth.currentUser;

    const value = {
        user,
        loading,
        userName,
        setUserName,
        currentUser
    };
    console.log("auth1:"+userName);
    useEffect(() => {
        //マウント時に実行
        //onAuthStateChangedはサインイン、サインアウトが行われると実行、
        //サインインの場合はuserオブジェクトにusereに関する値を持つ、
        //サインアウトの場合はnullとなる。
        const unsubscribed = auth.onAuthStateChanged((user) => {
            console.log("auth2:"+userName);
            // console.log(user.displayName);
            setUser(user);
            setLoading(false);
        })
        // const unsubscribed = auth.onAuthStateChanged(user)
        //クリーンアップ
        return () => {
            unsubscribed();
        };
    }, []);//更新はしない
    return <AuthContext.Provider value={value}>
            {!loading && children}
            </AuthContext.Provider>
}