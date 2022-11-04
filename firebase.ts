// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyCD0Y9jxoIIjUS2xSoAnr7JbLNX3Y8BBy0',
  authDomain: 'cat-app-9d8af.firebaseapp.com',
  projectId: 'cat-app-9d8af',
  storageBucket: 'cat-app-9d8af.appspot.com',
  messagingSenderId: '653237192821',
  appId: '1:653237192821:web:e68ebaf1e4d214006a103c',
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()

export default db
