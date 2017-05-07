import React, { Component } from 'react'
import connection from '../../../libs/connection.js'
import * as config from '../../../config.json'
import ContainerDetailView from '../../views/container/ContainerDetailView.jsx';
import {Promise} from 'bluebird';

export default class ContainerListController extends Component{

    constructor(){
        super();
        this.state = {
            loaded: false,
            error: false,
            data: {}
        };
    }

    componentDidMount(){
        var self = this;
        setTimeout(() => self.update(), 2000);
    }

    componentWillUnmount(){
        clearTimeout(this.timeout);
    }

    update() {
        clearTimeout(this.timeout);
        var promise = this.loadContainer();
        this.timeout = setTimeout(
            () => this.update(),
            config.updateInterval
        );
        return promise;
    }

    loadContainer(){
        return Promise
            .resolve(this.props.match.params.containerId)
            .then((id) => connection.getContainer(id))
            .then((c) => c.inspect())
            .then((i) => {
                console.debug("Container", i);
                return new Promise((res, rej) => {
                    this.setState({loaded:true, data:i}, () => res(i));
                });
            })
            .catch((e) => {
                return new Promise((res, rej) => {
                    this.setState({loaded:true, error: true, errorMessage: e != null ? e.message : ""}, () => rej(e))
                });
            });
    }

    render(){
        return (
            <ContainerDetailView 
                loaded={this.state.loaded}
                error={this.state.error}
                errorMessage={this.state.errorMessage}
                data={this.state.data}
                messageOpen={this.state.messageOpen}
                message={this.state.message}
                promptOpen={this.state.promptOpen}
                promptTitle={this.state.promptTitle}
                prompt={this.state.prompt}
                promptAction={this.state.promptAction}
                onMessageClose={this.handleMessageCloseEvent}
            />
        )
    }

}