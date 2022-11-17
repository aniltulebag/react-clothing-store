// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import {
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from 'firebase/auth';
import {
  collection,
  doc,
  getDoc,
  getDocs,
  getFirestore,
  query,
  setDoc,
  writeBatch,
} from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// Follow this pattern to import other Firebase services
// import { } from 'firebase/<service>';
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: process.env.REACT_APP_API_KEY,
  authDomain: process.env.REACT_APP_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_PROJECT_ID,
  storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_APP_ID,
};

// Initialize Firebase
const firebaseApp = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
// The singleton instance of the Auth class.
// The way your application authenticates and the rules for authentication and the authentication that communicates with Firebase, this should always be the same one for every application.
const auth = getAuth(firebaseApp);

// Create a new account by passing the new user's email address and password
export const createAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await createUserWithEmailAndPassword(auth, email, password);
};

// When a user signs in to your app, pass the user's email address and password
export const signInAuthUserWithEmailAndPassword = async (email, password) => {
  if (!email || !password) return;

  return await signInWithEmailAndPassword(auth, email, password);
};

export const signOutUser = async () => {
  return await signOut(auth);
};

// Create an instance of the Google provider object
// These providers are kind of just instructions for this instance of provider, but you can have multiple different providers authentication.
const googleProvider = new GoogleAuthProvider();

// Optional: Specify additional custom OAuth provider parameters that you want to send with the OAuth request. To add a custom parameter, call setCustomParameters on the initialized provider with an object containing the key as specified by the OAuth provider documentation and the corresponding value.
googleProvider.setCustomParameters({
  prompt: 'select_account',
});
// https://developers.google.com/identity/openid-connect/openid-connect#authenticationuriparameters

// To sign in with a pop-up window, call signInWithGooglePopup
export const signInWithGooglePopup = () => {
  signInWithPopup(auth, googleProvider);
};

// onAuthStateChanged takes the auth object and then it takes the callback
// and the callback of course gives us the userAuth when it successfully gets a value when it first and centralizes, the moment in instantiation
// and it gives us the user auth, we'll know immediately form that userAuth whether or not there was already an existing user logged in.
// If there is or isn't, doesn't matter to us. The key thing is that we have the value and immediately we're going to unsubscribe. So we're going to close the listener.
// If we don't do this, there will be a memory leak, meaning that listener is always active inside of our file. But we don't want that. We don't want it to take up more memory.
// So, once we unsubscribe, we are also going to resolve with the userAuth because now of course we have the actual userAuth.
// This listener itself is asynchronous, so we're going to resolve the moment we get the value anyways.
export const getCurrentUser = () => {
  return new Promise(resolve => {
    const unsubscribe = onAuthStateChanged(auth, userAuth => {
      unsubscribe();
      resolve(userAuth);
    });
  });
};

// Initialize Cloud Firestore and get a reference to the service
// We need to create the DB. We can use it in order to actually access our database.
// This directly points to our database inside of the console.
const db = getFirestore(firebaseApp);

// We want some function that will take user data, we're getting from the authentication service, and then we're going to store that inside of Firestore.
export const createUserDocumentFromAuth = async (
  userAuth,
  additionalInformation = {}
) => {
  if (!userAuth) return;

  // We need to do first is we need to see if there is an existing document reference.
  // DocumentReference: actual instance of a document.
  const userDocRef = doc(db, 'users', userAuth.uid);

  // A Promise resolved with a DocumentSnapshot
  const userSnapshot = await getDoc(userDocRef);

  // if user data is not exists
  if (!userSnapshot.exists()) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();

    try {
      // Writes to the document referred to by this DocumentReference. If the document does not yet exist, it will be created.
      await setDoc(userDocRef, {
        displayName,
        email,
        createdAt,
        ...additionalInformation,
      });
    } catch (error) {
      console.log('error creating the user', error.message);
    }
  }

  //! We want the snapshot, so that we can get the data and store it inside of our reducer.
  return userSnapshot;
};

// Transaction: is a word that represents a successful unit of work to a database. It might be multiple sets of setting values into a collection.
// We consider a successful write to this collection if all of the documents successfully wrote to that database.
// This means that there are numerous writes involved in this one single transaction.
// The single transaction being we stored all of the objects into this collection.
export const addCollectionAndDocuments = async (
  collectionKey,
  objectsToAdd,
  field
) => {
  const collectionRef = collection(db, collectionKey);
  const batch = writeBatch(db);

  objectsToAdd.forEach(object => {
    // const docRef = doc(collectionRef, object[field].toLowerCase());
    const docRef = doc(collectionRef, object.title.toLowerCase());

    batch.set(docRef, object);
  });

  // Commits all of the writes in this write batch as a single atomic unit.
  await batch.commit();
};
// Usage example: addCollectionAndDocuments("categories", SHOP_DATA)

export const getCategoriesAndDocuments = async () => {
  const collectionRef = collection(db, 'categories');

  // Creates a new immutable instance of Query that is extended to also include additional query constraints.
  // This gives us some object now that we can get a snapshot from.
  const q = query(collectionRef);

  // ERROR TEST
  // await Promise.reject(new Error('new error woops'));

  //. So I'm going to say querySnapshot is equal to await of calling getDocs on "q"
  //. getDocs here is the asynchronous ability to fetch those document snapshots that we want because not it's all encapsulated under this querySnapshot.
  const querySnapshot = await getDocs(q);

  // This will give us an array of all of those individual documents inside, and the snapshots are the actual data themselves.
  // querySnapshot.docs;

  return querySnapshot.docs.map(docSnapshot => docSnapshot.data());
};
