import { db } from '../firebase'

export const AddPaint = (userName, ) => {

    console.log(global)
}

export const AddUser = (userName, email) => {
    db.collection("users").add({
        user: userName,
        mail: email
    })
}




const models = () =>{
    return (
        <div>
            
        </div>
    )
}

export default models
