import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, BrowserRouter, Switch, Redirect } from 'react-router-dom';
import cookie from 'react-cookies';

import Header from './src/components/head/header';
import PreLoader from './src/components/head/preloader';
import SlideBar from './src/components/head/slidebar';
import HeaderResponsive from './src/components/head/headerresponsive';
import SlidebarRight from './src/components/head/slidebarright';
import SlideBarRightResponsive from './src/components/head/slidebarrightresponsive';
import avatar from './src/assets/img/avatar67-sm.jpg';
import authorImg from './src/assets/img/author-page.jpg';
import ScrollToTop from './src/components/scrolltotop';

import API_CALL from './src/services';
import { util } from './src/const/util';

import Home from './src/pages/home';
import NewPost from './src/pages/newpost';
import ValidateUser from './src/pages/validateuser';
import SetPassword from './src/pages/setpassword';
import {ps,as,cp} from './src/pages/profile';
import LoginModal from './src/components/popupmodals/login';
import FLogin from './src/components/forms/flogin';

import 'react-datetime/css/react-datetime.css';
import 'assets/Bootstrap/dist/css/bootstrap-reboot.css';
import 'assets/Bootstrap/dist/css/bootstrap.css';
import 'assets/Bootstrap/dist/css/bootstrap-grid.css';

import 'assets/css/main.css';
import 'assets/css/mystyle.css';
import 'assets/css/fonts.min.css';

class App extends Component {
	constructor(props) {
		super(props);
		this.state = {
            chats: [
                {id: 12, name: 'dasdsad', avatar: avatar, status: 'online'},
                {id: 13, name: 'asds', avatar: avatar, status: 'away'},
                {id: 14, name: 'zxcxca a sd', avatar: avatar, status: 'away'},
                {id: 15, name: 'dasdsasd swad', avatar: avatar, status: 'online'},
                {id: 16, name: 'dasdssad  ad', avatar: avatar, status: 'disconnected'}
			],
			open: false,
			siteTitle: 'CRAM HUB'
		};
	}

	componentWillMount(){
		if(cookie.load('session')) {
			API_CALL('get', 'getme', null, null, (data) => {
				const { code } = data;
				if (code == 'SGK_020') {
					var userDetail = 'userdetail-' + util.uniqueid();
					cookie.save('userdetail', userDetail, { path: '/' });
					window[userDetail] = data.data;
					window[userDetail].image = data.data.avatar ? data.data.avatar : authorImg;
				}
				this.setState({open: true});
			});
		}else
			this.setState({open: true});
	}

	renderRoutes = () => {
		return (
			<Switch>
				<Route path="/" exact component={Home} />
				<Route path="/newpost" exact component={NewPost} />
				<Route path="/validateuser" component={ValidateUser} />
				<Route path="/setpassword" component={SetPassword} />
				<Route path="/page" component={Home} />
				{cookie.load('session') ? <Route path="/profilesettings" component={ps} /> : null}
				{cookie.load('session') ? <Route path="/accountsettings" component={as} /> : null}
				{cookie.load('session') ? <Route path="/changepassword" component={cp} /> : null}
				<Redirect to="/" />
			</Switch>
		);
	};

	render() {
		if(!this.state.open){
			return null;
		}
		if(!cookie.load('session')){
			return (<FLogin />);
		}
		return (
			<BrowserRouter>
				<div className="Main-Comp">
					<SlideBar SiteTitle={this.state.siteTitle} />
					<SlidebarRight SiteTitle={this.state.siteTitle} chats={[]} />
					<SlideBarRightResponsive />
					<Header isLogin={cookie.load('session')} siteTitle={this.state.siteTitle} />
					<HeaderResponsive isLogin={cookie.load('session')} />
					<div className="header-spacer"></div>
					<section className="container">{this.renderRoutes()}</section>
					<ScrollToTop />
					<LoginModal />
				</div>				
			</BrowserRouter>
		);
	}
}

export default connect(
)(App);
