import { createContext } from 'react' ; 

const initState = (_=>{ class initState {
  _info = null ; 

  get info () { return this._info } ; 
  set info ( infoObj ) { this._info = infoObj } ; 
} return new initState ; })() ; 

const InitContext = createContext( initState ) ; 
export default InitContext ; 