import firebase from 'firebase/app';
import 'firebase/app';
import 'firebase/database';
import 'firebase/auth';
import 'firebase/storage';


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

  const firebaseMatches = firebaseDB.ref('matches');
  const firebasePromotions = firebaseDB.ref('promotions');
  const firebaseTeams = firebaseDB.ref('teams');
  const firebasePlayers = firebaseDB.ref('players');


  export{
    firebase,
    firebaseMatches,
    firebasePromotions,
    firebaseTeams,
    firebaseDB,
    firebasePlayers,
  }
