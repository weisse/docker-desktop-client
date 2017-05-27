import React, {Component} from 'react'
import DataWaitLoader from '../commons/DataWaitLoader.jsx'
import {Card, CardActions, CardTitle, CardText, Tabs, Tab} from 'material-ui';
import ContainerState from '../commons/ContainerState.jsx';

class ContainerDetailView extends Component{
    
    render(){
        return (
            <DataWaitLoader loaded={this.props.loaded} error={this.props.error} errorMessage={this.props.errorMessage} loadingMessage="Loading container...">
                {(() => {
                    console.log(this.props.data);
                    if(this.props.data){
                        return (
                            <Card>
                                <CardTitle title={this.props.data.Name.substring(1)} subtitle={this.props.data.Config.Image}>
                                    
                                </CardTitle>
                                <CardText>
                                    <ContainerState state={this.props.data.State.Status}>
                                        {this.props.data.State}
                                    </ContainerState>
                                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                                    Donec mattis pretium massa. Aliquam erat volutpat. Nulla facilisi.
                                    Donec vulputate interdum sollicitudin. Nunc lacinia auctor quam sed pellentesque.
                                    Aliquam dui mauris, mattis quis lacus id, pellentesque lobortis odio.
                                </CardText>
                                <CardActions>
                                    <Tabs style={{paddingLeft: 0, paddingRight: 0, margin: 0}}>
                                        <Tab label="Item One" >
                                        <div>
                                            <h2>Tab One</h2>
                                            <p>
                                            This is an example tab.
                                            </p>
                                            <p>
                                            You can put any sort of HTML or react component in here. It even keeps the component state!
                                            </p>
                                        </div>
                                        </Tab>
                                        <Tab label="Item Two" >
                                        <div>
                                            <h2>Tab Two</h2>
                                            <p>
                                            This is another example tab.
                                            </p>
                                        </div>
                                        </Tab>
                                        <Tab>
                                        <div>
                                            <h2>Tab Three</h2>
                                            <p>
                                            This is a third example tab.
                                            </p>
                                        </div>
                                        </Tab>
                                    </Tabs>
                                </CardActions>
                            </Card>
                        );
                    }
                })()}
            </DataWaitLoader>
        );
    }

}

export default ContainerDetailView;