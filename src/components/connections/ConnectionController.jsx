import React, { Component } from 'react'
import {Paper, RaisedButton} from 'material-ui';
import {Row, Col} from 'react-flexbox-grid';
import connections from '../../stores/connections.js'
import ConnectionChooseView from './ConnectionChooseView.jsx'
import ConnectionDetailView from './ConnectionDetailView.jsx'
import ConnectionEditorView from './ConnectionEditorView.jsx'
import Message from '../commons/Message.jsx'
import ConfirmDialog from '../commons/ConfirmDialog.jsx'
import {Promise} from 'bluebird'
import activeConnection from '../../stores/activeConnection';
import fs from 'fs'

export default class ConnectionController extends Component {
    
    constructor(){
        super();
        this.state = {
            name: "",
            mode: "socket",
            socketPath: "/var/run/docker.sock",
            host: "localhost",
            version: "",
            port: "2375",
            caFile: "",
            certificateFile: "",
            keyFile: "",
            edit: false,
            selected: false,
            messageOpen: false,
            message: "",
            confirmOpen: false,
            confirmTitle: "",
            confirmMessage: "",
        };
        this.handleNameChange = this.handleNameChange.bind(this);
        this.handleModeChange = this.handleModeChange.bind(this);
        this.handleSocketPathChange = this.handleSocketPathChange.bind(this);
        this.handleVersionChange = this.handleVersionChange.bind(this);
        this.handleHostChange = this.handleHostChange.bind(this);
        this.handlePortChange = this.handlePortChange.bind(this);
        this.handleCaFileChange = this.handleCaFileChange.bind(this);
        this.handleCertificateFileChange = this.handleCertificateFileChange.bind(this);
        this.handleKeyFileChange = this.handleKeyFileChange.bind(this);
        this.handleConnectionSelect = this.handleConnectionSelect.bind(this);
        this.handleEdit = this.handleEdit.bind(this);
        this.handleFork = this.handleFork.bind(this);
        this.handleDelete = this.handleDelete.bind(this);
        this.handleCancelEdit = this.handleCancelEdit.bind(this);
        this.handleSaveEdit = this.handleSaveEdit.bind(this);
        this.handleConnect = this.handleConnect.bind(this);
        this.handleSaveAndConnect = this.handleSaveAndConnect.bind(this);
        this.handleMessageCloseEvent = this.handleMessageCloseEvent.bind(this);
    }

    componentDidMount(){
        this.setFirstConnection();
    }

    setFirstConnection(){
        for(var name in connections.data){
            this.handleConnectionSelect(name);
            return;
        }
        this.setNewConnection();
    }

    handleConnectionSelect(name){
        var connection = connections.data[name];
        if(connection){
            var connectionClone = JSON.parse(JSON.stringify(connection));
            connectionClone.selected = name;
            connectionClone.edit = false;
            this.setState(connectionClone);
        }else{
            this.setNewConnection();
        }
        
    }

    setNewConnection(){
        this.setState({
            name: "",
            mode: "socket",
            socketPath: "/var/run/docker.sock",
            host: "localhost",
            version: "",
            port: "2375",
            caFile: "",
            certificateFile: "",
            keyFile: "",
            selected: false,
            edit: false
        });
    }

    handleEdit(){
        this.setState({edit:true});
    }

    delete(){
        var connectionsClone = JSON.parse(JSON.stringify(connections.data));
        delete connectionsClone[this.state.name];
        connections.data = connectionsClone;
        this.setFirstConnection();
    }

    handleDelete(){
        var connectionName = this.state.name;
        return new Promise((res, rej) => {
            this.setState({
                confirmOpen: true,
                confirmTitle: "Are you sure?",
                confirmMessage: "Do you really want to delete the connection called \"" + connectionName + "\"?",
                onConfirmSubmit: () => {
                    this.delete();
                    res(connectionName);
                },
                onConfirmCancel: () => {
                    rej({message: "Operation canceled"});
                }
            });
        }).then((connectionName) => {
            this.showMessage("Connection \"" + connectionName + "\" deleted successfully.");
        }).catch((error) => {
            this.showMessage(error.message);
        }).finally(() => {
            this.setState({
                confirmOpen: false,
                confirmTitle: "",
                confirmMessage: "",
                onConfirmSubmit: null,
                onConfirmCancel: null
            })
        });
    }

    handleFork(){
        this.setState({
            name: "",
            mode: this.state.mode,
            socketPath: this.state.socketPath,
            host: this.state.host,
            version: this.state.version,
            port: this.state.port,
            caFile: this.state.caFile,
            certificateFile: this.state.certificateFile,
            keyFile: this.state.keyFile,
            selected: false,
            edit: false
        });
    }

    handleNameChange(name){
        this.setState({name:name});
    }

    handleModeChange(mode){
        this.setState({mode:mode});
    }

    handleSocketPathChange(socketPath){
        this.setState({socketPath:socketPath});
    }

    handleVersionChange(version){
        this.setState({version:version});
    }

    handleHostChange(host){
        this.setState({host:host});
    }

    handlePortChange(port){
        this.setState({port:port});
    }

    handleCaFileChange(caFile){
        this.setState({caFile:caFile});
    }

    handleCertificateFileChange(certificateFile){
        this.setState({certificateFile:certificateFile});
    }

    handleKeyFileChange(keyFile){
        this.setState({keyFile:keyFile});
    }

    handleConnect(){
        var descriptor = {};
        if(this.state.mode === "socket"){
            descriptor.socketPath = this.state.socketPath;
        }else{
            descriptor.host = this.state.host;
            descriptor.port = this.state.port;
            descriptor.version = this.state.version;
            if(this.state.mode === "http"){
                descriptor.protocol = this.state.mode;
            }else{
                descriptor.ca = this.state.caFile ? fs.readFileSync(this.state.caFile) : null;
                descriptor.cert = this.state.certificateFile ? fs.readFileSync(this.state.certificateFile) : null;
                descriptor.key = this.state.keyFile ? fs.readFileSync(this.state.keyFile) : null;
                if(this.state.mode === "https"){
                    descriptor.protocol = this.state.mode;
                }
            }
        }
        activeConnection.activate(descriptor);
    }

    handleCancelEdit(){
        this.handleConnectionSelect(this.state.selected);
    }

    save(){
        var connectionsClone = JSON.parse(JSON.stringify(connections.data));
        delete connectionsClone[this.state.selected];
        connectionsClone[this.state.name] = {
            name: this.state.name,
            mode: this.state.mode,
            socketPath: this.state.socketPath,
            host: this.state.host,
            version: this.state.version,
            port: this.state.port,
            caFile: this.state.caFile,
            certificateFile: this.state.certificateFile,
            keyFile: this.state.keyFile,
        };
        connections.data = connectionsClone;
        this.setState({selected:this.state.name,edit:false});
    }

    handleSaveEdit(){
        var connectionName = this.state.name;
        return new Promise((res, rej) => {
            try{
                this.save();
                res(connectionName);
            }catch(e){
                rej(e);
            }
        }).then((connectionName) => {
            this.showMessage("Connection \"" + connectionName + "\" edited successfully.")
        }).catch((error) => {
            this.showMessage(error.message);
        });
    }

    handleSaveAndConnect(){
        for(var name in connections.data){
            if(name === this.state.name){
                return;
            }
        }
        this.save();
        this.handleConnect();
    }

    handleMessageCloseEvent(){
        this.setState({
            messageOpen: false,
            message: ""
        });
    }

    showMessage(message){
        this.setState({
            messageOpen: true,
            message: message
        });
    }

    render() {
        return (
            <div>
                <Row middle="xs" center="xs" style={{position: "fixed", height: "100%", width: "100%"}}>
                    <Col xs={8} md={6} lg={4} style={{textAlign: "left"}}>
                        <Paper style={{padding: "15px"}}>
                            {
                                this.state.edit ? 
                                <div>
                                    <ConnectionEditorView
                                        name={this.state.name}
                                        onNameChange={this.handleNameChange}
                                        mode={this.state.mode}
                                        onModeChange={this.handleModeChange}
                                        socketPath={this.state.socketPath}
                                        onSocketPathChange={this.handleSocketPathChange}
                                        version={this.state.version}
                                        onVersionChange={this.handleVersionChange}
                                        host={this.state.host}
                                        onHostChange={this.handleHostChange}
                                        port={this.state.port}
                                        onPortChange={this.handlePortChange}
                                        caFile={this.state.caFile}
                                        onCaFileChange={this.handleCaFileChange}
                                        certificateFile={this.state.certificateFile}
                                        onCertificateFileChange={this.handleCertificateFileChange}
                                        keyFile={this.state.keyFile}
                                        onKeyFileChange={this.handleKeyFileChange}
                                    />
                                    <Row>
                                        <Col xs={6} style={{marginTop: "15px"}}>
                                            <RaisedButton 
                                                label="Cancel"
                                                fullWidth={true}
                                                onTouchTap={this.handleCancelEdit}
                                            />
                                        </Col>
                                        <Col xs={6} style={{marginTop: "15px"}}>
                                            <RaisedButton
                                                primary={true}
                                                label="Save"
                                                fullWidth={true}
                                                onTouchTap={this.handleSaveEdit}
                                            />
                                        </Col>
                                    </Row>
                                </div>
                                :
                                (<div>
                                    <ConnectionChooseView
                                        onConnectionChange={this.handleConnectionSelect}
                                        connection={this.state.name}
                                        selected={this.state.selected}
                                        onEdit={this.handleEdit}
                                        onFork={this.handleFork}
                                        onDelete={this.handleDelete}
                                    />
                                    {
                                        this.state.selected ?
                                        <div>
                                            <ConnectionDetailView {...this.state} />
                                            <Col xs={12} style={{marginTop: "15px"}}>
                                                <RaisedButton 
                                                    primary={true}
                                                    label="Connect"
                                                    fullWidth={true}
                                                    onTouchTap={this.handleConnect}
                                                />
                                            </Col>
                                        </div>
                                        :
                                        <div>
                                            <ConnectionEditorView
                                                name={this.state.name}
                                                onNameChange={this.handleNameChange}
                                                mode={this.state.mode}
                                                onModeChange={this.handleModeChange}
                                                socketPath={this.state.socketPath}
                                                onSocketPathChange={this.handleSocketPathChange}
                                                version={this.state.version}
                                                onVersionChange={this.handleVersionChange}
                                                host={this.state.host}
                                                onHostChange={this.handleHostChange}
                                                port={this.state.port}
                                                onPortChange={this.handlePortChange}
                                                caFile={this.state.caFile}
                                                onCaFileChange={this.handleCaFileChange}
                                                certificateFile={this.state.certificateFile}
                                                onCertificateFileChange={this.handleCertificateFileChange}
                                                keyFile={this.state.keyFile}
                                                onKeyFileChange={this.handleKeyFileChange}
                                            />
                                            <Col xs={12} style={{marginTop: "15px"}}>
                                                <RaisedButton 
                                                    primary={true}
                                                    label={this.state.name ? "Save and Connect" : "Connect"}
                                                    fullWidth={true}
                                                    onTouchTap={this.state.name ? this.handleSaveAndConnect : this.handleConnect}
                                                />
                                            </Col>
                                        </div>
                                    }
                                </div>)
                            }
                        </Paper>
                    </Col>
                </Row>
                <Message
                    open={this.state.messageOpen}
                    message={this.state.message}
                    onClose={this.handleMessageCloseEvent}
                />
                <ConfirmDialog
                    open={this.state.confirmOpen}
                    title={this.state.confirmTitle}
                    message={this.state.confirmMessage}
                    onConfirm={this.state.onConfirmSubmit}
                    onCancel={this.state.onConfirmCancel}
                />
            </div>
        );
    }

}