import fs from 'fs'
import jsonfile from 'jsonfile'
import bluebird, {Promise} from 'bluebird'
import {observable, computed} from 'mobx';

export default class SyncJsonFile {

    @observable _data;

    constructor(path){
        this.filePath = path;
        this.syncTimeout = 5000;
        console.debug("Create new SyncJsonFile", this.filePath);
        this.sync = this.sync.bind(this);
        this.initialize();
        this.sync();
    }

    set data(data){
        this._data = data;
        this.store();
    }

    @computed get data(){
        return this._data;
    }

    initialize(){
        console.debug("Initialize SyncJsonFile", this.filePath);
        var exists = fs.existsSync(this.filePath);
        if(!exists){
            console.debug("The file", this.filePath, "doesn't exist")
            jsonfile.writeFileSync(this.filePath, "{}", {flag:"w"});
        }else{
            console.debug("The file", this.filePath, "already exists");
        }
        this.load();
    }

    sync(){
        var self = this;
        setTimeout(function(){
            self.loadAsync().then(self.sync);   
        }, this.syncTimeout);
    }

    load(){
        console.debug("Loading the content of SyncJsonFile", this.filePath);
        this._data = jsonfile.readFileSync(this.filePath);
        console.debug("Content of SyncJsonFile loaded:", this._data);
    }

    loadAsync(){
        var self = this;
        console.debug("Loading the content of SyncJsonFile", this.filePath);
        return new Promise(function(res, rej){
            jsonfile.readFile(self.filePath, function(err, content){
                if(err){
                    rej(err);
                }
                res(content);
            });
        })
        .then((content) => this._data = content)
        .then(() => console.debug("Content of SyncJsonFile loaded:", this._data));
    }

    store(){
        console.debug("Storing content", this._data, "on SyncJsonFile", this.filePath);
        jsonfile.writeFileSync(this.filePath, this._data, {flag:"w"});
        console.debug("Content of SyncJsonFile stored:", this._data);
    }

    storeAsync(){
        console.debug("Storing content", this._data, "on SyncJsonFile", this.filePath);
        return new Promise(function(res, rej){
            jsonfile.writeFile(this.filePath, this._data, {flag:"w"}, function(err){
                if(err){
                    rej(err);
                }
                res(this._data);
            });    
        })
        .then((content) => this._data = content)
        .then(() => console.debug("Content of SyncJsonFile stored:", this._data));
    }

}