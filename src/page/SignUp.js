import { useContext, useRef, useState} from 'react';
import { useHistory,} from 'react-router-dom';
import {TextField, Button} from '@mui/material';


import { AddUser } from '../models/models';
import { useAuthContext } from '../context/AuthContext';
import { signup } from '../Provider/AuthProvider';
import ToHome from '../components/ToHome';


const SignUp = () => {
    const history = useHistory();
    const [error, setError] = useState('');

    const userNameRef = useRef(null);
    const emailRef = useRef(null);
    const emailPassword = useRef(null);
    
    const handleSubmit = async(event) => {
        event.preventDefault();
        console.log(userNameRef.current.value);
        signup(userNameRef.current.value, emailRef.current.value, emailPassword.current.value).then(
            (e)=>{
                e? setError(e.message) : history.push("/") 
            }
        )        
    };

    return (
        <div>
            <ToHome />
            <h1>ユーザー登録</h1>
            {error && <p style={{color: 'red'}}>{error}</p>}
            <form onSubmit={handleSubmit}>
                <div className='middle-margin'>
                    <TextField
                        required
                        id="filled-required"
                        label="ニックネーム"
                        type="text"
                        name="name"
                        placeholder="ニックネーム"
                        variant="filled"
                        inputRef={userNameRef}
                    />
                </div>
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
                        inputRef={emailPassword}
                    />
                </div>
                <div>
                    <Button 
                        variant="contained" 
                        href="#contained-buttons" 
                        type='submit' 
                        onClick={handleSubmit} 
                    >登録</Button>
                </div>
            </form>
        </div>
    );
};

export default SignUp;