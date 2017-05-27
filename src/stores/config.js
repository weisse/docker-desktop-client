import path from 'path'
import homedir from 'homedir'
import * as defaultConfig from '../config.json'
import SyncJsonFile from '../libs/SyncJsonFile.js';

class Config extends SyncJsonFile{
    
    constructor(){
        super(path.join(homedir(), ".docker-desktop-client/config.json"));
    }

    get(prop){
        var localValue = this.data[prop];
        if(typeof localValue !== "undefined"){
            return localValue;
        }
        return defaultConfig[prop];
    }

}

export default new Config();