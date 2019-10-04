const main =require('../templates/main.hbs');
const mainView=()=>{
 return   $('.main').html(main)
}

module.exports={
mainView
}