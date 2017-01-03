import React from 'react';
import ReactDOM from 'react-dom';

export class FacebookLogin extends React.Component {
    constructor(props) {
        super(props);
    }
    render() {
        if (this.props.loginStatus.isLogin == undefined) {
            return (
                <div className="iconContainer space">
                    <span className="icon"></span>
                    <span className="text">Đang tải</span>
                </div>
            )
        } else if (this.props.loginStatus.isLogin == true){
            return (
                <div className="iconContainer space" onClick={this.props.fbLogout}>
                    <span className="icon"></span>
                    <span className="text">Đăng xuất</span>
                </div>
            )
        } else {
            return (
                <div className="iconContainer space" onClick={this.props.fbLogin}>
                    <span className="icon"></span>
                    <span className="text">Đăng nhập</span>
                </div>
            )
        }
    }
}