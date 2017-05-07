import React, {Component} from 'react'
import connection from '../../../libs/connection.js'
import DataWaitLoader from '../../commons/DataWaitLoader.jsx'
import {Paper, Toolbar, ToolbarGroup, DropDownMenu, MenuItem, ToolbarTitle, TextField, ToolbarSeparator, RaisedButton, IconButton, IconMenu} from 'material-ui';
import NavigationExpandMoreIcon from 'material-ui/svg-icons/navigation/expand-more';

class ContainerDetailView extends Component{
    
    render(){
        return (
            <DataWaitLoader loaded={this.props.loaded} error={this.props.error} errorMessage={this.props.errorMessage} loadingMessage="Loading container...">
                <Paper zDepth={2} style={{marginBottom: "120px"}}>
                    <Toolbar>
                        <ToolbarGroup firstChild={true}>
                            {this.props.data.Name}
                            <DropDownMenu value={this.props.scope} onChange={(e, k, v) => this.callScopeChangeHandler(v)}>
                                <MenuItem value={"false"} primaryText="Used containers" />
                                <MenuItem value={"true"} primaryText="All containers" />
                            </DropDownMenu>
                            </ToolbarGroup>
                            <ToolbarGroup>
                            <ToolbarTitle text="Filter" />
                            <TextField hintText="Type a regepx" onChange={(e) => this.callFilterEventHandler(e.target.value)} />
                            <ToolbarSeparator />
                            <RaisedButton label="Create new container" primary={true} />
                            <IconMenu
                                iconButtonElement={
                                <IconButton touch={true}>
                                    <NavigationExpandMoreIcon />
                                </IconButton>
                                }
                            >
                                <MenuItem primaryText="Download" />
                                <MenuItem primaryText="More Info" />
                            </IconMenu>
                        </ToolbarGroup>
                    </Toolbar>
                </Paper>
            </DataWaitLoader>
        );
    }

}

export default ContainerDetailView;