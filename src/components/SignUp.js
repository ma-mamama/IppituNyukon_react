import { useRef, useState} from 'react';
import { auth } from '../firebase';
import { useAuthContext } from '../context/AuthContext';
import { Link, useHistory} from 'react-router-dom';

const SignUp = () => {
    const history = useHistory();
    const [error, setError] = useState('');
    const { user } = useAuthContext();
    const emailRef = useRef(null);
    const emailPassword = useRef(null);
    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            await auth.createUserWithEmailAndPassword(emailRef.current.value, emailPassword.current.value);
        } catch(error) {
            setError(error.message);
        }
        //console.log(emailRef.current.value, emailPassword.current.value);
};

    return (
        <div>
            <h1>ユーザー登録</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
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