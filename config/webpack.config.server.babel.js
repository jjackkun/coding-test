import { sync } from 'glob' ; 
import { join } from 'path' ; 
import { CleanWebpackPlugin } from'clean-webpack-plugin' ; 
import { JsRule } from '@config/rules' ; 
import MakeEntryList from '@config/make-entry-list' ; 
import PATH , { DIR } from '@config/Dir' ; 

import nodeExternals from 'webpack-node-externals' ; 

const { 
  rootPath , 
  servers 
} = PATH ; 
const { APPROOT , DEST } = DIR ; 

const config = ( env , options ) => {
  let entryList = {} 

  // MakeEntryList([ servers , 'js' ] , entryList ) ; 
  const config = {
    entry : sync( join( rootPath , 'server' , 'app-pro.js' )) , 

    output : {
      path : join( APPROOT , DEST ) , 
      filename : 'server/app.js' , 
    } , 

    mode : 'production' , 

    module : {
      rules : [
        JsRule , 
      ]
    } , 

    target: 'node',
    node: {
      // Need this when working with express, otherwise the build fails
      __dirname: false,   // if you don't put this is, __dirname
      __filename: false,  // and __filename return blank or /
    },

    externals: [nodeExternals()], // Need this to avoid error when working with Express

    plugins : []
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

  return config ; 
} ; 
export default config ; 