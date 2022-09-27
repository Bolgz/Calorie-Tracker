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

//Add calorie entry in Firestore
export async function addCalorieEntry(_calorieEntryObject, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  //const newCalorieEntry = { date: _weightDate, weight: _weightValue };
  const newCalorieEntryList = [
    ...docSnap.data().calorieEntries,
    _calorieEntryObject,
  ];

  await updateDoc(userRef, { calorieEntries: newCalorieEntryList });
}

//Get weightentry list of user from Firestore
export async function getWeightEntryList(_userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().weightEntries;
}

//Get calorie entry list of user from Firestore
export async function getCalorieEntryList(_userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  return docSnap.data().calorieEntries;
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

export async function removeCalorieEntry(_entryToRemove, _userId) {
  const userRef = doc(getFirestore(), "users", _userId);
  const docSnap = await getDoc(userRef);

  const newCalorieEntryList = docSnap
    .data()
    .calorieEntries.filter(
      (entry) =>
        !(
          entry._selectedDate === _entryToRemove._selectedDate &&
          entry._proteinAmount === _entryToRemove._proteinAmount &&
          entry._nameOfFood === _entryToRemove._nameOfFood &&
          entry._fatAmount === _entryToRemove._fatAmount &&
          entry._carbsAmount === _entryToRemove._carbsAmount &&
          entry._caloriesAmount === _entryToRemove._caloriesAmount
        )
    );

  await updateDoc(userRef, { calorieEntries: newCalorieEntryList });
}
