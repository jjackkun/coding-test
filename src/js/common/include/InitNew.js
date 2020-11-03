import React, { createContext , useContext , Fragment , useEffect } from 'react' ; 

import InitContext from '@include/InitContext' ; 

const App = props => {
  const InitContxt = useContext( InitContext ) ; 
  InitContxt.info = window.__INITIAL_STATE__ ; 
  delete window.__INITIAL_STATE__ ; 
  document.querySelector( '.initialState' ).remove() ; 

  return (
    <Fragment>
      { props.children } 
    </Fragment>
  ) ; 
}

const initFunc = comp => <App>{ comp }</App> ; 
export { initFunc } ; 