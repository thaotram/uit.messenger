import React from 'react';
import ReactDOM from 'react-dom';
import { socket } from '../socket.js'

export class MessengersInput extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            content: "",
        }
    }
    submit(e) {
        if ((e.key == "Enter" || e.key == undefined) && this.state.content !== "") {
            socket.emit("messenger:add", {
                messenger: this.state.content
            })
            this.setState({ content: "" })
        }
    }
    handleChange(e) {
        this.setState({ content: e.target.value });
    }
    render() {
        if (this.props.isLogin == true) {
            return (
                <div id="input">
                    <hr />
                    <div className="row size-40">
                        <input type="text"
                            className="space"
                            value={this.state.content}
                            onChange={this.handleChange.bind(this)}
                            onKeyDown={this.submit.bind(this)} />
                        <div className="iconContainer" onClick={this.submit.bind(this)}>
                            <span className="icon"></span>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (null)
        }
    }
}
