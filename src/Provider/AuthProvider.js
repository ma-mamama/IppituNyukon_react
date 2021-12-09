import {React} from 'react'
import { useHistory } from 'react-router-dom'
import { auth, provider } from '../firebase'
import { addUser } from '../models/models'

export const Login = (email, password) => {
    
}

export const googleLogin = async() => {
    try {
        await auth.signInWithPopup(provider).then((userCredential) => {
            addUser(userCredential.user.displayName, userCredential.user.email, userCredential.user.uid);
        })
    } catch(error) {
        console.log(error);
        // setError(error.message);
    }
}

export const signup = async(userName, email, password) => {
    try {
        await auth.createUserWithEmailAndPassword(email, password).then((userCredential) => {
            addUser(userName, email, userCredential.user.uid);
        })
    } catch(error) {
        return error
    }
}