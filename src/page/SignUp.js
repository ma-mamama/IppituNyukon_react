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

        history.push("/")

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