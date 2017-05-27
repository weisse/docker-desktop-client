import React, { Component } from 'react'
import {SelectField, MenuItem, TextField} from 'material-ui';
import {Row, Col} from 'react-flexbox-grid';

export default class ConnectionEditorView extends Component {

    constructor() {
        super();
    }

    render() {
        return (
            <Row>
                {   this.props.mode === "socket" ? 
                    <Col xs={12}>
                        <Row>
                            <Col xs={12}>
                                <SelectField
                                    disabled={true}
                                    fullWidth={true}
                                    floatingLabelText="Mode"
                                    floatingLabelFixed={true}
                                    hintText="No mode selected"
                                    value={this.props.mode}
                                >
                                    <MenuItem value={"socket"} primaryText="Unix socket" />
                                    <MenuItem value={"http"} primaryText="HTTP" />
                                    <MenuItem value={"https"} primaryText="HTTPS" />
                                    <MenuItem value={"autodetect"} primaryText="Autodetect HTTP/HTTPS" />
                                </SelectField>
                            </Col>
                            <Col xs={12}>
                                <TextField
                                    disabled={true}
                                    fullWidth={true} 
                                    floatingLabelText="Socket path" 
                                    floatingLabelFixed={true}
                                    hintText="No socket path selected"
                                    value={this.props.socketPath}
                                />
                            </Col>
                        </Row>
                    </Col>
                    :
                    <Col xs={12}>
                        <Row>
                            <Col xs={8}>
                                <SelectField
                                    disabled={true}
                                    fullWidth={true}
                                    floatingLabelText="Mode"
                                    floatingLabelFixed={true}
                                    hintText="No mode selected"
                                    value={this.props.mode}
                                >
                                    <MenuItem value={"socket"} primaryText="Unix socket" />
                                    <MenuItem value={"http"} primaryText="HTTP" />
                                    <MenuItem value={"https"} primaryText="HTTPS" />
                                    <MenuItem value={"autodetect"} primaryText="Autodetect HTTP/HTTPS" />
                                </SelectField>
                            </Col>
                            <Col xs={4}>
                                <TextField
                                    disabled={true}
                                    fullWidth={true} 
                                    floatingLabelText="Version"
                                    floatingLabelFixed={true}
                                    hintText="No version inserted"
                                    value={this.props.version}
                                /> 
                            </Col>
                            <Col xs={8}>
                                <TextField
                                    disabled={true}
                                    fullWidth={true} 
                                    floatingLabelText="Host"
                                    floatingLabelFixed={true}
                                    hintText="No host inserted"
                                    value={this.props.host}
                                /> 
                            </Col>
                            <Col xs={4}>
                                <TextField
                                    disabled={true}
                                    fullWidth={true}
                                    floatingLabelText="Port" 
                                    floatingLabelFixed={true}
                                    hintText="No port inserted"
                                    value={this.props.port}
                                /> 
                            </Col>
                        </Row>
                        {
                            this.props.mode === "https" || this.props.mode === "autodetect" ?
                            <Row>
                                <Col xs={12}>
                                    <TextField
                                        disabled={true}
                                        fullWidth={true}
                                        floatingLabelFixed={true}
                                        floatingLabelText="CA file"
                                        hintText="No CA file inserted"
                                        value={this.props.caFile}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <TextField
                                        disabled={true}
                                        fullWidth={true}
                                        floatingLabelFixed={true}
                                        floatingLabelText="Certificate file"
                                        hintText="No certificate file inserted"
                                        value={this.props.certificateFile}
                                    />
                                </Col>
                                <Col xs={12}>
                                    <TextField
                                        disabled={true}
                                        fullWidth={true}
                                        floatingLabelFixed={true}
                                        floatingLabelText="Key file"
                                        hintText="No key file inserted"
                                        value={this.props.keyFile}
                                    />
                                </Col>
                            </Row>
                            :
                            null
                        }
                    </Col>
                }
            </Row>
        );
    }

}