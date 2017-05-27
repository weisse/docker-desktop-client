import React, { Component } from 'react'
import { Redirect } from 'react-router-dom'
import activeConnection from '../../stores/activeConnection.js';
import config from '../../stores/config.js'
import ContainerListView from './ContainerListView.jsx'
import {Promise} from 'bluebird'
import DataWaitLoader from '../commons/DataWaitLoader.jsx'
import Message from '../commons/Message.jsx'
import ConfirmDialog from '../commons/ConfirmDialog.jsx'
import PromptDialog from '../commons/PromptDialog.jsx'
import {TextField} from 'material-ui'
import { Row, Col } from 'react-flexbox-grid'

export default class ContainerListController extends Component {

    constructor() {
        super();
        this.state = {
            loaded: false,
            error: false,
            errorMessage: "",
            redirectTo: null,
            messageOpen: false,
            message: "",
            confirmOpen: false,
            confirmTitle: "",
            confirmMessage: "",
            promptOpen: false,
            promptTitle: "",
            promptForm: "",
            scope: "false",
            filterText: "",
            completeList: [],
            pendingList: [],
            list: []
        };
        this.handleScopeChangeEvent = this.handleScopeChangeEvent.bind(this);
        this.handleContainerInspectEvent = this.handleContainerInspectEvent.bind(this);
        this.handleContainerCommitEvent = this.handleContainerCommitEvent.bind(this);
        this.handleContainerDeleteEvent = this.handleContainerDeleteEvent.bind(this);
        this.handleContainerCreateEvent = this.handleContainerCreateEvent.bind(this);
        this.handleContainerStartEvent = this.handleContainerStartEvent.bind(this);
        this.handleContainerStopEvent = this.handleContainerStopEvent.bind(this);
        this.handleContainerPauseEvent = this.handleContainerPauseEvent.bind(this);
        this.handleContainerUnpauseEvent = this.handleContainerUnpauseEvent.bind(this);
        this.handleContainerRestartEvent = this.handleContainerRestartEvent.bind(this);
        this.handleFilterEvent = this.handleFilterEvent.bind(this);
        this.handleMessageCloseEvent = this.handleMessageCloseEvent.bind(this);
    }

    componentDidMount() {
        var self = this;
        setTimeout(() => self.update(), 0);
    }

    componentWillUnmount() {
        clearTimeout(this.timeout);
    }

    update() {
        clearTimeout(this.timeout);
        var promise = this.loadContainers();
        this.timeout = setTimeout(
            () => this.update(),
            config.get("updateInterval")
        );
        return promise;
    }

    loadContainers() {
        var self = this;
        return Promise
            .resolve({all: self.state.scope || "false"})
            .then((d) => activeConnection.connection.listContainers(d))
            .then((containers) => {
                console.debug(containers);
                return new Promise((res) => {
                    var list = self.getFinalList(containers, self.state.filterText, self.state.pendingList);
                    self.setState({ 
                        loaded: true,
                        completeList: containers,
                        list: list,
                        error: false
                    }, () => res(containers));
                });
            })
            .catch((err) => {
                return new Promise((res, rej) => {
                    self.setState({
                        loaded: true,
                        list: [],
                        error: true,
                        errorMessage: err != null ? err.message : ""
                    }, () => rej(err));
                });
            });
    }

    handleScopeChangeEvent(scope){
        this.setState({ scope: scope }, () => this.update());
    }

    handleContainerInspectEvent(containerInfo) {
        console.debug("Inspect container", containerInfo);
        this.setState({ redirectTo: "/containers/" + containerInfo.Id });
    }

    handleContainerCommitEvent(containerInfo) {
        var self = this;
        return Promise
            .resolve(containerInfo)
            .then((c) => self.addPendingContainer(c))
            .then(() => activeConnection.connection.getContainer(containerInfo.Id))
            .then((c) => {
                var repo = "";
                var tag = "";
                return new Promise((res, rej) => {
                    this.setState({
                        promptOpen: true,
                        promptTitle: "Commit Container",
                        promptForm: (
                                <Row>
                                    <Col xs={8}>
                                        <TextField hintText="Insert Repository Name" fullWidth={true} onChange={(e) => repo = e.target.value} />
                                    </Col>
                                    <Col xs={4}>
                                        <TextField hintText="Insert Tag" fullWidth={true} onChange={(e) => tag = e.target.value} />
                                    </Col>
                                </Row>
                        ),
                        onPromptSubmit: () => res(c.commit({repo: repo, tag: tag})),
                        onPromptCancel: () => rej({message: "Operation canceled"})
                    });
                })
                .finally(() => {
                    this.setState({
                        promptOpen: false,
                        promptTitle: "",
                        onPromptSubmit: null,
                        onPromptCancel: null
                    }) 
                });
            })
            .then(() => self.update())
            .then(() => self.showMessage("Container \"" + containerInfo.Names[0].substring(1) + "\" committed succesfully"))
            .catch((err) => self.showMessage(err.message))
            .finally(() => self.removePendingContainer(containerInfo))
    }

    handleContainerDeleteEvent(containerInfo) {
        var self = this;
        return Promise
            .resolve(containerInfo)
            .then((c) => self.addPendingContainer(c))
            .then(() => activeConnection.connection.getContainer(containerInfo.Id))
            .then((c) => {
                switch(containerInfo.State){
                    case "running":
                    case "paused":
                    case "restarting":
                        return new Promise((res, rej) => {
                            this.setState({
                                confirmOpen: true,
                                confirmTitle: "Are you sure?",
                                confirmMessage: "This is a running container. The \"-f\" option will be used in order to delete it.",
                                onConfirmSubmit: () => res(c.remove({force: true})),
                                onConfirmCancel: () => rej({message: "Operation canceled"})
                            });
                        }).finally(() => {
                            this.setState({
                                confirmOpen: false,
                                confirmTitle: "",
                                confirmMessage: "",
                                onConfirmSubmit: null,
                                onConfirmCancel: null
                            }) 
                        });
                    default:
                        return c.remove();
                }
                
            })
            .then(() => self.update())
            .then(() => self.showMessage("Container \"" + containerInfo.Names[0].substring(1) + "\" deleted succesfully"))
            .catch((err) => self.showMessage(err.message))
            .finally(() => self.removePendingContainer(containerInfo))
    }

    handleContainerCreateEvent() {

    }

    handleContainerStartEvent(containerInfo) {
        var self = this;
        return Promise
            .resolve(containerInfo)
            .then((c) => self.addPendingContainer(c))
            .then(() => activeConnection.connection.getContainer(containerInfo.Id))
            .then((c) => c.start())
            .then(() => self.update())
            .then(() => self.showMessage("Container \"" + containerInfo.Names[0].substring(1) + "\" started succesfully"))
            .catch((err) => self.showMessage(err.message))
            .finally(() => self.removePendingContainer(containerInfo))
    }

    handleContainerStopEvent(containerInfo) {
        var self = this;
        return Promise
            .resolve(containerInfo)
            .then((c) => self.addPendingContainer(c))
            .then(() => activeConnection.connection.getContainer(containerInfo.Id))
            .then((c) => c.stop())
            .then(() => self.update())
            .then(() => self.showMessage("Container \"" + containerInfo.Names[0].substring(1) + "\" stopped succesfully"))
            .catch((err) => self.showMessage(err.message))
            .finally(() => self.removePendingContainer(containerInfo))
    }

    handleContainerPauseEvent(containerInfo) {
        var self = this;
        return Promise
            .resolve(containerInfo)
            .then((c) => self.addPendingContainer(c))
            .then(() => activeConnection.connection.getContainer(containerInfo.Id))
            .then((c) => c.pause())
            .then(() => self.update())
            .then(() => self.showMessage("Container \"" + containerInfo.Names[0].substring(1) + "\" paused succesfully"))
            .catch((err) => self.showMessage(err.message))
            .finally(() => self.removePendingContainer(containerInfo))
    }

    handleContainerUnpauseEvent(containerInfo) {
        var self = this;
        return Promise
            .resolve(containerInfo)
            .then((c) => self.addPendingContainer(c))
            .then(() => activeConnection.connection.getContainer(containerInfo.Id))
            .then((c) => c.unpause())
            .then(() => self.update())
            .then(() => self.showMessage("Container \"" + containerInfo.Names[0].substring(1) + "\" unpaused succesfully"))
            .catch((err) => self.showMessage(err.message))
            .finally(() => self.removePendingContainer(containerInfo))
    }

    handleContainerRestartEvent(containerInfo) {
        var self = this;
        return Promise
            .resolve(containerInfo)
            .then((c) => self.addPendingContainer(c))
            .then(() => activeConnection.connection.getContainer(containerInfo.Id))
            .then((c) => c.restart())
            .then(() => self.update())
            .then(() => self.showMessage("Container \"" + containerInfo.Names[0].substring(1) + "\" restarted succesfully"))
            .catch((err) => self.showMessage(err.message))
            .finally(() => self.removePendingContainer(containerInfo))
    }

    handleFilterEvent(filterText){
        var self = this;
        clearTimeout(this.filterTimeout);
        this.filterTimeout = setTimeout(function(){
            self.setState({
                filterText: filterText,
                list: self.getFinalList(self.state.completeList, filterText, self.state.pendingList)
            });
        }, config.get("inputTypeChangeDelay"));
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

    addPendingContainer(containerInfo){
        var self = this;
        var pendingList = JSON.parse(JSON.stringify(this.state.pendingList));
        pendingList.push(containerInfo.Id);
        return new Promise((res) => {
            self.setState({
                pendingList: pendingList,
                list: self.getFinalList(self.state.completeList, self.state.filterText, pendingList)
            }, res);
        })
    }

    removePendingContainer(containerInfo){
        var self = this;
        var pendingList = JSON.parse(JSON.stringify(this.state.pendingList));
        var id = containerInfo.Id;
        pendingList = pendingList.filter((cId) => cId !== id);
        return new Promise((res) => {
            self.setState({
                pendingList: pendingList,
                list: self.getFinalList(self.state.completeList, self.state.filterText, pendingList)
            }, res);
        });
    }

    getFinalList(completeList, filterText, pendingList){
        var finalList = JSON.parse(JSON.stringify(completeList));
        if(filterText){
            var regexp = new RegExp(filterText);
            finalList = finalList.filter((container) => {
                if(regexp.test(container.Id)){
                    return true;
                }
                if(regexp.test(container.Image)){
                    return true;
                }
                var names = container.Names.map((n) => n.substring(1));
                for(var i = 0; i < names.length; i++){
                    if(regexp.test(names[i])){
                        return true;
                    }
                }
            });
        }
        finalList.forEach((container) => {
            var id = container.Id;
            if(pendingList.find((cId) => cId === id)){
                container._pending_ = true;
            }else{
                container._pending_ = false;
            }
        });
        return finalList;
    }

    render() {
        if (this.state.redirectTo) {
            return <Redirect to={this.state.redirectTo} />;
        }
        return (
            <DataWaitLoader loaded={this.state.loaded} error={this.state.error} errorMessage={this.state.errorMessage} loadingMessage="Loading containers...">
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
                <PromptDialog
                    open={this.state.promptOpen}
                    title={this.state.promptTitle}
                    onConfirm={this.state.onPromptSubmit}
                    onCancel={this.state.onPromptCancel}
                >{this.state.promptForm || <div />}</PromptDialog>
                <ContainerListView
                    data={this.state.list}
                    scope={this.state.scope}
                    onScopeChange={this.handleScopeChangeEvent}
                    onContainerInspect={this.handleContainerInspectEvent}
                    onContainerCommit={this.handleContainerCommitEvent}
                    onContainerDelete={this.handleContainerDeleteEvent}
                    onContainerCreate={this.handleContainerCreateEvent}
                    onContainerStop={this.handleContainerStopEvent}
                    onContainerPause={this.handleContainerPauseEvent}
                    onContainerUnpause={this.handleContainerUnpauseEvent}
                    onContainerRestart={this.handleContainerRestartEvent}
                    onContainerStart={this.handleContainerStartEvent}
                    onFilter={this.handleFilterEvent}
                />
            </DataWaitLoader>
        );
    }

}