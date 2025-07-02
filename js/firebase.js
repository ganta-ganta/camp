// Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBm2Y2-KaPh_9prtDyEh75ys9bOS_YivyU",
  authDomain: "campacola-45a6c.firebaseapp.com",
  projectId: "campacola-45a6c",
  storageBucket: "campacola-45a6c.appspot.com",
  messagingSenderId: "950062364838",
  appId: "1:950062364838:web:c016c1c2b63d661dc09c67",
  measurementId: "G-0F1FMP4D6X"
};

// Initialize Firebase
firebase.initializeApp(firebaseConfig);

// Initialize Firebase services
const auth = firebase.auth();
const db = firebase.firestore();
const storage = firebase.storage();

// Enable Firestore offline persistence
db.enablePersistence()
  .catch((err) => {
    if (err.code == 'failed-precondition') {
      console.log("Offline persistence can only be enabled in one tab at a time.");
    } else if (err.code == 'unimplemented') {
      console.log("The current browser does not support offline persistence.");
    }
  });