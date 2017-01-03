import React from 'react';
import ReactDOM from 'react-dom';
import { socket } from '../socket.js'

export class Messengers extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            chat: {},
        };
        socket.on("messenger:init", (init) => {
            console.log("messenger:init", init);
            init.messengers.forEach((el) => {
                this._addMessenger(el);
            })
        });
        socket.on("messenger:add", (data) => {
            this._addMessenger(data);
        });
        this._addMessenger = this._addMessenger.bind(this);
    }
    _addMessenger(data) {
        if (this.state.chat[data.groupID.toString()] == undefined) {
            this.state.chat[data.groupID] = {
                "facebookID": data.facebookID,
                "name": data.name,
                "color": data.color,
                "messengers": [
                    [data.time, data.messenger]
                ]
            }
        } else {
            this.state.chat[data.groupID].messengers.push([data.time, data.messenger])
        }
        this.forceUpdate()
    }
    _getGroupIDs(ar) {
        var groupIDs = ar.map((el) => {
            return el.groupID;
        });
        var returnIDs = [];
        groupIDs.forEach((e) => {
            if (returnIDs.indexOf(e) == -1) {
                returnIDs.push(e);
            }
        })
        return returnIDs;
    }
    componentDidMount() {
        var node = document.getElementById("Messengers");
        node.scrollTop = node.scrollHeight - node.clientHeight;
    }
    componentWillUpdate() {
        var node = document.getElementById("Messengers");
        node.willScroll = node.scrollHeight - node.clientHeight - node.scrollTop === 0 ? true : false;
    }
    componentDidUpdate() {
        var node = document.getElementById("Messengers");
        if (node.willScroll === true) {
            node.scrollTop = node.scrollHeight - node.clientHeight;
        }
    }
    render() {
        return (
            <div id="Messengers" className="space">
                <div>
                    {Object.keys(this.state.chat).map((groupID) => {
                        if (this.props.loginStatus.yourFacebookID == this.state.chat[groupID].facebookID) {
                            return (
                                <div className="right" key={groupID.toString()}>
                                    <div className="row">
                                        <div className="messenger">
                                            {this.state.chat[groupID].messengers.map((messenger, index) => (
                                                <span style={{ backgroundColor: this.state.chat[groupID].color }} key={index.toString()}>{messenger[1]}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        } else{
                            return (
                                <div className="left" key={groupID.toString()}>
                                    <div className="name">{this.state.chat[groupID].name}</div>
                                    <div className="row">
                                        <div className="avatar">
                                            <img src={"https://graph.facebook.com/" + this.state.chat[groupID].facebookID + "/picture?type=small"} />
                                        </div>
                                        <div className="messenger">
                                            {this.state.chat[groupID].messengers.map((messenger, index) => (
                                                <span style={{ backgroundColor: this.state.chat[groupID].color }} key={index.toString()}>{messenger[1]}</span>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            )
                        }
                    })}
                </div>
            </div>
        )
    }
};