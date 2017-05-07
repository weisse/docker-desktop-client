import React, {Component} from 'react'
import {BrowserRouter as Router, Route} from 'react-router-dom'
import Layout from '../views/Layout.jsx'
import ContainerListController from './container/ContainerListController.jsx'
import ContainerDetailController from './container/ContainerDetailController.jsx'
import { Grid, Row, Col } from 'react-flexbox-grid'

export default class AppRouter extends Component{

    render(){
        return (
            <Router>
                <div>
                    <Route component={Layout} />
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

}