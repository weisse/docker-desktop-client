import React, { Component } from 'react'
import {SelectField, MenuItem} from 'material-ui';
import {Row, Col} from 'react-flexbox-grid';
import connections from '../../stores/connections.js'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import EditIcon from 'material-ui/svg-icons/editor/mode-edit';
import CopyIcon from 'material-ui/svg-icons/content/content-copy';

export default class ConnectionChooseView extends Component {
    
    componentDidMount(){
        for(var name in connections.data){
            this.onConnectionChange(name);
            return;
        }
    }

    onConnectionChange(name){
        this.setState({
            selected: connections.data[name]
        });
    }

    render() {
        return (
            <div>
                <Row>
                    <Col xs={this.props.selected ? 10 : 12}>
                        <SelectField
                            fullWidth={true}
                            floatingLabelText="Docker Connections"
                            value={this.props.connection && this.props.selected ? this.props.connection : "_new"}
                            onChange={(e, i, v) => this.props.onConnectionChange(v)}
                        >
                            {connections.toList().map(function(connection) {
                                return <MenuItem key={connection.name} value={connection.name} primaryText={connection.name} />
                            })}
                            <MenuItem key="_new" value="_new" primaryText="New connection..." />
                        </SelectField>
                    </Col>
                    {
                        this.props.selected ?
                        <Col xs={2} style={{textAlign:"center"}}>
                            <br/>
                            <IconMenu
                                iconButtonElement={<IconButton><MoreVertIcon /></IconButton>}
                                anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                targetOrigin={{horizontal: 'right', vertical: 'top'}}
                            >
                                <MenuItem 
                                    primaryText="Edit"
                                    leftIcon={<EditIcon />}
                                    onTouchTap={this.props.onEdit}
                                />
                                <MenuItem 
                                    primaryText="Fork"
                                    leftIcon={<CopyIcon />}
                                    onTouchTap={this.props.onFork}
                                />
                                <MenuItem 
                                    primaryText="Delete"
                                    leftIcon={<DeleteIcon />}
                                    onTouchTap={this.props.onDelete}
                                />
                            </IconMenu>
                        </Col>
                        :
                        null
                    }
                </Row>
            </div>
        );
    }

}