import React, { Component } from 'react';
import Message from './message.jsx';
import Notification from './notification.jsx';
import SessionUser from './sessionuser.jsx';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import {baseInit, getFrontUrl} from '../../const/util';

class Header extends Component {
    constructor(props) {
        super(props);
        this.state = {
            message: this.props.message ? this.props.message : [],
            notification: this.props.notification ? this.props.notification : []
        };
    }

    resolve(){
        $('*').off();
        baseInit();
    }

    getMessageLength(){
        return this.state.message.length > 0 ? 
        <div className="label-avatar bg-purple">{this.state.message.length}</div> : '';
    }

    getNotificationLength(){
        return this.state.notification.length > 0 ? 
        <div className="label-avatar bg-primary">{this.state.notification.length}</div> : '';
    }

    searchSubmit(event){
        location.href = getFrontUrl() + '?q=' + $('.js-user-search').val();
    }
    
    render(){
        window.setTimeout(this.resolve, 1000);
        return (
            <header className="header" id="site-header">

                <div className="page-title">
                    <h6>{this.props.siteTitle}</h6>
                </div>

                <div className="header-content-wrapper">
                    <form className="search-bar w-search notification-list friend-requests">
                        <div className="form-group with-button">
                            <input className="form-control js-user-search" placeholder="Search here people or pages..." type="text" />
                            <button onClick={this.searchSubmit.bind(this)}>
                                <svg className="olymp-magnifying-glass-icon"><use xlinkHref={ SvgIcon + "#olymp-magnifying-glass-icon"}></use></svg>
                            </button>
                        </div>
                    </form>

                    <a href="#" className="link-find-friend">Find Friends</a>

                    <div className="control-block">

                        <div className="control-icon more has-items">
                            <svg className="olymp-chat---messages-icon">
                            <use xlinkHref={ SvgIcon + "#olymp-chat---messages-icon"}></use></svg>
                            {this.getMessageLength()}
                            
                            <div className="more-dropdown more-with-triangle triangle-top-center">
                                <div className="ui-block-title ui-block-title-small">
                                    <h6 className="title">Chat / Messages</h6>
                                    <a href="#">Mark all as read</a>
                                    <a href="#">Settings</a>
                                </div>

                                <div className="mCustomScrollbar" data-mcs-theme="dark">
                                    <Message msg={this.state.message} />
                                </div>
                            </div>

                        </div>

                        <div className="control-icon more has-items">
                            <svg className="olymp-thunder-icon"><use xlinkHref={ SvgIcon + "#olymp-thunder-icon"}></use></svg>

                            {this.getNotificationLength()}

                            <div className="more-dropdown more-with-triangle triangle-top-center">
                                <div className="ui-block-title ui-block-title-small">
                                    <h6 className="title">Notifications</h6>
                                    <a href="#">Mark all as read</a>
                                    <a href="#">Settings</a>
                                </div>

                                <div className="mCustomScrollbar" data-mcs-theme="dark">
                                    <Notification msg={this.state.notification} />
                                </div>
                            </div>

                        </div>                       
                        
                        <SessionUser isLogin={this.props.isLogin} />
                    </div>

                    
                </div>

            </header>
        );
    }
}

export default Header;