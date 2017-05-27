import React, { Component } from 'react'
import { green500, orange500, grey400 } from 'material-ui/styles/colors'
import PlayIcon from 'material-ui/svg-icons/av/play-arrow';
import StopIcon from 'material-ui/svg-icons/av/stop';
import PauseIcon from 'material-ui/svg-icons/av/pause';
import RestartIcon from 'material-ui/svg-icons/navigation/refresh';

export default class ContainerState extends Component {

    render() {
        switch (this.props.state) {
            case "running":
                return <PlayIcon color={green500} >{this.props.children}</PlayIcon>
            case "stopped":
                return <StopIcon color={orange500} >{this.props.children}</StopIcon>
            case "paused":
                return <PauseIcon color={orange500} >{this.props.children}</PauseIcon>
            case "restarting":
                return <RestartIcon color={orange500} >{this.props.children}</RestartIcon>
            default:
                return <StopIcon color={grey400} >{this.props.children}</StopIcon>
        }
    }

}