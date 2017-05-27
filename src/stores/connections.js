import path from 'path'
import homedir from 'homedir'
import SyncJsonFile from '../libs/SyncJsonFile.js';

class Connections extends SyncJsonFile{
    
    constructor(){
        super(path.join(homedir(), ".docker-desktop-client/connections.json"));
    }

    toList(){
        var list = [];
        for(var attr in this.data){
            list.push(this.data[attr]);
        }
        return list;
    }

}

export default new Connections();