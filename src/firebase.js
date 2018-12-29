import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';


// Initialize Firebase
  const config = {
    apiKey: "AIzaSyC5YuYmbwzEBeEPTa41ZmZFETjxZsEyaBE",
    authDomain: "react-manchestercity.firebaseapp.com",
    databaseURL: "https://react-manchestercity.firebaseio.com",
    projectId: "react-manchestercity",
    storageBucket: "react-manchestercity.appspot.com",
    messagingSenderId: "76133664364"
  };

  firebase.initializeApp(config);

  const firebaseDB = firebase.database();

  firebaseDB.ref('matches').once('value').then((snapshot)=>{
    console.log(snapshot.val());
  })
