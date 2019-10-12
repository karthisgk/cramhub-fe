import React, { Component } from 'react';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
class Message extends Component {

    constructor(props){
        super(props);
        this.state = {
            msg : this.props.msg ? this.props.msg : []
        }
    }

    render(){
        return (
            <ul className="notification-list chat-message">
                {this.state.msg.map((user) => 
                    <li key={user.id} className={user.isRead ? 'message-unread' : ''}>
                        <div className="author-thumb">
                            <img src={user.avatar} alt="author" />
                        </div>
                        <div className="notification-event">
                            <a href="#" className="h6 notification-friend">{user.name}</a>
                            <span className="chat-message-item">{user.message}</span>
                            <span className="notification-date"><time className="entry-date updated" dateTime={user.time}>{user.time}</time></span>
                        </div>
                        <span className="notification-icon">
                            <svg className="olymp-chat---messages-icon"><use xlinkHref={ SvgIcon + "#olymp-chat---messages-icon"}></use></svg>
                        </span>
                        <div className="more">
                            <svg className="olymp-little-delete"><use xlinkHref={ SvgIcon + "#olymp-little-delete"}></use></svg>
                        </div>
                    </li>   
                )}
            </ul>
        );
    }
}

export default Message;