import { useRef } from 'react';
import { auth } from '../firebase';
import { useAuthContext } from '../context/AuthContext';

const SignUp = () => {
    const { user } = useAuthContext();
    const emailRef = useRef(null);
    const emailPassword = useRef(null);
    const handleSubmit = (event) => {
        event.preventDefault();
        auth.createUserWithEmailAndPassword(emailRef.current.value, emailPassword.current.value);
        //console.log(emailRef.current.value, emailPassword.current.value);
};

    return (
        <div>
            <h1>ユーザー登録</h1>
            <p>{user.email}</p>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メールアドレス</label>
                    <input name="email" type="email" placeholder="email" ref={emailRef}/>
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