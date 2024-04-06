const defaultFile = '/imagen/usersPictures/default.png';

const file = document.getElementById( 'selectPicUser' );
const img = document.getElementById( 'userPictureReg' );
file.addEventListener( 'change', e => {
  if( e.target.files[0] ){
    const reader = new FileReader( );
    reader.onload = function( e ){
      img.src = e.target.result;
    }
    reader.readAsDataURL(e.target.files[0])
  }else{
    img.src = defaultFile;
  }
} );