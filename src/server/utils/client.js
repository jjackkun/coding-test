import webpackHotMiddlewareClient from 'webpack-hot-middleware/client?reload=true' ;  
(_=>{
  webpackHotMiddlewareClient.subscribe( function( payload ) {
    // console.log( '----' , payload ) ; 
    if ( payload.action === 'reload' || payload.reload === true ) {
      window.location.reload() ; 
    }
  });
})()