import React, {Component} from 'react'
import IndeterministicLoader from './IndeterministicLoader.jsx'

export default class DataWaitLoader extends Component{

    render() {
        if (!this.props.loaded) {
            return (
                <div>
                    <br /><br /><br />
                    <IndeterministicLoader title={<h3>{this.props.loadingMessage}</h3>} />
                </div>
            );
        }
        if (this.props.error) {
            return (<div>{this.props.errorMessage}</div>)
        }
        return (<div>{this.props.children}</div>);
    }

}