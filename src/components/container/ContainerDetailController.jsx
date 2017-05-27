import React, { Component } from 'react'
import ContainerDetailView from './ContainerDetailView.jsx';
import { Promise } from 'bluebird';
import config from '../../stores/config.js'
import activeConnection from '../../stores/activeConnection.js';

export default class ContainerListController extends Component {

    constructor() {
        super();
        this.state = {
            loaded: false,
            error: false,
            data: null
        };
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
        var promise = this.loadContainer();
        this.timeout = setTimeout(
            () => this.update(),
            config.get("updateInterval")
        );
        return promise;
    }

    loadContainer() {
        return Promise
            .resolve(this.props.match.params.containerId)
            .then((id) => activeConnection.connection.getContainer(id))
            .then((c) => c.inspect())
            .then((i) => {
                console.debug("Container", i);
                return new Promise((res, rej) => {
                    this.setState({ loaded: true, data: i }, () => res(i));
                });
            })
            .catch((e) => {
                return new Promise((res, rej) => {
                    this.setState({ loaded: true, error: true, errorMessage: e != null ? e.message : "" }, () => rej(e))
                });
            });
    }

    render() {
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