import React, { Component } from 'react';
import logo from './../../assets/img/logo.png';
import authorImg from '../../assets/img/author-page.jpg';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import {Logout} from '../../services/logout';
import {util} from '../../const/util';
import cookie from 'react-cookies';
import { Link } from 'react-router-dom';

const menus = [
    {
        id: util.uniqueid(), title: "NEW POST" , href: '/newpost', icon: "olymp-plus-icon"
    },
    {
        id: util.uniqueid(), title: "STUDY FEED" , href: '/', icon: "olymp-newsfeed-icon"
    },
    {
        id: util.uniqueid(), title: "FAV PAGE" , href: "16-FavPagesFeed.html", icon: "olymp-star-icon"
    },
    {
        id: util.uniqueid(), title: "FRIEND GROUPS" , href: "17-FriendGroups.html", icon: "olymp-happy-faces-icon"
    }
];

class SlidebarSmall extends Component {

    constructor(props){
        super(props);
    }

    mCustomScrollbar = () => {
        var ListItems = menus.map((prop) => 
            <li key={prop.id}>
                <Link to={prop.href}>
                    <svg className={prop.icon + "left-menu-icon"} data-toggle="tooltip" data-placement="right"   data-original-title={prop.title}>
                        <use xlinkHref={SvgIcon + "#" + prop.icon}></use>
                    </svg>
                </Link>
            </li>
        );
        return (
            <div className="mCustomScrollbar" data-mcs-theme="dark">
                <ul className="left-menu">
                    <li>
                        <a href="#" className="js-sidebar-open">
                            <svg className="olymp-menu-icon left-menu-icon"  data-toggle="tooltip" data-placement="right"   data-original-title="OPEN MENU">
                                <use xlinkHref={ SvgIcon + "#olymp-menu-icon"}></use>
                            </svg>
                        </a>
                    </li>
                    {ListItems}
                </ul>
            </div>
        );
    }

    render(){
        return (
            <div className="fixed-sidebar-left sidebar--small" id="sidebar-left">
                <a href="#" className="logo">
                    <div className="img-wrap">
                        <img src={logo} alt={this.props.SiteTitle} />
                    </div>
                </a>
                {this.mCustomScrollbar()}
            </div>
        );
    }
}

class SlidebarLarge extends Component {

    constructor(props){
        super(props);
    }

    mCustomScrollbar = () => {
        var ListItems = menus.map((prop) => 
            <li key={prop.id}>
                <Link to={prop.href}>
                    <svg className={prop.icon + "left-menu-icon"} data-toggle="tooltip" data-placement="right"   data-original-title={prop.title}>
                        <use xlinkHref={SvgIcon + "#" + prop.icon}></use>
                    </svg>
                    <span className="left-menu-title" style={{textIndent: 10}}>{prop.title}</span>
                </Link>
            </li>
        );
        return (
            <div className="mCustomScrollbar" data-mcs-theme="dark">
                <ul className="left-menu">
                    <li>
                        <a href="#" className="js-sidebar-open">
                            <svg className="olymp-menu-icon left-menu-icon">
                                <use xlinkHref={ SvgIcon + "#olymp-menu-icon"}></use>                                
                            </svg>
                            <span className="left-menu-title">Collapse Menu</span>
                        </a>
                    </li>
                    {ListItems}
                </ul>
            </div>
        );
    }

    render(){
        return (
            <div className="fixed-sidebar-left sidebar--large" id="sidebar-left-1">
                <a href="#" className="logo">
                    <div className="img-wrap">
                        <img src={logo} alt="Olympus" />
                    </div>
                    <div className="title-block">
                        <h6 className="logo-title">{this.props.SiteTitle}</h6>
                    </div>
                </a>
                {this.mCustomScrollbar()}
            </div>
        );
    }
}

class SliderBarRightResponsive extends Component {

    constructor(props){
        super(props);

        this.state = {
            suser: {avatar: authorImg}
        }
    }

    componentWillMount(){
        if(cookie.load('session')) {
            var suser = window[cookie.load('userdetail')];
            suser.avatar = suser.image;
            this.setState({suser: suser});
        }
    }

    render(){
        var ListItems = menus.map((prop) => 
            <li key={prop.id}>
                <Link to={prop.href}>
                    <svg className={prop.icon + "left-menu-icon"} data-toggle="tooltip" data-placement="right"   data-original-title={prop.title}>
                        <use xlinkHref={SvgIcon + "#" + prop.icon}></use>
                    </svg>
                    <span className="left-menu-title" style={{textIndent: 10}}>{prop.title}</span>
                </Link>
            </li>
        );
        return (
            <div className="fixed-sidebar-left sidebar--large" id="sidebar-left-1-responsive">
                <a href="#" className="logo">
                    <div className="img-wrap">
                        <img src={logo} alt="Olympus" />
                    </div>
                    <div className="title-block">
                        <h6 className="logo-title">{this.props.SiteTitle}</h6>
                    </div>
                </a>
                <div className="mCustomScrollbar" data-mcs-theme="dark">
                    {cookie.load('session') ? 
                        <div className="control-block">
                            <div className="author-page author vcard inline-items">
                                <div className="author-thumb">
                                    <img alt="author" src={this.state.suser.avatar} className="avatar" />
                                    <span className="icon-status online"></span>
                                </div>
                                <Link to="/profilesettings" className="author-name fn">
                                    <div className="author-title">
                                        {this.state.suser.First_Name + ' ' + this.state.suser.Last_Name} <svg className="olymp-dropdown-arrow-icon"><use xlinkHref={ SvgIcon + "#olymp-dropdown-arrow-icon"}></use></svg>
                                    </div>
                                </Link>
                            </div>
                        </div>
                    : ''}

                    <div className="ui-block-title ui-block-title-small">
                        <h6 className="title">MAIN SECTIONS</h6>
                    </div>

                    <ul className="left-menu">
                        <li>
                            <a href="#" className="js-sidebar-open">
                                <svg className="olymp-close-icon left-menu-icon"><use xlinkHref={ SvgIcon + "#olymp-close-icon"}></use></svg>
                                <span className="left-menu-title">Collapse Menu</span>
                            </a>
                        </li>
                        {ListItems}
                    </ul>

                    { cookie.load('session') ? <div>
                        <div className="ui-block-title ui-block-title-small">
                            <h6 className="title">YOUR ACCOUNT</h6>
                        </div>

                        <ul className="account-settings">
                            <li>
                                <a href="#">

                                    <svg className="olymp-menu-icon"><use xlinkHref={ SvgIcon + "#olymp-menu-icon"}></use></svg>

                                    <span>Profile Settings</span>
                                </a>
                            </li>
                            <li>
                                <a href="#" onClick={Logout}>
                                    <svg className="olymp-logout-icon"><use xlinkHref={ SvgIcon + "#olymp-logout-icon"}></use></svg>

                                    <span>Log Out</span>
                                </a>
                            </li>
                        </ul>
                    </div> : '' } 

                    <div className="ui-block-title ui-block-title-small">
                        <h6 className="title">About Olympus</h6>
                    </div>

                    <ul className="about-olympus">
                        <li>
                            <a href="#">
                                <span>Terms and Conditions</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>FAQs</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>Careers</span>
                            </a>
                        </li>
                        <li>
                            <a href="#">
                                <span>Contact</span>
                            </a>
                        </li>
                    </ul>

                </div>
            </div>
        );
    }
}

function FixedSlidebar(props){
    return(
        <div className="fixed-sidebar">
            <SlidebarSmall SiteTitle={props.SiteTitle} />
            <SlidebarLarge SiteTitle={props.SiteTitle} />
        </div>
    );
}


function SlideBarResponsive(props){
    return(
        <div className="fixed-sidebar fixed-sidebar-responsive">
            <div className="fixed-sidebar-left sidebar--small" id="sidebar-left-responsive">
                <a href="#" className="logo js-sidebar-open">
                    <img src={logo} alt="Olympus" />
                </a>
            </div>
            <SliderBarRightResponsive SiteTitle={props.SiteTitle} />
        </div>
    );
}

class SlideBar extends Component {
    constructor(props) {
		super(props);
    }
    
    render(){
        return (
            <div className="Slide-Bars">
                <FixedSlidebar SiteTitle={this.props.SiteTitle} />
                <SlideBarResponsive SiteTitle={this.props.SiteTitle} />
            </div>
        );
    }
}

export default SlideBar;