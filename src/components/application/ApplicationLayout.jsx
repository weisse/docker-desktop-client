import React, {Component} from 'react'
import UnstyledLink from '../commons/UnstyledLink.jsx'
import AppBar from 'material-ui/AppBar'
import Drawer from 'material-ui/Drawer'
import Menu from 'material-ui/Menu'
import MenuItem from 'material-ui/MenuItem'

class AppLayout extends Component{

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

export default AppLayout;