import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';

const prodConfig = {
  apiKey: 'AIzaSyCYCCbz5J6KGlPHQcfZ6V55AUeaq-l3Jn8',
  authDomain: 'raahee-5a80f.firebaseapp.com',
  databaseURL: 'https://raahee-5a80f.firebaseio.com',
  projectId: 'raahee-5a80f',
  storageBucket: 'raahee-5a80f.appspot.com',
  messagingSenderId: '385300765927',
  appId: '1:385300765927:web:7163f7a7f5059251521642',
  measurementId: 'G-P4BTGSXBEK',
};

// DEV;
const devConfig = {
  apiKey: 'AIzaSyDbZtFhcgwc1PFvwIX569C_Ei6-LEsJ2zs',
  authDomain: 'raahee-testing.firebaseapp.com',
  databaseURL: 'https://raahee-testing.firebaseio.com',
  projectId: 'raahee-testing',
  storageBucket: 'raahee-testing.appspot.com',
  messagingSenderId: '410583406163',
  appId: '1:410583406163:web:eb5759cd29c1da605658a6',
  measurementId: 'G-LR7RF5S9BZ',
};

const config = process.env.REACT_APP_PROD === 'true' ? devConfig : prodConfig;

if (!firebase.apps.length) {
  firebase.initializeApp(config);
}

export const firestore = firebase.firestore();
export const auth = firebase.auth();
export const serverTimeStamp = firebase.firestore.FieldValue.serverTimestamp();
export const FieldValue = firebase.firestore.FieldValue;
export const timestampFromDate = firebase.firestore.Timestamp.fromDate;
export const storage = firebase.storage();

const provider = new firebase.auth.GoogleAuthProvider();

provider.setCustomParameters({ prompt: 'select_account' });

export const signInWithGoogle = () => {
  auth.signInWithPopup(provider)
    .then((result) => {
      if (result.additionalUserInfo.isNewUser) {
        firestore.collection('users').doc(result.user.uid).set({
          bio: 'Hi there!',
          credits: 75,
          current_psychologist: null,
          displayName: result.user.displayName,
          email: result.user.email,
          gender: '',
          id: result.user.uid,
          paid: false,
          profileup: false,
          timestamp: serverTimeStamp,
        });
      }
    })
    .catch((err) => console.error(err));
};

export default firebase;
