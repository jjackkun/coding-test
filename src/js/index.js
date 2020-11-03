import React from 'react' ; 
import ReactDOM from 'react-dom' ; 

import App from './index/App' ; 
import { initFunc } from '@include/InitNew' ; 

window.addEventListener("load", _=> {
	ReactDOM.render( 
		initFunc( <App /> ) , 
		document.querySelector( '#rootWrap' )
	) ; 
}) ; 