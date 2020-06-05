import React, { Component } from 'react'
import About from './About';

export default class Home extends Component {
    constructor() {
        super();
        this.state = {
            msg: 'Welcome! hanjinhui'
        }
    }
    render() {
        return (
            <div>
                <About msg={this.state.msg}></About>
            </div>
        )
    }
}
