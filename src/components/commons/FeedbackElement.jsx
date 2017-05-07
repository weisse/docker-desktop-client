import React, {Component} from 'react'
import {Dialog, Snackbar} from 'material-ui';

export default class FeedbackElement extends Component{

    render(){
        return (
            <div>
                <Snackbar
                    open={this.props.messageOpen}
                    message={this.props.message}
                    onRequestClose={this.props.onMessageClose}
                />
                <Dialog
                    open={this.props.promptOpen}
                    title={this.props.promptTitle}
                    actions={this.props.promptAction}
                    modal={true}
                >{this.props.prompt}</Dialog>
            </div>
        );
    }

}