import { db } from '../firebase'



export const addUser = async(userName, email, uid) => {
    await db.collection("users").doc(uid).set({
        name: userName,
        mail: email
    }).catch((error) => {
        console.error("Error adding document: ", error)
    })
}

export const getUserName = async(uid) => {
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

export const addPaint = async(uid, paintTitle, paintUrl) => {
    const docRef = db.collection("paints")
    await docRef.add({
        paintTitle: paintTitle,
        paintUrl: paintUrl,
        uid: uid
    });
}

const organizeGetedData = async(docRef) => {
    const getedData = []
    const snapShot = await docRef.get()
    snapShot.forEach((doc) => {
        if (doc) {
            getedData.push({paintId:doc.id,paintTitle:doc.get('paintTitle'), paintUrl:doc.get('paintUrl')})
        } else {
            console.log("No such document!")
        }
    })
    return getedData
}

export const getPaint = async(uid) => {
    const docRef = db.collection("paints").where("uid", "==", uid);
    const getedData = organizeGetedData(docRef);
    return getedData
}

export const getAllPaints = async() => {
    const docRef = db.collection("paints");
    const getedData = organizeGetedData(docRef);
    console.log(getedData);
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