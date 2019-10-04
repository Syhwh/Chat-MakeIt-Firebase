import style from './styles/style.scss'
import $ from 'jquery';
import * as firebase from 'firebase';
import "firebase/database";


var firebaseConfig = {    
        apiKey: "AIzaSyCoV5PXVZr4_v9T6t9mcxia1sSzHIsy-wg",
        authDomain: "chat-makeit-firebase.firebaseapp.com",
        databaseURL: "https://chat-makeit-firebase.firebaseio.com",
        projectId: "chat-makeit-firebase",
        storageBucket: "",
        messagingSenderId: "332531492839",
        appId: "1:332531492839:web:c635352d6bf88293507f42"  
  };
  firebase.initializeApp(firebaseConfig);

  // Import templates
const main =require('./templates/main.hbs');

const mainView=()=>{  
    $('.main').html(main)
}

mainView()
//FireBase
var database = firebase.database();

//write data
function writeUserData(userId, name, message) {
    firebase.database().ref('users/' + userId).set({
      username: name,
      message:  message
    });
  }

$('.send').on('click',()=>{
    writeUserData('1','pepe','no')
    firebase.database().ref('users/').on('value', snapshots=>{
     const currentMessages= snapshots.val()
               console.log(currentMessages)})
})

// const promise = new Promise((resolve,reject)=>{
//     resolve( )
//    })
//    promise.then((response)=>

//   
//    
//    )
