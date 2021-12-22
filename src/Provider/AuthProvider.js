import {React} from 'react'
import { auth, provider } from '../firebase'
import { addUser } from '../models/models'

export const emailLogin = async(email, password) => {
    try {
        await auth.signInWithEmailAndPassword(email, password)
    } catch(error) {
        return error
    }
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