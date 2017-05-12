import React, {Component} from 'react'
import {Snackbar} from 'material-ui';

export default class Message extends Component{

    render(){
        return (
            <Snackbar
                open={this.props.open}
                message={this.props.message}
                onRequestClose={this.props.onClose}
            />
        );
    }

}