import webpack from 'webpack' ; 
import { join } from 'path' ; 
import { CleanWebpackPlugin } from'clean-webpack-plugin' ; 

import { ScssRule , ScssJsRule , JsRule , CopyPlugin , imageRule } from '@config/rules' ; 
import MakeEntryList from '@config/make-entry-list2' ; 
import MakeSprite from '@config/make-sprite' ; 
import DevSetting from '@config/dev-setting' ; 
import PATH , { DIR } from '@config/Dir' ; 

const { 
  imgsPath : _imgsPath , 
  jsList , 
  cssList , 
  rootPath , 
} = PATH ; 
const { APPROOT , DEST } = DIR ; 

const config = ( env , options ) => {
  let entryList = {} 
  ,   imgsPath = _imgsPath[ 'dev' ] ; 

  MakeEntryList([[ jsList , 'js' ] , [ cssList , 'scss' ]] , entryList ) ; 


  const config = {
    entry : entryList , 

    mode : 'production' , 

    output : {
      path : join( APPROOT , DEST ) , 
      filename : 'js/[name].js' , 
      publicPath : '/' , 
    } , 

    module : {
      rules : [
        JsRule , 
        ScssRule.module , 
        ScssJsRule , 
      ]
      .concat((_=> imageRule( imgsPath ))()) 
    } , 

    plugins : [
      new webpack.HotModuleReplacementPlugin() , 
      new CleanWebpackPlugin() , 
      ScssRule.plugin , 
      CopyPlugin , 
    ]
    .concat((_=> MakeSprite( imgsPath ))()) 
    , 

    resolve : {
      modules: [ join( rootPath , "page" , 'tmpl' , "helpers" ) , "node_modules" , "sprite" ] , 
      alias : {
        '@' : APPROOT , 
        'root' : rootPath , 
      }
    } , 

    stats : 'errors-only' , 
  }

  let { devServer , devtool } = DevSetting ; 
  Object.defineProperties( config , { devServer , devtool }) ; 

  return config ; 
} ; 
export default config ; 