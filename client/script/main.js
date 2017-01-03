import React from 'react';
import ReactDOM from 'react-dom';
import { socket } from './src/socket.js'
import { MainApp } from "./src/component/MainApp";

ReactDOM.render(<MainApp />, document.getElementById('main'));

// ReactDOM.render(<Messengers />, document.getElementById('Messengers'));
// ReactDOM.render(<MembersBox />, document.getElementById('MembersBox'));
// ReactDOM.render(<FacebookLogin />, document.getElementById('FacebookLogin'));
