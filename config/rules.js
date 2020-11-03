import MiniCssExtractPlugin from'mini-css-extract-plugin' ; 
import CopyWebpackPlugin from 'copy-webpack-plugin' ; 
import { join } from 'path' ; 


import PATH from '@config/Dir' ; 

const { rootPath } = PATH ; 

const ScssRule = {
  module : {
    test : /\.(css|scss)$/i , 
    exclude : [
      /node_modules/ , 
      join( rootPath , 'js' )
    ] , 
    use : [ 'style-loader' , MiniCssExtractPlugin.loader , 'css-loader' , 'sass-loader' ]
  } , 
  plugin : new MiniCssExtractPlugin({ filename : 'css/[name].css' }) , 
} ;

const ScssJsRule = {
  test : /\.scss$/i , 
  include : [ join( rootPath , 'js' ) ] , 
  // use : [ 'style-loader' , 'css-loader' , 'sass-loader' ] , 
  use: [
    {
      loader: 'file-loader',
    } , 
  ] , 
} ;

const JsRule = {
  test : /\.(js|jsx)$/i , 
  exclude : /node_modules/ , 
  use : [ 'babel-loader' ] , 
} ; 

const CopyPlugin = new CopyWebpackPlugin([
  {
    from : `src/images` , 
    to : 'images' , 
    ignore: [ 'spriteImg/**/*' ] , 
  }
]) ; 

const imageRule = imgsPath => {
  let arr = [] ; 
  const imageRule = {
    test : /\.(png|jpg|gif|svg)$/i , 
    include : [ join( rootPath , "images" ) , join( rootPath , "images/bg" ) ] , 
    exclude : [ join( rootPath , "images/sprite" ) ] , 
    use : [
      {
        loader : 'file-loader' , 
        options : {
          esModule : false , 
          emitFile : false , 
          useRelativePath : true , 
          name : `[path][name].[ext]` , 
          outputPath : ( url , resourcePath , context ) => {
            return `${ imgsPath }${ url.split( 'images/' )[1] }` ; 
          }
        }
      }  
    ]
  } ; 
  arr[ arr.length ] = imageRule ; 
  return arr  ; 
}

export { ScssRule , ScssJsRule , JsRule , CopyPlugin , imageRule } ; 