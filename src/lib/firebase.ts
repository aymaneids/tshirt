import { initializeApp } from 'firebase/app';
import { getAuth, connectAuthEmulator } from 'firebase/auth';
import { getFirestore, connectFirestoreEmulator, enableIndexedDbPersistence } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyD07ugIBh8AMGZYcrzVOc_6dVcAjssRnrU",
  authDomain: "energy-30663.firebaseapp.com",
  projectId: "energy-30663",
  storageBucket: "energy-30663.firebasestorage.app",
  messagingSenderId: "887134682239",
  appId: "1:887134682239:web:d56789fe58a0d31f60d34a"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);

// Enable offline persistence
enableIndexedDbPersistence(db)
  .catch((err) => {
    if (err.code === 'failed-precondition') {
      // Multiple tabs open, persistence can only be enabled in one tab at a time
      console.warn('Firebase persistence failed - multiple tabs open');
    } else if (err.code === 'unimplemented') {
      // The current browser doesn't support persistence
      console.warn('Firebase persistence not supported in this browser');
    }
  });

