import express from 'express' ; 
import session from 'express-session' ;
import { join } from 'path' ;

import webpack from 'webpack' ; 
import webpackDevMiddleware from 'webpack-dev-middleware' ; 
import webpackHotMiddleware from 'webpack-hot-middleware' ; 
import reactViews from 'express-react-views' ; 
import bodyParser from 'body-parser' ; 

import webpackConfig from '@config/webpack.config.dev.babel' ; 
import { DIR } from '@config/Dir' ; 

/**
 * [ api ]
 * **/

/**
 * [ routes ]
 * @Books : API. BOOK ( test ) 
*  **/
import Index from './routes/Index' ; 

const createServer = _=> {
  console.log( 'server in' ) ; 

  const config = webpackConfig() ; 
  const compiler = webpack( config ) ; 
  const { APPROOT , SRC : _SRC ,  DEST : _DEST , PORT } = DIR ; 
  const SRC = join( APPROOT , _SRC ) ; 
  const DEST = join( APPROOT , _DEST ) ; 
  const app = express() ; 
  const hotMiddleware = webpackHotMiddleware( compiler ) ; 
  const devMiddleware = webpackDevMiddleware( compiler , {
    noInfo : true , 
    publicPath : config.output.publicPath , 
    module : config.module , 
    plugins : config.plugins , 
    devServer : config.devServer , 
    stats : 'errors-only' , 
  }) ; 
  const staticMiddleware = express.static( DEST ) ; 

  const sessionOpt = session({
    secret : 'keyboard cat' ,
    resave : false ,
    saveUninitialized : true
  }) ;
  
  app
    .use( sessionOpt )
    .use( bodyParser.json({limit: '50mb', extended: true}) )
    .use( bodyParser.urlencoded({ limit: '50mb', extended : true }) )
    .use( staticMiddleware )
    .use( devMiddleware )
    .use( hotMiddleware )
    .set( 'json spaces', 2 )
    .set( 'views' , join( SRC , 'page' ))
    .set( 'view engine' , 'js' )
    .engine( 'js' , reactViews.createEngine())
    

    // api


    // routes
    .use( '/' , Index ) 
  ;

  const startServer = _ => {
    app.listen( PORT , _=> {
      console.log( `Express is listening on port ${ PORT }` ) ; 
    }) ; 
  }
  
  const reloadClient = _ => {
    hotMiddleware.publish({ action : 'reload' }) ; 
  } 

  return {
    start : startServer , 
    reloadClient , 
  }
} ;

export default createServer() ; 