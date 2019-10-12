import React, { Component } from 'react';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import avatar from './../../assets/img/author-page.jpg';
import {Logout} from '../../services/logout';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';
class SessionUser extends Component {
    constructor(props){
        super(props);
        this.state = {
            suser: {avatar: avatar}
        }
    }

    componentWillMount(){
        if(cookie.load('session')) {
            var suser = window[cookie.load('userdetail')];
            //suser.avatar = suser.image;
            this.setState({suser: suser});
        }
    }

    render(){

        if(!this.props.isLogin){
            return (
                <button data-toggle="modal" data-target="#login-modal" className="btn btn-primary btn-md-2" style={{marginBottom: 0}}>
                    Login<div className="ripple-container"></div>
                </button>
            );
        }

        return (
            <div className="author-page author vcard inline-items more">
                <div className="author-thumb">
                    <img alt="author" src={this.state.suser.avatar} className="avatar" />
                    <span className="icon-status online"></span>
                    <div className="more-dropdown more-with-triangle">
                        <div className="mCustomScrollbar" data-mcs-theme="dark">
                            <div className="ui-block-title ui-block-title-small">
                                <h6 className="title">Your Account</h6>
                            </div>

                            <ul className="account-settings">
                                <li>
                                    <Link to="/profilesettings">

                                        <svg className="olymp-menu-icon"><use xlinkHref={ SvgIcon + "#olymp-menu-icon"}></use></svg>

                                        <span>Profile Settings</span>
                                    </Link>
                                </li>
                                <li>
                                    <a href="#" onClick={Logout}>
                                        <svg className="olymp-logout-icon"><use xlinkHref={ SvgIcon + "#olymp-logout-icon"}></use></svg>

                                        <span>Log Out</span>
                                    </a>
                                </li>
                            </ul>

                        </div>
                    </div>
                </div>

                <a href="#" className="author-name fn">
					<div className="author-title">
						{this.state.suser.First_Name + ' ' + this.state.suser.Last_Name} <svg className="olymp-dropdown-arrow-icon"><use xlinkHref={ SvgIcon + "#olymp-dropdown-arrow-icon"}></use></svg>
					</div>
				</a>
            </div>
        );
    }
}

export default SessionUser;