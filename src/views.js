import $ from 'jquery'
// Display
const main = require('./templates/main.hbs');
const chatDisplay = require('./templates/chatMessagePartial.hbs');
const welcome = require('./templates/welcome.hbs');
const avatarsPartial = require('./templates/avatarsPartial.hbs');
const  userPartial =require ('./templates/userPartial.hbs');
const sidebar =require('./templates/sidebar.hbs');
const chatHeader =require ('./templates/chatHeader.hbs')
///

//IMAGES
import avatarMale1 from './img/avatars/man.png';
import avatarMale2 from './img/avatars/man2.png';
import avatarMale3 from './img/avatars/man3.png';
import avatarBoy1 from './img/avatars/boy.png';
import avatarBoy2 from './img/avatars/boy1.png';
import avatarGirl1 from './img/avatars/girl.png';

const avatarsCollection= {
     avatars:[
        { avatar: avatarMale1 },
        { avatar: avatarMale2 },
        { avatar: avatarMale3 },
        { avatar: avatarBoy1 },
        { avatar: avatarBoy2 },
    ]
}



const mainView = () => {
    $('#main-window').html(welcome)    
    $('#showAvatars').html(avatarsPartial(avatarsCollection));
}

mainView();



export function chatWindow (user) {
    $('#main-window').html(main)
    $('#sidebar').html(sidebar(user));
    $('#chat-header').html(chatHeader(user));

}
export function showMessages (messages) {$('#show-messages').html(chatDisplay(messages))}
export function showUsers(users){$('.users-display').html(userPartial(users))
}
export function avatars (){ return avatarsCollection.avatars}