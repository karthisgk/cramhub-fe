import React, { Component } from 'react';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import cookie from 'react-cookies';
class SlideBarRightResponsive extends Component {
    render(){
        return (
            <div className="fixed-sidebar right fixed-sidebar-responsive">

                <div className="fixed-sidebar-right sidebar--small" id="sidebar-right-responsive">

                    <a href="#" data-toggle="modal" data-target="#login-modal" title={cookie.load('session') ? "Chat" : "Login"} className="olympus-chat inline-items">
                        <svg className="olymp-chat---messages-icon"><use xlinkHref={ cookie.load('session') ? SvgIcon + "#olymp-chat---messages-icon" : SvgIcon + "#olymp-login-icon" }></use></svg>
                    </a>

                </div>

            </div>
        );
    }
}

export default SlideBarRightResponsive;