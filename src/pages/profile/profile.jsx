import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import authorImg from '../../assets/img/author-page.jpg';
import postImg from '../../assets/img/post__thumb1.jpg';
import {getQueryStringValue} from '../../const/util';
import profileCoverImage from '../../assets/img/top-header2.jpg';
import { youtube_parser } from '../../const/util';
import cookie from 'react-cookies';
import API_CALL from '../../services';
import {getRootUrl, webSocket} from '../../const/util';

import './style.scss';


export default class Profile extends Component {

    constructor(props){
        super(props);
        this.state = {
            suser: {},
            open: false,
            followState: 'Follow'
        }
        window.setTimeout(this.resolve.bind(this), 500);  
    }

    isMyProfile(userId){
        var sessionUser = window[cookie.load('userdetail')];
        return sessionUser.userId == userId;
    }

    getFollowState(_id) {
        if(!cookie.load('session'))
            return false;
        var sessionUser = window[cookie.load('userdetail')];
        if(sessionUser.followings){
            var index = sessionUser.followings.indexOf(_id);
            return index > -1;
        }
        return false;
    }

    isRequested(_id) {
        if(!cookie.load('session'))
            return false;
        var sessionUser = window[cookie.load('userdetail')];
        if(sessionUser.followRequest){
            var index = sessionUser.followRequest.indexOf(_id);
            return index > -1;
        }
        return false;
    }

    resolve(){
        if(this.isPage()) {
            if(this.isHashPage()){
                
                API_CALL('post', 'gethashtagfollowers?count=1', {hashTag: '#' + this.isHashPage()}, null, (data) => {
                    const { data: {followers}} = data;
                    this.setState({
                        suser: {hashName: '#' + this.isHashPage(), followersCount: followers}, 
                        open: true,
                        followState: this.getFollowState('#' + this.isHashPage()) ? 'Unfollow' : 'Follow'
                    });
                });
                return;
            }

            API_CALL('get', 'getuser?atUser=' + getQueryStringValue('u'), null, null, (data) => {
                const { code } = data;
                if (code == 'SGK_020' && data.data.activeUser.length) {
                    var suser = data.data.activeUser[0];
                    suser.image = suser.avatar;
                    this.setState({
                        suser: suser, 
                        open: true, 
                        followState: this.isMyProfile(suser.userId) ? 'Edit' : (this.isRequested(getQueryStringValue('u')) ? 'Requested' : (this.getFollowState(getQueryStringValue('u')) ? 'Unfollow' : 'Follow'))
                    });
                    const {onChangeMode} = this.props;
                    if(!suser.isFollowed && suser.isPrivate == 1 && onChangeMode)
                        onChangeMode(true);
                }
            });

            return;
        }
        this.setState({open: true});
    }

    isPage(){
        return /^\/page/.test(location.pathname);
    }

    isHashPage(){
        return getQueryStringValue('h');
    }

    userComponent(){
        const { suser } = this.state;
        const postClick = () => {
            $("body, html").animate({ 
                scrollTop: $('#post-data').offset().top 
            }, 600);
        };
        return (
            <div className={"top-header-author hash-tag-header"}>
                <div className="author-thumb">
                    <img src={suser.image ? suser.image : authorImg} alt="author" />
                </div>
                <div className="author-content">
                    <a href="#" className="h3 author-name">
                        {suser.First_Name + " " + suser.Last_Name}
                    </a>
                    <div className="country">{suser.userId}</div>

                    <div className="profile-detail">
                        
                        <div onClick={postClick}>{this.state.suser.postCount ? this.state.suser.postCount : 0} Posts</div>

                        <div>{suser.followers ? suser.followers.length : 0} Followers</div>
                    
                        <div>{suser.followings ? suser.followings.length : 0} Followings</div>
                    </div>

                    {
                    (!this.isMyProfile(getQueryStringValue('u'))) ? 
                        <button type="button" className="btn btn-primary follow-btn" onClick={this.triggerFollow.bind(this)}>{this.state.followState}</button>
                    : <Link className="btn btn-primary follow-btn" to={"/profilesettings"}>
                        Edit
                    </Link>}
                </div>
            </div>
        )
    }

    triggerFollow(eve) {
        
        if(!cookie.load('session')){
            $('#login-modal').modal();
            return;
        }
        if(this.isMyProfile(getQueryStringValue('u'))){
            location.href = window.FrontUrl + 'profilesettings';
            return;
        }
        const { suser } = this.state;
        var followingId = this.isHashPage() ? '#' + this.isHashPage() : getQueryStringValue('u');
        var apiData = {followingId: followingId};
        apiData.followRequest = suser.isPrivate && !this.getFollowState(getQueryStringValue('u'));
        API_CALL('post', 'tiggerfollow', apiData, null, (data) => {
            const { code } = data;
            if (code == 'SGK_020'){
                const { data: {action, state, ct}} = data;                
                if(state == 'requested' && cookie.load('session') && !this.isHashPage()){
                    var sessionUser = window[cookie.load('userdetail')];
                    webSocket.emit('notify', {
                        _id: '123',
                        from: sessionUser.userId,
                        to: followingId,
                        type: 'followrequest',
                        message: 'request to follow you',
                        user: {
                            userId: sessionUser.userId,
                            avatar: sessionUser.avatar.split('avatars/')[1],
                            First_Name: sessionUser.First_Name
                        },
                        createdAt: ct
                    });
                }
                this.setState({
                    followState: state == 'unrequested' || state == 'unfollowed' ? 'Follow' : (state == 'followed' ? 'Unfollow' : state) 
                });
            }
        });
    }

    hashTagComponent(){
        return (
            <div className={"top-header-author hash-tag-header"}>
                <div className="author-content">
                    <a href="#" className="h3 author-name">
                        {(this.state.suser.hashName) ? this.state.suser.hashName : ''}
                    </a>
                    <div className="profile-detail">
                        <div>{this.state.suser.followersCount ? this.state.suser.followersCount : 0} Followers</div>
                    </div>

                    <button type="button" className="btn btn-primary follow-btn" onClick={this.triggerFollow.bind(this)}>{this.state.followState}</button>
                </div>
            </div>
        );
    }

    render(){       
        const { open } = this.state;
		if(!open) {
			return null;
        }
        return (
            <div className="row profile-page">
                <div className="col col-xl-12 col-lg-12 col-md-12 col-sm-12 col-12">
                    <div className="ui-block">
                        <div className="top-header top-header-favorit">
                            <div className="top-header-thumb">
                                <img src={profileCoverImage} alt="nature" />
                                {(this.isHashPage()) ? this.hashTagComponent() : this.userComponent()}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}