import { firebaseApp } from "./firebase";
import firebase from "firebase";
import "firebase/firestore";

const db = firebase.firestore(firebaseApp);

export const getCollection = async (collection) => {
  const result = { statusResponse: false, data: null, error: null };

  try {
    const data = await db.collection(collection).get();
    const arrayDAta = data.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
    result.statusResponse = true;
    result.data = arrayDAta;
  } catch (error) {
    result.error = error;
  }
  return result;
};
