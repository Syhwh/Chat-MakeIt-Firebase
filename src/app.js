import style from './styles/style.scss'
import $ from 'jquery';
// Import templates
const main =require('./templates/main.hbs');

const mainView=()=>{  
    $('.main').html(main)
}

mainView()