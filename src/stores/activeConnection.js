import {observable} from 'mobx'
import Docker from 'dockerode'

class ActiveConnection {

    @observable isActive = false;
    connection;

    constructor(){
        //setTimeout(()=> this.activate({socketPath: '/var/run/docker.sock'}), 5000);
    }

    activate(description){
        this.connection = new Docker(description);
        this.isActive = true;
    }

}

export default new ActiveConnection();