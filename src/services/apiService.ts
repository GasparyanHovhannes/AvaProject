import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {type FirebaseApp} from "firebase/app";

import {
    addDoc,
    collection,
    CollectionReference,
    doc,
    Firestore,
    getFirestore,
    getDocs,
    getDoc,
    setDoc,
    updateDoc,
    deleteDoc
} from "firebase/firestore";

const app: FirebaseApp = initializeApp({
  apiKey: "AIzaSyC5wQtrok3fmM_ox1i3W0D5giyJ-RxY9YY",
  databaseURL: "https://avaproject-a38c3-default-rtdb.firebaseio.com",
  authDomain: "avaproject-a38c3.firebaseapp.com",
  projectId: "avaproject-a38c3",
  storageBucket: "avaproject-a38c3.firebasestorage.app",
  messagingSenderId: "351198233075",
  appId: "1:351198233075:web:72f4101f6de891e0ba5286",
  measurementId: "G-36WD6K2P99"
});
import { getAuth, type Auth } from "firebase/auth";
const analytics = getAnalytics(app);

const auth: Auth = getAuth(app);
const db: Firestore = getFirestore(app);
type CollectionName = "doctor" | "users";

const fetchData = async <T>(collectionName: CollectionName) => {
    const dataCollection = collection(db, collectionName) as CollectionReference<T>;
    const dataSnapshot = await getDocs(dataCollection);
    const dataList = dataSnapshot.docs.map(doc => ({...doc.data(), doc_id: doc.id}));
    return dataList as T[];
}

const setData = async <T>(collectionName: CollectionName, data: T, docId?: string): Promise<string> => {
  if (docId) {
    const docRef = doc(db, collectionName, docId);
    await setDoc(docRef, { ...data, id: docId }); 
    return docId;
  } else {
    const dataCollection = collection(db, collectionName) as CollectionReference<T>;
    const docRef = await addDoc(dataCollection, data); 
    return docRef.id;
  }
};


const updateData = async <T extends object>(doc_id: string, collectionName: CollectionName, updatedData: T):Promise<void> => {
    const docRef = doc(db, collectionName, doc_id);
    await updateDoc(docRef, updatedData);
}

const getData = async <T>(id: string, collectionName: CollectionName,):Promise<T> => {
    const docRef = doc(db, collectionName, id);
    const docSnap = await getDoc(docRef);
    return {...docSnap.data(), doc_id: id} as T;
}

export const fetchDataById = async <T>(
  collectionName: string,
  docId: string
): Promise<T | null> => {
  try {
    const docRef = doc(db, collectionName, docId);
    const docSnap = await getDoc(docRef);

    if (docSnap.exists()) {
      return docSnap.data() as T;
    } else {
      return null;
    }
  } catch (error) {
    console.error("Error fetching document:", error);
    return null;
  }
};


export {fetchData, setData, getData, updateData, auth, db }