import Message from './Message';
import Realm from 'realm';


let globalRealm = new Realm({schema: [Message]})

export default globalRealm