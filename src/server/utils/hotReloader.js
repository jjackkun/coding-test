import chokidar from 'chokidar' ; 
import PATH from '@config/Dir' ; 
const { cssList , components , cssAllList } = PATH ; 

const HotReloader = _=> {  
  const active = server => {
    const watcher = chokidar.watch([
      cssList , 
      components , 
      cssAllList , 
    ]) ; 

    watcher.on( 'ready' , _=> {
      console.log( 'Initial scan complete. Ready for changes' ) ; 
    }) ; 

    watcher.on( 'change' , path => {
      console.log( `File ['${ path }] changed !`) ; 
      server.reloadClient() ; 
    }) ; 
  } 

  return {
    active , 
  }
} ;

export default HotReloader() ; 