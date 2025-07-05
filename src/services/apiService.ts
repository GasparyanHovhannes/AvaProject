import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {type FirebaseApp} from "firebase/app";
import { type Doctor } from "../features/doctorSlice"; // Adjust the import path as necessary

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
    deleteDoc,
    Timestamp,
} from "firebase/firestore";

const app: FirebaseApp = initializeApp({
    apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
    databaseURL: import.meta.env.VITE_FIREBASE_DATABASEURL,
    authDomain: import.meta.env.VITE_FIREBASE_AUTHDOMAIN,
    projectId: import.meta.env.VITE_FIREBASE_PROJECTID,
    appId: import.meta.env.VITE_FIREBASE_APPID,
    messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGINGSENDERID,
    storageBucket: import.meta.env.VITE_FIREBASE_STORAGEBUCKET,
    measurementId: import.meta.env.VITE_FIREBASE_MEASUREMENTID,
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

export const setAppointment = async ({
  doctor,
  client,
  date,
}: {
  doctor: string;
  client: string;
  date: Date;
}): Promise<void> => {
  const appointment = {
    doctor,
    client,
    date: Timestamp.fromDate(date),
  };
  await addDoc(collection(db, "appointments"), appointment);
};

export const getAllDoctors = async (): Promise<Doctor[]> => {
  const snapshot = await getDocs(collection(db, 'doctor'));
  const doctors = snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  })) as Doctor[];
  return doctors;
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

