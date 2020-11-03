import express from 'express' ; 
import Layout from '@layouts/layout' ; 

let router = express.Router() ; 

router
  .use(( req , res , next ) => {
    req.init = {
      chunkName : 'index' , 
      title : 'Hello World' ,       
    } ; 
    next() ; 
  })
  .get( '/' , ( req , res ) => {
    res.send(Layout( req.init )) ; 
  }) 
; 

export default router ; 