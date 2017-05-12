import React, {Component} from 'react'
import {Dialog, Snackbar, RaisedButton} from 'material-ui';

export default class FeedbackElement extends Component{

    render(){
        return (
            <Dialog
                open={this.props.open}
                title={this.props.title}
                actions={
                    <div>
                        <RaisedButton
                            label={this.props.cancelLabel || "Cancel"}
                            onTouchTap={this.props.onCancel}
                        />
                        &nbsp;
                        <RaisedButton 
                            label={this.props.confirmLabel || "Confirm"}
                            primary={true}
                            onTouchTap={this.props.onConfirm}
                        />
                    </div>
                }
                modal={true}
            >{this.props.message}</Dialog>
        );
    }

}