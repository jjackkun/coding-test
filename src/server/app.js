import hotReloader from '@utils/hotReloader' ; 
import server from './server' ; 

hotReloader.active( server ) ; 
server.start() ; 