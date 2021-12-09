import { useContext, useRef, useState} from 'react';
import { auth, db } from '../firebase';
import { useHistory, Redirect } from 'react-router-dom';


import { AddUser } from '../models/models';
import { useAuthContext } from '../context/AuthContext';
import { signup } from '../Provider/AuthProvider';
import ToHome from '../components/ToHome';


const SignUp = () => {
    const history = useHistory();
    const [error, setError] = useState('');
    // const { user } = useAuthContext();

    const userNameRef = useRef(null);
    const emailRef = useRef(null);
    const emailPassword = useRef(null);
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(userNameRef.current.value);
        
        signup(userNameRef.current.value, emailRef.current.value, emailPassword.current.value)
        // SignUp("testuser", "tete@test.com")

    //  await auth.createUserWithEmailAndPassword(emailRef.current.value, emailPassword.current.value);
    //  db.collection("users").doc(auth().currentUser.uid).set({
    //     uid: auth().currentUser.uid,
    //     userName: "testusername" 
        /*app.auth().currentUser.displayName*/
        //  app.auth().currentUser.userIconUrl
    //   })
    //   AddUser(userName, emailRef.current.value,)
        history.push("/")

        // setUserName(userNameRef.current.value)
        // if (userName && emailRef.current.value) {
        //     db.collection("users").add({
        //         mail: emailRef.current.value,
        //         user: userName
        //     })
        // }
        //console.log(emailRef.current.value, emailPassword.current.value);
};

    return (
        <div>
            <ToHome />
            <h1>ユーザー登録</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>ニックネーム</label>
                    <input
                        name="userName" 
                        type="text"
                        placeholder="name"
                        ref={userNameRef} 
                    />
                </div>
                <div>
                    <label>メールアドレス</label>
                    <input 
                        name="email" 
                        type="email" 
                        placeholder="email" 
                        ref={emailRef}
                    />
                </div>
                <div>
                    <label>パスワード</label>
                    <input
                        name="password" 
                        type="password"
                        placeholder="password"
                        ref={emailPassword} 
                     />
                </div>
                <div>
                    <button>登録</button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;