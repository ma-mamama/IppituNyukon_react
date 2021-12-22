import {auth, provider} from '../firebase';
import {Link, useHistory} from 'react-router-dom';
import { useState, useRef } from 'react';
import {TextField, Button, IconButton} from '@mui/material';
import GoogleIcon from '@mui/icons-material/Google';

import ToHome from '../components/ToHome';
import { emailLogin, googleLogin } from '../Provider/AuthProvider';


const Login = () => {
    const history = useHistory();
    const [error, setError] = useState('');
    const emailRef = useRef(null);
    const passwordRef = useRef(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        emailLogin(emailRef.current.value, passwordRef.current.value).then(
            (e)=>{
                e ? setError(e.message) : history.push('/')
            }
        )
    };
    const googleSubmit = async (event) => {
        try {
            await googleLogin();
            history.push('/')
        } catch(error) {
            setError(error.message);
        }
    };
    return (
        <div>
            <ToHome />
            <h1>ログイン</h1>
            <div className='flexbox'>
                <div>
                    <div>メールアドレスでログイン</div>
                    {error && <p style={{color: 'red'}}>{error}</p>}
                    <form onSubmit={handleSubmit}>
                        <div className='middle-margin'>
                            <TextField
                                required
                                id="filled-required"
                                label="メールアドレス"
                                type="email"
                                name="email"
                                placeholder="email@test.jp"
                                variant="filled"
                                inputRef={emailRef}
                            />
                        </div>
                        <div className='middle-margin'>
                            <TextField
                                id="outlined-required"
                                label="パスワード"
                                type="password"
                                name="password"
                                placeholder="password"
                                variant="filled"
                                inputRef={passwordRef}
                            />
                        </div>
                        <div>
                            <Button variant="contained" href="#contained-buttons" type='submit' onClick={handleSubmit} >ログイン</Button>
                        </div>
                        
                    </form>
                    <div className='middle-margin' ><Link to="/SignUp">新規登録はこちら</Link></div>
                </div>
                
                <div>
                    <div>googleアカウントでログイン</div>
                    <IconButton  aria-label="delete" size="large" onClick={googleSubmit} >
                        <GoogleIcon  sx={{ fontSize: 50 }}  />
                    </IconButton>
                    
                </div>
            </div>
        </div>
    );

};

export default Login;