import React, {Component} from 'react'
import UnstyledLink from '../commons/UnstyledLink.jsx'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'
import ArrowBack from 'material-ui/svg-icons/navigation/arrow-back'
import ArrowForward from 'material-ui/svg-icons/navigation/arrow-forward'
import {ToolbarGroup, Toolbar, FlatButton} from 'material-ui'
import { Grid, Row, Col } from 'react-flexbox-grid'

class MainComponent extends Component{

    constructor(){
        super();
        this.state = {
            drawerOpen: false
        };
        this.toggleDrawer = this.toggleDrawer.bind(this);
        this.setDrawerOpen = this.setDrawerOpen.bind(this);
        console.debug(this);
    }

    toggleDrawer(){
        this.setDrawerOpen(!this.state.drawerOpen);
    }

    setDrawerOpen(drawerOpen){
        this.setState({drawerOpen: drawerOpen});
    }

    render(){
        return(
            <div>
                <AppBar 
                    title={this.props.title}
                    iconClassNameRight="muidocs-icon-navigation-expand-more"
                    onLeftIconButtonTouchTap={this.toggleDrawer}
                />
                <br />
                <Drawer 
                    open={this.state.drawerOpen}
                    docked={false}
                    onRequestChange={(drawerOpen) => this.setDrawerOpen(drawerOpen)}
                >
                    <Menu>
                        <UnstyledLink to={"/containers"} >
                            <MenuItem primaryText="Containers" />
                        </UnstyledLink>
                    </Menu>
                </Drawer>
            </div>
        );
    }
}

export default MainComponent;