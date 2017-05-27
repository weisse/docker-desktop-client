import React, { Component } from 'react'
import {SelectField, MenuItem, TextField, IconButton} from 'material-ui';
import {Row, Col} from 'react-flexbox-grid';
import Attachment from 'material-ui/svg-icons/file/attachment';

export default class ConnectionEditorView extends Component {

    constructor() {
        super();
    }

    componentDidMount(){
        this.nameInput.focus();
    }

    render() {
        return (
            <Row>
                <Col xs={12}>
                    <TextField
                        fullWidth={true} 
                        floatingLabelText="Name" 
                        hintText="Insert connection name" 
                        onChange={(e) => this.props.onNameChange(e.target.value)}
                        value={this.props.name}
                        ref={(input) => { this.nameInput = input; }}
                    />
                </Col>
                {   this.props.mode === "socket" ? 
                    <Col xs={12}>
                        <Row>
                            <Col xs={12}>
                                <SelectField
                                    fullWidth={true}
                                    floatingLabelText="Mode"
                                    value={this.props.mode}
                                    onChange={(e, i, v) => this.props.onModeChange(v)}
                                >
                                    <MenuItem value={"socket"} primaryText="Unix socket" />
                                    <MenuItem value={"http"} primaryText="HTTP" />
                                    <MenuItem value={"https"} primaryText="HTTPS" />
                                    <MenuItem value={"autodetect"} primaryText="Autodetect HTTP/HTTPS" />
                                </SelectField>
                            </Col>
                            <Col xs={2} style={{textAlign: "center"}}>
                                <IconButton 
                                    tooltip="Choose"
                                    touch={true}
                                    tooltipPosition="top-center"
                                    style={{marginTop: "15px"}}
                                    onTouchTap={() => this.socketPathInput.click()}
                                >
                                    <Attachment />
                                </IconButton>
                            </Col>
                            <Col xs={10}>
                                <TextField
                                    disabled={true}
                                    fullWidth={true} 
                                    floatingLabelText="Socket path" 
                                    hintText="Insert unix socket path" 
                                    value={this.props.socketPath}
                                />
                                <input 
                                    type="file"
                                    style={{display:"none"}}
                                    onChange={() => this.props.onSocketPathChange(this.socketPathInput.files[0].path)}
                                    ref={(input) => this.socketPathInput = input}
                                />
                            </Col>
                        </Row>
                    </Col>
                    :
                    <Col xs={12}>
                        <Row>
                            <Col xs={8}>
                                <SelectField
                                    fullWidth={true}
                                    floatingLabelText="Mode"
                                    value={this.props.mode}
                                    onChange={(e, i, v) => this.props.onModeChange(v)}
                                >
                                    <MenuItem value={"socket"} primaryText="Unix socket" />
                                    <MenuItem value={"http"} primaryText="HTTP" />
                                    <MenuItem value={"https"} primaryText="HTTPS" />
                                    <MenuItem value={"autodetect"} primaryText="Autodetect HTTP/HTTPS" />
                                </SelectField>
                            </Col>
                            <Col xs={4}>
                                <TextField
                                    fullWidth={true} 
                                    floatingLabelText="Version" 
                                    hintText="Insert the API version" 
                                    onChange={(e) => this.props.onVersionChange(e.target.value)}
                                    value={this.props.version}
                                /> 
                            </Col>
                            <Col xs={8}>
                                <TextField
                                    fullWidth={true} 
                                    floatingLabelText="Host" 
                                    hintText="Insert hostname or ip" 
                                    onChange={(e) => this.props.onHostChange(e.target.value)}
                                    value={this.props.host}
                                /> 
                            </Col>
                            <Col xs={4}>
                                <TextField
                                    fullWidth={true}
                                    floatingLabelText="Port" 
                                    hintText="Insert port" 
                                    onChange={(e) => this.props.onPortChange(e.target.value)}
                                    value={this.props.port}
                                /> 
                            </Col>
                        </Row>
                        {
                            this.props.mode === "https" || this.props.mode === "autodetect" ?
                            <Row>
                                <Col xs={2} style={{textAlign: "center"}}>
                                    <IconButton 
                                        tooltip="Choose"
                                        touch={true}
                                        tooltipPosition="top-center"
                                        style={{marginTop: "15px"}}
                                        onTouchTap={() => this.caInput.click()}
                                    >
                                        <Attachment />
                                    </IconButton>
                                </Col>
                                <Col xs={10}>
                                    <TextField
                                        disabled={true}
                                        fullWidth={true}
                                        floatingLabelFixed={true}
                                        hintText="Choose a certification authorities file"
                                        floatingLabelText="CA file"
                                        value={this.props.caFile}
                                    />
                                    <input 
                                        type="file"
                                        style={{display:"none"}}
                                        onChange={() => this.props.onCaFileChange(this.caInput.files[0].path)}
                                        ref={(input) => this.caInput = input}
                                    />
                                </Col>
                                <Col xs={2} style={{textAlign: "center"}}>
                                    <IconButton 
                                        tooltip="Choose"
                                        touch={true}
                                        tooltipPosition="top-center"
                                        style={{marginTop: "15px"}}
                                        onTouchTap={() => this.certificateInput.click()}
                                    >
                                        <Attachment />
                                    </IconButton>
                                </Col>
                                <Col xs={10}>
                                    <TextField
                                        disabled={true}
                                        fullWidth={true}
                                        floatingLabelFixed={true}
                                        hintText="Choose a certificate file"
                                        floatingLabelText="Certificate file"
                                        value={this.props.certificateFile}
                                    />
                                    <input 
                                        type="file"
                                        style={{display:"none"}}
                                        onChange={() => this.props.onCertificateFileChange(this.certificateInput.files[0].path)}
                                        ref={(input) => this.certificateInput = input}
                                    />
                                </Col>
                                <Col xs={2} style={{textAlign: "center"}}>
                                    <IconButton 
                                        tooltip="Choose"
                                        touch={true}
                                        tooltipPosition="top-center"
                                        style={{marginTop: "15px"}}
                                        onTouchTap={() => this.keyInput.click()}
                                    >
                                        <Attachment />
                                    </IconButton>
                                </Col>
                                <Col xs={10}>
                                    <TextField
                                        disabled={true}
                                        fullWidth={true}
                                        floatingLabelFixed={true}
                                        hintText="Choose a key file"
                                        floatingLabelText="Key file"
                                        value={this.props.keyFile}
                                    />
                                    <input 
                                        type="file"
                                        style={{display:"none"}}
                                        onChange={() => this.props.onKeyFileChange(this.keyInput.files[0].path)}
                                        ref={(input) => this.keyInput = input}
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