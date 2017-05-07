import React, {Component} from 'react'
import {Link} from 'react-router-dom'

export default class UnstyledLink extends Component{

    render(){
        return (
            <Link to={this.props.to} replace={this.props.replace} style={{textDecoration: "none"}}>
                {this.props.children}
            </Link>
        );
    }

}