// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app'
import { getFirestore } from 'firebase/firestore'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: 'AIzaSyCG8PSKMv7OS4KpkNHtKVY49Hcfno4mIP0',
  authDomain: 'moreglean.firebaseapp.com',
  projectId: 'moreglean',
  storageBucket: 'moreglean.appspot.com',
  messagingSenderId: '697016428837',
  appId: '1:697016428837:web:9898c9f44e4c5b008652cc',
  measurementId: 'G-L6MM0SN7XL',
}

// Initialize Firebase
initializeApp(firebaseConfig)
const db = getFirestore()

export default db
