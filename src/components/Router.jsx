import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import AppLayout from './application/ApplicationLayout.jsx'
import ConnectionController from './connections/ConnectionController.jsx'
import ContainerListController from './container/ContainerListController.jsx'
import ContainerDetailController from './container/ContainerDetailController.jsx'
import { Grid, Row, Col } from 'react-flexbox-grid'
import {observer} from 'mobx-react'
import activeConnection from '../stores/activeConnection.js'

@observer
export default class AppRouter extends Component{

    render(){
        if(activeConnection.isActive){
            return (
                <Router>
                    <div>
                        <Route component={AppLayout} />
                        <Grid fluid>
                            <Row>
                                <Col md={0} lg={2} />
                                <Col md={12} lg={8} >
                                    <Route path="/containers" exact={true} component={ContainerListController} />
                                    <Route path="/containers/:containerId" component={ContainerDetailController} />
                                </Col>
                            </Row>
                        </Grid>    
                    </div>
                </Router>
            );
        }
        return (
            <Router>
                <div>
                    <Route component={ConnectionController} />
                </div>
            </Router>
        );
    }

}