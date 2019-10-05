import style from './styles/style.scss'
import $ from 'jquery';

//import firebase
import * as firebase from 'firebase';
import "firebase/firestore";
import { firebaseConfig } from './database/configuration'

//initialization firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
let messagesCollection = db.collection('rooms').doc('roomA').collection('messages');
///////////////////////






// Display
const main = require('./templates/main.hbs');

const mainView = () => {
    $('.main').html(main)
}

mainView()
//FireBase
//write data

//Data base functionality
function writeUserMessage(name, message) {
    const data = {
        name,
        message,
        createAt: Date.now(),

    }
    messagesCollection.add(data);
}
const sendMessage = () => {
    const message = $('#message').val()
    writeUserMessage('pepe', message)
    $('#message').val('')   
}


const getMessages = () => {
    messagesCollection.orderBy('createAt').get().then(snapshot => {
        snapshot.forEach(doc => {
            console.log(doc.data());
        });
    })
        .catch(err => {
            console.log('Error getting documents', err);
        });
}


messagesCollection.onSnapshot(docSnapshot => {
    console.log(`Messages Updated`);   
    getMessages()    
}, err => {
    console.log(`Encountered error: ${err}`);
});



$('.send').on('click', sendMessage)



