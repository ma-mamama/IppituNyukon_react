import {auth, provider} from '../firebase';
import {Link, useHistory} from 'react-router-dom';
import { useState } from 'react';

import Status from '../components/Status';
import ToHome from '../components/ToHome';
import { googleLogin } from '../Provider/AuthProvider';

const usercreateStyle = {
    // display: "block",
}

const Login = () => {
    const history = useHistory();
    const [error, setError] = useState('');
    const handleSubmit = async (event) => {
        event.preventDefault();
        const { email, password } = event.target.elements;
        try {
            await auth.signInWithEmailAndPassword(email.value, password.value);
            history.push('/');
        } catch(error) {
            console.log(error);
            setError(error.message);
        }
    };
    const googleSubmit = async (event) => {
        try {
            await googleLogin();
            history.push('/')
        } catch(error) {
            console.log(error);
            setError(error.message);
        }
    };
    return (
        <div>
            <ToHome />
            <h1>ログイン</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div>
                    <label>メールアドレス</label>
                    <input name="email" type="email" placeholder="email" />
                </div>
                <div>
                    <label>パスワード</label>
                    <input name="password" type="password" placeholder="password" />
                </div>
                <div>
                    <button>ログイン</button>
                </div>

                <button onClick={googleSubmit}>Googleログイン</button>
                <div style={usercreateStyle}><Link to="/SignUp">新規登録はこちら</Link></div>
            </form>
        </div>
    );

};

export default Login;