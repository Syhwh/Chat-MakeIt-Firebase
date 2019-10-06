import style from './styles/style.scss'
import PerfectScrollbar from 'perfect-scrollbar';
import $ from 'jquery';
var moment = require('moment');
//import firebase
import * as firebase from 'firebase';
import "firebase/firestore";
import { firebaseConfig } from './database/configuration';
//initialization firebase
firebase.initializeApp(firebaseConfig);
var db = firebase.firestore();
let messagesCollection = db.collection('rooms').doc('roomA').collection('messages');
let usersCollection = db.collection('rooms').doc('roomA').collection('users');
///////////////////////

const views = require('./views.js')
const avatars=views.avatars();

//Data base functionality
function writeUserMessage(name, message, avatar) {
    const data = {
        avatar,
        name,
        message,
        createAt: Date.now()
    }
    messagesCollection.add(data);
}

///////write an user
function writeUser(name, avatar) {
    const users =getUsers();
    console.log('estos son users en write'+ console.log(users) )
    const data = {
        avatar,
        name,        
        createAt: Date.now()
    }
    usersCollection.add(data);
}

function getUsers (){
    let users = new Array()
    usersCollection.orderBy('createAt').get().then(snapshot => {
        snapshot.forEach(doc => {
            users.push(doc.data())
        });
        views.showUsers({users});
    console.log('estos son users en get'+ console.log(users) )
      return users  
    })
    .catch(err => {
            console.log('Error getting documents', err);
        });
}




const getMessages = () => {
    let data = new Array()
    messagesCollection.orderBy('createAt').get().then(snapshot => {
        snapshot.forEach(doc => {
            data.push(doc.data())
        });
        views.showMessages({data})       
    })
    .catch(err => {
            console.log('Error getting documents', err);
        });
}

messagesCollection.onSnapshot(docSnapshot => {
    console.log(`Messages Updated`);
    console.log(getMessages())
}, err => {
    console.log(`Encountered error: ${err}`);
});

//////

// Check if the user exist or create it

const getUser= ()=>{ return JSON.parse(window.localStorage.getItem('user'));}

const User=()=>{
    const user= getUser();
        if (!user){
            setUser ('','')
        } else{
            views.chatWindow(user)           
            getMessages()
            getUsers()
        }
}
// set the new user
const setUser=(name, avatar)=>{
    const user= {
        name,
        avatar,
    }
    window.localStorage.setItem('user', JSON.stringify(user));
}

User()


$('#showAvatars').on('click','.avatar-Choose', (e)=>{
    console.log('aqui'+ $(e.currentTarget))
    const avatarID=$(e.currentTarget).parent('li').attr('id'); 
    
    setUser('',avatars[avatarID].avatar)
})



//validate if the user exist to join to the session



const validate =()=>{
    const user= getUser();
    const name=$('#input-name').val();
    if (user.avatar===''){
        alert('choose an avatar and enter your name')
    } else if (name===''){
        alert('Enter your name')
    } else{
        $('#enter-to-chat').on('click', ()=>{            
            setUser(name,user.avatar)
            writeUser(name,user.avatar)
            views.chatWindow(getUser())
            getMessages()
            getUsers()
        })        
    }
}
$('#enter-to-chat').on('click',validate)


const sendMessage = () => {
    const user=getUser()
    const message = $('#text-mesagge').val()//$('#message').val()
    writeUserMessage(user.name, message, user.avatar)
    $('#text-mesagge').val('')
}

$('.send').on('click', (e)=>{
    e.stopPropagation()
    sendMessage})

