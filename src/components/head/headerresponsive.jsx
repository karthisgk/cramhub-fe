import React, { Component } from 'react';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import Message from './message.jsx';
import Notification from './notification.jsx';

class HeaderResponsive extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message ? this.props.message : [],
            notification: this.props.notification ? this.props.notification : []
        }
    }

    getMessageLength(){
        return this.state.message.length > 0 ? 
        <div className="label-avatar bg-purple">{this.state.message.length}</div> : '';
    }

    getNotificationLength(){
        return this.state.notification.length > 0 ? 
        <div className="label-avatar bg-primary">{this.state.notification.length}</div> : '';
    }
    
    render(){
        return (
            <header className="header header-responsive" id="site-header-responsive">
                <div className="header-content-wrapper">
                    <ul className="nav nav-tabs mobile-app-tabs" role="tablist">
                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#chat" role="tab">
                                <div className="control-icon has-items">
                                    <svg className="olymp-chat---messages-icon"><use xlinkHref={ SvgIcon + "#olymp-chat---messages-icon"}></use></svg>
                                    {this.getMessageLength()}
                                </div>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#notification" role="tab">
                                <div className="control-icon has-items">
                                    <svg className="olymp-thunder-icon"><use xlinkHref={ SvgIcon + "#olymp-thunder-icon"}></use></svg>
                                    {this.getNotificationLength()}
                                </div>
                            </a>
                        </li>

                        <li className="nav-item">
                            <a className="nav-link" data-toggle="tab" href="#search" role="tab">
                                <svg className="olymp-magnifying-glass-icon"><use xlinkHref={ SvgIcon + "#olymp-magnifying-glass-icon"}></use></svg>
                                <svg className="olymp-close-icon"><use xlinkHref={ SvgIcon + "#olymp-close-icon"}></use></svg>
                            </a>
                        </li>
                    </ul>
                </div>

                <div className="tab-content tab-content-responsive">

                    <div className="tab-pane " id="chat" role="tabpanel">

                        <div className="mCustomScrollbar" data-mcs-theme="dark">
                            <div className="ui-block-title ui-block-title-small">
                                <h6 className="title">Chat / Messages</h6>
                                <a href="#">Mark all as read</a>
                                <a href="#">Settings</a>
                            </div>

                            <Message msg={this.state.message} />
                        </div>

                    </div>

                    <div className="tab-pane " id="notification" role="tabpanel">

                        <div className="mCustomScrollbar" data-mcs-theme="dark">
                            <div className="ui-block-title ui-block-title-small">
                                <h6 className="title">Notifications</h6>
                                <a href="#">Mark all as read</a>
                                <a href="#">Settings</a>
                            </div>

                            <Notification msg={this.state.notification} />
                        </div>
                    </div>

                    <div className="tab-pane " id="search" role="tabpanel">

                        <form className="search-bar w-search notification-list friend-requests">
                            <div className="form-group with-button">
                                <input className="form-control js-user-search" placeholder="Search here people or pages..." type="text" />
                            </div>
                        </form>

                    </div>

                </div>
            </header>
        );
    }
}

export default HeaderResponsive;