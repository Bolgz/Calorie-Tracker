import {
  doc,
  getFirestore,
  setDoc,
  getDoc,
  getDocs,
  collection,
  updateDoc,
} from "firebase/firestore";

//Add user to Firestore
export async function addUser(_userId) {
  await setDoc(doc(getFirestore(), "users", _userId), {
    userid: _userId,
    weightEntries: [],
  });
}

// Check if user exists in Firestore
export async function getUser(userId) {
  const docRef = await doc(getFirestore(), "users", userId);
  const docSnap = await getDoc(docRef);

  if (docSnap.exists()) {
    return true;
  } else {
    return false;
  }
}

//Return data of given name userID
export async function getUserDataFromUserId(_userId) {
  const querySnapshot = await getDocs(collection(getFirestore(), "users"));

  let exists = false;

  querySnapshot.forEach((doc) => {
    if (doc.data().userid === _userId) {
      exists = {
        userID: doc.data().userid,
        userDisplayName: doc.data().displayname,
        userContactList: doc.data().contactlist,
      };
      return exists;
    }
  });

  return exists;
}

//Add weightentry in Firestore
export async function addWeightEntry(_weightDate, _weightValue, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  const newWeightEntry = { date: _weightDate, weight: _weightValue };

  const newWeightEntryList = [...docSnap.data().weightEntries, newWeightEntry];
  await updateDoc(userRef, { weightEntries: newWeightEntryList });
}

//Get weightentry list of user from Firestore
export async function getWeightEntryList(_userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().weightEntries;
}

export async function removeWeightEntry(_weightDate, _weightValue, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  const newWeightEntryList = docSnap
    .data()
    .weightEntries.filter(
      (entry) => entry.date !== _weightDate && entry.weight !== _weightValue
    );

  await updateDoc(userRef, { weightEntries: newWeightEntryList });
}
