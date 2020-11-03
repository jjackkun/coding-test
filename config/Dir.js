import { sync } from 'glob' ; 
import { join } from 'path' ; 

const PORT = 8001 ; 
const DIR = {
  SRC         : 'src' , 
  DEST        : 'dist' , 
  APPROOT     : `${ __dirname }/../` , 
  CHUNKLIST   : [] , 
  SERVERPORT  : PORT + 1 , 
  PORT , 
} ; 

let 
{
  SRC : _src , 
  APPROOT : _appRoot , 
} = DIR , 

imgsPath = {
  dev : `http://localhost:${ PORT }/images/` , 
  pro : `https://gitlab.com/jjackkun/setting_collection/-/raw/fe_default/src/images/` , 
} , 

rootPath = join( _appRoot , _src ) 
; 

const PATH = {  
  jsList      : sync( join( rootPath , 'js' , '*.js' )) , 
  components  : sync( join( rootPath , 'js/**/' , '*.js' )) , 
  cssList     : sync( join( rootPath , 'scss' , '*.scss' )) , 
  cssAllList  : sync( join( rootPath , 'scss/**/' , '*.scss' )) , 
  servers     : sync( join( rootPath , 'server' , '*.js' )) , 
  servers2     : sync( join( rootPath , 'server' , 'app-pro.js' )) , 
  spriteList  : {
    root      : sync( join( rootPath , 'images' , 'spriteImg' , '*.png' )) , 
    folders   : sync( join( rootPath , 'images' , 'spriteImg' , '!(*.png)' )) , 
  } , 
  imgsPath , 
  rootPath , 
} ; 

export default PATH ; 
export { DIR } ; 