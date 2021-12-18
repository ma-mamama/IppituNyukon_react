import { db } from '../firebase'
import {  doc, onSnapshot } from'firebase/firestore'


export const addUser = async(userName, email, uid) => {
    console.log("addUser");
    await db.collection("users").doc(uid).set({
        name: userName,
        mail: email
    }).catch((error) => {
        console.error("Error adding document: ", error)
    })
}

export const getUserName = async(uid) => {
    console.log("getUserName");
    const docRef = db.collection("users").doc(uid);
    return await docRef.get().then((doc) => {
        if (doc.exists) {
            return doc.get('name')
        } else {
            console.log("No such document!");
        }
    }).catch((error) => {
        console.log("Error getting document:", error);
    });
}

export const addPaint = async(uid, userName, paintTitle, paintUrl) => {
    console.log("addPaint");
    const docRef = db.collection("paints")
    await docRef.add({
        paintTitle: paintTitle,
        paintUrl: paintUrl,
        uid: uid,
        userName: userName,
    });
}

const organizeGetedData = async(docRef) => {
    const getedData = []
    const snapShot = await docRef.get()
    snapShot.forEach((doc) => {
        if (doc) {
            getedData.push({paintId:doc.id, userName:doc.get('userName'), paintTitle:doc.get('paintTitle'), paintUrl:doc.get('paintUrl')})
        } else {
            console.log("No such document!")
        }
    })
    return getedData
}

export const getPaint = async(uid) => {
    console.log("getPaint");
    const docRef = db.collection("paints").where("uid", "==", uid);
    
    // docRef.onSnapshot((snapshot) => {
    //     let getedData = []
    //     console.log(snapshot);
    //     snapshot.docs.forEach((doc) => {
    //         console.log(doc.data());
    //         getedData.push({ paintId: doc.data().id, paintTitle: doc.data().paintTitle, paintUrl: doc.data().paintUrl });
    //     });
    //     console.log(getedData)
    //     return getedData
    // })
    const getedData = await organizeGetedData(docRef);
    return getedData
    
}

export const getAllPaints = async() => {
    console.log("getAllPaints");
    const docRef = db.collection("paints")
    const getedData = await organizeGetedData(docRef);
    return getedData
    
}

export const deletePaint = async(paintId) => {
    console.log(paintId);
    const docRef = db.collection("paints").doc(paintId)
    await docRef.delete().then(() => {

        console.log("削除しました");
    }).catch((error) => {
        console.log("Error removing document: ", error);
    })
}

//paintsコレクションの値が変わったら実行される関数
export const changedPaint = () => { 
    db.collection("paints").onSnapshot((snapshot) => {
        snapshot.docChanges().forEach((change)=>{
            if (change.type === "added") {
                console.log("New city: ", change.doc.data());
            }
            if (change.type === "modified") {
                console.log("Modified city: ", change.doc.data());
            }
            if (change.type === "removed") {
                console.log("Removed city: ", change.doc.data());
            }
        });
    }) 
}



