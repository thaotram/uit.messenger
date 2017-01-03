import React from 'react';
import ReactDOM from 'react-dom';
import { socket } from '../socket.js'
import { facebook } from "../facebook.js";

import { FacebookLogin } from "./FacebookLogin"
import { MembersBox } from "./MembersBox"
import { Messengers } from "./Messengers"
import { MessengersInput } from "./MessengersInput"

export class MainApp extends React.Component {
    constructor() {
        super();
        this.state = {
            loginStatus: {
                isLogin: undefined,
                yourFacebookID: undefined,
                yourName: undefined
            }
        };
        socket.on("user:updateLoginStatus", (data) => {
            if (data.isLogin == true) {
                this.setState({
                    loginStatus: {
                        isLogin: true,
                        yourFacebookID: data.yourFacebookID,
                        yourName: data.yourName
                    }
                })
            } else {
                this.setState({
                    loginStatus: {
                        isLogin: false,
                        yourFacebookID: undefined,
                        yourName: undefined
                    }
                });
            }
        });
    }
    render() {
        return (
            <section name="home">
                <div className="box row">
                    <div id="chat-member" className="col">
                        <div id="title" className="row size-40">
                            <div className="iconContainer">
                                <span className="icon"></span>
                            </div>
                            <div className="iconContainer space cursor">
                                <span className="text">Người dùng</span>
                            </div>
                        </div>
                        <MembersBox />
                        <hr />
                        <div id="FacebookLogin" className="iconContainer row size-40">
                            <FacebookLogin loginStatus={this.state.loginStatus} fbLogin={facebook.login} fbLogout={facebook.logout}/>
                        </div>
                    </div>
                    <hr />
                    <div id="chat" className="col space">
                        <div id="title" className="row size-40">
                            <div className="iconContainer">
                                <span className="icon"></span>
                            </div>
                            <div className="iconContainer space cursor">
                                <span className="text">Nhắn tin</span>
                            </div>
                        </div>
                        <Messengers loginStatus={this.state.loginStatus} />
                        <MessengersInput isLogin={this.state.loginStatus.isLogin} />
                    </div>
                </div>
            </section>
        )
    }
}