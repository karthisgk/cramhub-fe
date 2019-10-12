import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import cookie from 'react-cookies';
import API_CALL from '../../services';
import {getRootUrl, webSocket} from '../../const/util';
import authorImg from '../../assets/img/author-page.jpg';
class Notification extends Component {

    constructor(props){
        super(props);
        this.state = {
            msg : this.props.msg ? this.props.msg : []
        }
    }

    componentWillMount(){
        if(cookie.load('session')) {
            var suser = window[cookie.load('userdetail')];
            API_CALL('get', 'getnotifications', null, null, (data) => {
                const { code } = data;
                if (code == 'SGK_020'){
                    this.setState({msg: data.data});
                }
            });
            webSocket.on('notify', (data) => {
                if(suser.userId != data.to)
                    return;
                var msg = this.state.msg;
                msg.push(data);
                this.setState({msg: msg});
            });
        }
    }

    accecptRequest(eve){
        const followerId = eve.target.getAttribute('data-id');
        var $ele = $('button[data-id="'+followerId+'"]');
        if(followerId == '#')
            return;
        API_CALL('post', 'acceptfollowrequest', {followerId: followerId}, null, (data) => {
            const { code } = data;
            if (code == 'SGK_020'){
                $ele.html('accepted');
                $ele.attr('data-id', '#');
            }
        });
    }

    render(){
        return (
            <ul className="notification-list">
                {this.state.msg.map((data, ind) => 
                    <li key={ind} className={data.isRead ? 'un-read' : ''}>
                        <div className="author-thumb">
                            <img src={data.user.avatar ? getRootUrl() + 'image/avatars/' + data.user.avatar : authorImg} alt="author" />
                        </div>
                        <div className="notification-event">
                            <Link to={"/page?u="+(data.user.userId ? data.user.userId : '')} className="h6 notification-friend">{data.user.First_Name ? data.user.First_Name : data.from}</Link>
                            <span className="chat-message-item"> {data.message ? data.message : ''}</span>
                            <span className="notification-date"><time className="entry-date updated" dateTime={data.createdAt}>{data.createdAt}</time></span>
                        </div>
                        <span className="notification-icon">
                            {data.type == 'followrequest' ? <button data-id={data.from} onClick={this.accecptRequest.bind(this)} className="btn btn-primary btn-sm" type="button">Accept</button> : ''}
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

export default Notification;