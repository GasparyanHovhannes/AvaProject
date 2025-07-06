import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {type FirebaseApp} from "firebase/app";
import { type Doctor } from "../features/doctorSlice"; 
import { type Appointment } from "../features/appointmentsSlice"; 


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
    where,
    query,
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
type CollectionName = "doctor" | "users" | "appointments";

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
  await addDoc(collection(db, 'appointments'), {
    doctor,
    client,
    date: Timestamp.fromDate(date),
  });
};

export const getAppointmentsForDoctor = async (doctorEmail: string): Promise<Appointment[]> => {
  const snapshot = await getDocs(collection(db, "appointments"));
  const filtered = snapshot.docs
    .filter(doc => doc.data().doctor === doctorEmail)
    .map(doc => ({
      doc_id: doc.id,
      ...(doc.data() as Omit<Appointment, 'doc_id'>)
    }));

  return filtered;
};

export const getHairCareTextByType = async (hairType: number) => {
  const q = query(collection(db, "HairCare"), where("type", "==", Number(hairType)));
  const snapshot = await getDocs(q);

  if (!snapshot.empty) {
    return snapshot.docs[0].data().text;
  } else {
    return "No hair care tips found for your hair type.";
  }
};

export const getAllDoctors = async (): Promise<Doctor[]> => {
  const snapshot = await getDocs(collection(db, 'doctor'));
  return snapshot.docs.map(docSnap => {
    const raw = docSnap.data() as any;
    const field = raw.unavailable;
    const arr: Timestamp[] = [];
    if (field) {
      if (Array.isArray(field)) arr.push(...field);
      else arr.push(field);
    }
    return {
      id: docSnap.id,
      name: raw.name,
      email: raw.email,
      gender: raw.gender,
      yearsOfExperience: raw.yearsOfExperience,
      image: raw.image,
      unavailable: arr,
    };
  });
};

const updateData = async <T extends object>(
  docId: string,
  collectionName: CollectionName,
  updatedData: T
): Promise<void> => {
  const docRef = doc(db, collectionName, docId);
  await updateDoc(docRef, updatedData);
};

export const updateUserSubscription = async (): Promise<void> => {
  const user = auth.currentUser;
  if (!user) throw new Error("User is not logged in");

  const userRef = doc(db, "users", user.uid);
  const userSnap = await getDoc(userRef);

  if (!userSnap.exists()) throw new Error("User document does not exist");

  await updateDoc(userRef, { sub: true });
};


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

