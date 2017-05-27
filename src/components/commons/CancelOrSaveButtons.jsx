import React, {Component} from 'react'
import {RaisedButton} from 'material-ui';
import {Row, Col} from 'react-flexbox-grid';

export default class CancelOrSave extends Component{

    render(){
        return (
            <Row>
                <Col xs={6} style={{marginTop: "15px"}}>
                    <RaisedButton 
                        label="Cancel"
                        fullWidth={true}
                        onTouchTap={this.props.onCancel}
                    />
                </Col>
                <Col xs={6} style={{marginTop: "15px"}}>
                    <RaisedButton 
                        primary={true}
                        label="Save"
                        fullWidth={true}
                        onTouchTap={this.props.onSave}
                    />
                </Col>
            </Row>
        );
    }

}