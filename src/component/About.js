import React, { Component } from 'react'

export default class About extends Component {
    constructor(props) {
        super(props);
        this.state = {
            msg: this.props.msg
        }
    }
    render() {
        console.log(this.props)
        let { msg } = this.state
        return (
            <div>
                {msg}
            </div>
        )
    }
}
