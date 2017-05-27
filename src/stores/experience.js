import path from 'path'
import homedir from 'homedir'
import SyncJsonFile from '../libs/SyncJsonFile.js';

class Experience extends SyncJsonFile{
    
    constructor(){
        super(path.join(homedir(), ".docker-desktop-client/experience.json"));
    }

}

export default new Experience();