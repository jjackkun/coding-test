import PATH , { DIR } from '@config/Dir' ; 
const { PORT } = DIR ; 
const { rootPath } = PATH ; 

const DevSetting = {
  devServer : {
    enumerable : true , 
    configurable : true , 
    writable : true , 
    value: {
      watchContentBase : true , 
      port : PORT , 
      open : true , 
      contentBase : rootPath , 
      inline : true ,
      hot : true , 
    }
  } , 

  devtool : {
    enumerable : true , 
    value : 'inline-source-map' , 
  } ,   
} ; 
export default DevSetting ; 