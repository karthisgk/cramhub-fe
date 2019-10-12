import React, { Component } from 'react';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import { Link } from 'react-router-dom';

class ChatUsers extends Component {

    constructor(props){
        super(props);
        this.state = {
            chats: this.props.chats ? this.props.chats : []
        }
    }

    render(){
        return (
            <ul className="chat-users">
                {this.state.chats.map((user) =>                    
                    <li key={user.id} className="inline-items js-chat-open">
                        <div className="author-thumb">
                            <img alt="author" src={user.avatar} className="avatar" />
                            <span className={"icon-status " + user.status}></span>
                        </div>

                        {
                            this.props.large ? 
                                <div className="author-status">
                                    <a href="#" className="h6 author-name">{user.name}</a>
                                    <span className="status">{user.status.toUpperCase()}</span>
                                </div>
                             : ''
                        }

                    </li>
                )}
            </ul>
        );
    }
}

class SlidebarRight extends Component {

    constructor(props){
        super(props);
        this.state = {
            chats: this.props.chats ? this.props.chats : []
        }
    }

    render(){
        return (
            <div className="fixed-sidebar right">

                <div className="fixed-sidebar-right sidebar--small" id="sidebar-right">
                    <div className="mCustomScrollbar" data-mcs-theme="dark">
                        <ChatUsers chats={this.state.chats} />
                    </div>

                    <div className="search-friend inline-items">
                        <a href="#" className="js-sidebar-open">
                            <svg className="olymp-menu-icon"><use xlinkHref={ SvgIcon + "#olymp-menu-icon"}></use></svg>
                        </a>
                    </div>

                    <a href="#" className="olympus-chat inline-items js-chat-open">
                        <svg className="olymp-chat---messages-icon"><use xlinkHref={ SvgIcon + "#olymp-chat---messages-icon"}></use></svg>
                    </a>
                </div>

                <div className="fixed-sidebar-right sidebar--large" id="sidebar-right-1">
                    <div className="mCustomScrollbar" data-mcs-theme="dark">

                        <div className="ui-block-title ui-block-title-small">
                            <a href="#" className="title">Close Friends</a>
                            <a href="#">Settings</a>
                        </div>

                        <ChatUsers chats={this.state.chats} large="true" />

                    </div>

                    <div className="search-friend inline-items">
                        <form className="form-group" >
                            <input className="form-control" placeholder="Search Friends..."  type="text" />
                        </form>

                        <Link to="/profilesettings" className="settings">
                            <svg className="olymp-settings-icon"><use xlinkHref={ SvgIcon + "#olymp-settings-icon"}></use></svg>
                        </Link>

                        <a href="#" className="js-sidebar-open">
                            <svg className="olymp-close-icon"><use xlinkHref={ SvgIcon + "#olymp-close-icon"}></use></svg>
                        </a>
                    </div>

                    <a href="#" className="olympus-chat inline-items js-chat-open">

                        <h6 className="olympus-chat-title">{this.props.SiteTitle} CHAT</h6>
                        <svg className="olymp-chat---messages-icon"><use xlinkHref={ SvgIcon + "#olymp-chat---messages-icon"}></use></svg>
                    </a>
                </div>

            </div>
        );
    }
}

export default SlidebarRight;