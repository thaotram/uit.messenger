import React from 'react';
import ReactDOM from 'react-dom';
import { socket } from '../socket.js'

export class MembersBox extends React.Component {
    constructor() {
        super();
        this.state = {
            user: []
        };
    };
    componentDidMount() {
        // Mới vào là tự bắt rồi login.getLoginStatus();
        // Khi có người dùng mới đăng nhập

        //  init cho cả user và messenger
        socket.on('user:init', (info) => {
            this.setState({ user: info.user });
            // cần thêm phần init messenger
        });
        socket.on('user:add', (user) => {
            this.state.user.push({
                "facebookID": user.facebookID,
                "name": user.name,
                "status": user.status,
                "color": user.color,
            });
            this.forceUpdate();
        });
        socket.on('user:remove', (user) => {
            this.state.user = this.state.user.filter((data) => {
                return data.id !== user.id;
            });
            this.forceUpdate();
        })
    };
    render() {
        return (
            <div id="MembersBox" className="space">
                {this.state.user.map((info) => {
                    if (info.facebookID) {
                        return (
                            <div key={info.facebookID} data-stt={info.status}>
                                <div>
                                    <img src={"https://graph.facebook.com/" + info.facebookID + "/picture?type=small"} />
                                </div>
                                <div>
                                    <span>
                                        {info.name}
                                    </span>
                                </div>
                            </div>
                        )
                    } else {
                        return (
                            <div key={info.facebookID} data-stt={info.status}>
                                <div>
                                    <img
                                        src="img/avatar.png"
                                        style={{
                                            "background-color": info.color
                                        }} />
                                </div>
                                <div>
                                    <span>
                                        {info.name}
                                    </span>
                                </div>
                            </div>
                        )
                    }
                })}
            </div>
        );
    };
};