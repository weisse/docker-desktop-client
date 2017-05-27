import React, { Component } from 'react'
import { Table, TableBody, TableHeader, TableHeaderColumn, TableRow, TableRowColumn } from 'material-ui/Table'
import TextField from 'material-ui/TextField'
import Paper from 'material-ui/Paper'
import IconMenu from 'material-ui/IconMenu';
import IconButton from 'material-ui/IconButton';
import MoreVertIcon from 'material-ui/svg-icons/navigation/more-vert';
import InspectIcon from 'material-ui/svg-icons/action/search';
import SaveIcon from 'material-ui/svg-icons/content/save';
import AddCircleIcon from 'material-ui/svg-icons/content/add-circle';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import StopIcon from 'material-ui/svg-icons/av/stop';
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import RestartIcon from 'material-ui/svg-icons/navigation/refresh';
import DeleteIcon from 'material-ui/svg-icons/action/delete';
import AddIcon from 'material-ui/svg-icons/content/add';
import MenuItem from 'material-ui/MenuItem';
import DropDownMenu from 'material-ui/DropDownMenu';
import RaisedButton from 'material-ui/RaisedButton';
import {Toolbar, ToolbarGroup, ToolbarSeparator, ToolbarTitle} from 'material-ui/Toolbar';
import Subheader from 'material-ui/Subheader';
import Divider from 'material-ui/Divider';
import RefreshIndicator from 'material-ui/RefreshIndicator';
import {FloatingActionButton} from 'material-ui';
import ContainerState from '../commons/ContainerState.jsx'

export default class ContainerListView extends Component {

    constructor() {
        super();
        this.state = {
            running: [],
            others: []
        }
        this.callScopeChangeHandler = this.callScopeChangeHandler.bind(this);
    }

    componentDidMount() {
        this.updateState(this.props);
    }

    componentWillReceiveProps(nextProps) {
        this.updateState(nextProps);
    }

    updateState(props) {
        this.setState({
            running: props.data.filter((i) => i.State === "running"),
            others: props.data.filter((i) => i.State !== "running")
        });
    }

    callScopeChangeHandler(scope){
        this.setState({scope:scope});
        this.props.onScopeChange(scope);
    }

    render() {
        return (
            <div>
                <Paper zDepth={2} style={{marginBottom: "120px"}}>
                    <Toolbar>
                        <ToolbarGroup firstChild={true}>
                            <DropDownMenu value={this.props.scope} onChange={(e, k, v) => this.callScopeChangeHandler(v)}>
                                <MenuItem value={"false"} primaryText="Used containers" />
                                <MenuItem value={"true"} primaryText="All containers" />
                            </DropDownMenu>
                            </ToolbarGroup>
                            <ToolbarGroup>
                            <ToolbarTitle text="Filter" />
                            <TextField hintText="Type a regepx" onChange={(e) => this.props.onFilter(e.target.value)} />
                            <ToolbarSeparator />
                            <RaisedButton label="Create new container" icon={<AddCircleIcon />} primary={true} />
                        </ToolbarGroup>
                    </Toolbar>
                    <Subheader>Running containers</Subheader>
                    {(() => {
                        if(this.state.running && this.state.running.length > 0){
                            return (
                                <div>
                                    <ContainerTable 
                                        data={this.state.running}
                                        onContainerInspectClick={this.props.onContainerInspect}
                                        onContainerCommitClick={this.props.onContainerCommit}
                                        onContainerStartClick={this.props.onContainerStart}
                                        onContainerStopClick={this.props.onContainerStop}
                                        onContainerPauseClick={this.props.onContainerPause}
                                        onContainerUnpauseClick={this.props.onContainerUnpause}
                                        onContainerRestartClick={this.props.onContainerRestart}
                                        onContainerDeleteClick={this.props.onContainerDelete}
                                    />
                                </div>
                            );
                        }else{
                            return (
                                <div>
                                    <h3 style={{textAlign:"center"}}>There is no running container</h3>
                                    <br/>
                                </div>
                            );
                        }
                    })()}
                    <Divider />
                    <Subheader>Non running containers</Subheader>
                    {(() => {
                        if(this.state.others && this.state.others.length > 0){
                            return (
                                <div>
                                    <ContainerTable
                                        data={this.state.others}
                                        onContainerInspectClick={this.props.onContainerInspect}
                                        onContainerCommitClick={this.props.onContainerCommit}
                                        onContainerStartClick={this.props.onContainerStart}
                                        onContainerStopClick={this.props.onContainerStop}
                                        onContainerPauseClick={this.props.onContainerPause}
                                        onContainerUnpauseClick={this.props.onContainerUnpause}
                                        onContainerRestartClick={this.props.onContainerRestart}
                                        onContainerDeleteClick={this.props.onContainerDelete}
                                    />
                                </div>
                            );
                        }else{
                            return (
                                <div>
                                    <h3 style={{textAlign:"center"}}>There is no stopped container</h3>
                                    <br/>
                                </div>
                            );
                        }
                    })()}
                </Paper>
                <FloatingActionButton zDepth={2} style={{position:"fixed", bottom: "30px", right: "30px"}}>
                    <AddIcon />
                </FloatingActionButton>
            </div>
        );
    }
}

export class ContainerTable extends Component {

    constructor(props) {
        super(props);

        this.state = {
            running: [],
            others: [],
            fixedHeader: true,
            fixedFooter: true,
            stripedRows: false,
            showRowHover: false,
            selectable: false,
            multiSelectable: false,
            enableSelectAll: false,
            deselectOnClickaway: true,
            showCheckboxes: false
        };

    }

    render() {
        return (
            <Table
                fixedHeader={this.state.fixedHeader}
                fixedFooter={this.state.fixedFooter}
                selectable={this.state.selectable}
                multiSelectable={this.state.multiSelectable}
            >
                <TableHeader
                    displaySelectAll={this.state.showCheckboxes}
                    adjustForCheckbox={this.state.showCheckboxes}
                    enableSelectAll={this.state.enableSelectAll}
                >
                    <TableRow>
                        <TableHeaderColumn tooltip="" style={{ width: "10px" }}></TableHeaderColumn>
                        <TableHeaderColumn tooltip="The ID">ID</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The Name">Name</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The Image">Image</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The Status">Status</TableHeaderColumn>
                        <TableHeaderColumn tooltip="The Actions" style={{ width: "50px" }}>Actions</TableHeaderColumn>
                    </TableRow>
                </TableHeader>
                <TableBody
                    displayRowCheckbox={this.state.showCheckboxes}
                    deselectOnClickaway={this.state.deselectOnClickaway}
                    showRowHover={this.state.showRowHover}
                    stripedRows={this.state.stripedRows}
                >
                    {this.props.data.map((container, index) => (
                        <TableRow key={index} selected={container.selected}>
                            <TableRowColumn style={{ width: "10px" }}>
                                <ContainerState state={container.State} />
                            </TableRowColumn>
                            <TableRowColumn>
                                {container.Id}
                            </TableRowColumn>
                            <TableRowColumn>{container.Names[0].substring(1)}</TableRowColumn>
                            <TableRowColumn>{container.Image}</TableRowColumn>
                            <TableRowColumn>{container.Status}</TableRowColumn>
                            <TableRowColumn style={{ width: "50px" }}>
                                {(() => {
                                    if(container._pending_){
                                        return (
                                            <RefreshIndicator 
                                                size={30}
                                                left={10}
                                                top={0}
                                                status="loading"
                                                style={{
                                                    display: 'inline-block',
                                                    position: 'relative',
                                                }}
                                            />
                                        );
                                    }
                                    return (
                                        <IconMenu
                                            anchorOrigin={{horizontal: 'right', vertical: 'top'}}
                                            targetOrigin={{horizontal: 'right', vertical: 'top'}}
                                            iconButtonElement={
                                                <IconButton touch={true}>
                                                    <MoreVertIcon />
                                                </IconButton>
                                            }
                                        >
                                            <MenuItem 
                                                primaryText="Inspect"
                                                leftIcon={<InspectIcon />}                                                                    
                                                onTouchTap={() => this.props.onContainerInspectClick(container)}
                                            />
                                            <MenuItem 
                                                primaryText="Commit"
                                                leftIcon={<SaveIcon />}                                                                    
                                                onTouchTap={() => this.props.onContainerCommitClick(container)}
                                            />
                                            <Divider />
                                            {(() => {
                                                switch (container.State) {
                                                    case "running": 
                                                        return (
                                                            <div>
                                                                <MenuItem 
                                                                    primaryText="Stop"
                                                                    leftIcon={<StopIcon />}                                                                    
                                                                    onTouchTap={() => this.props.onContainerStopClick(container)}
                                                                />
                                                                <MenuItem 
                                                                    primaryText="Pause"
                                                                    leftIcon={<PauseIcon />}
                                                                    onTouchTap={() => this.props.onContainerPauseClick(container)}
                                                                />
                                                                <MenuItem
                                                                    primaryText="Restart"
                                                                    leftIcon={<RestartIcon />}
                                                                    onTouchTap={() => this.props.onContainerRestartClick(container)}
                                                                />
                                                                <Divider />
                                                            </div>
                                                        );
                                                    case "restarting":
                                                        return;
                                                    case "paused":
                                                        return (
                                                            <div>
                                                                <MenuItem 
                                                                    primaryText="Unpause"
                                                                    leftIcon={<PlayIcon />}
                                                                    onTouchTap={() => this.props.onContainerUnpauseClick(container)}
                                                                />
                                                                <Divider />
                                                            </div>
                                                        );
                                                    default:
                                                        return (
                                                            <div>
                                                                <MenuItem 
                                                                    primaryText="Start"
                                                                    leftIcon={<PlayIcon />}
                                                                    onTouchTap={() => this.props.onContainerStartClick(container)}
                                                                />
                                                                <Divider />
                                                            </div>
                                                        );
                                                }
                                            })()}
                                            <MenuItem 
                                                primaryText="Delete"
                                                leftIcon={<DeleteIcon />}
                                                onTouchTap={() => this.props.onContainerDeleteClick(container)}
                                            />
                                        </IconMenu>
                                    );
                                })()}
                            </TableRowColumn>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        );
    }
}