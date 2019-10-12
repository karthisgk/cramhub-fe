import React, { Component } from 'react';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import authorImg from '../../assets/img/author-page.jpg';
import postImg from '../../assets/img/post__thumb1.jpg';
import { youtube_parser } from '../../const/util';
import './style.scss';
import cookie from 'react-cookies';
import API_CALL from '../../services';

import {getQueryStringValue, getRootUrl} from '../../const/util';
import Profile from '../profile/profile';
import { Link } from 'react-router-dom';

class SinglePost extends Component {

    constructor(props){
        super(props);
        this.state = {
            posts: [],
            suser: {image: authorImg},
            loadMore: true     
        }
    }

    componentWillMount(){
        if(cookie.load('session')) {
			var suser = window[cookie.load('userdetail')];
            this.setState({suser: suser});
        }
    }
    
    renderYoutubes(links) {
        if(!links)
            return;

        if(links.trim() == '')
            return;        

        var urls = [];
        links.split(';').forEach((link, ind) => {
            var youtubeId = youtube_parser(link);
            var image = 'https://img.youtube.com/vi/' + youtubeId + '/maxresdefault.jpg';
            link = 'https://www.youtube.com/watch?v=' + youtubeId;
            urls.push(({image: image, url: link}))
        });

        return (
            <div className="youtube-links">
                {urls.map((link, ind) => 
                    <div className="post-video" key={ind}>
                        <div className="video-thumb">
                            <img src={link.image} alt="photo" />
                            <a href={link.url} className="play-video">
                                <svg className="olymp-play-icon"><use xlinkHref={ SvgIcon + "#olymp-play-icon"}></use></svg>
                            </a>
                        </div>                                                                                                                                                                                                                                                                                                                                                                      
                    </div>
                )}
            </div>
        );
    }

    openComment(e){
        e.preventDefault();
        const ele = $(e.currentTarget.getAttribute('href'));
        if(!ele.hasClass('active')){
            ele.addClass('active');
            $("body, html").animate({ 
                scrollTop: ele.offset().top 
            }, 600);
        }else
            ele.removeClass('active');        
    }

    getPost(){
        var crit = {};
        var searchText = getQueryStringValue('q');
        var hashTag = getQueryStringValue('h');
        var atUser = getQueryStringValue('u');
        if(searchText)
            crit.searchText = searchText;
        else if(hashTag)
            crit.hashTag = '#' + hashTag;
        else if(atUser)
            crit.atUser = atUser;
        this.setState({loadMore: false});
        API_CALL('post', 'getpost?offset=' + this.state.posts.length, crit, null, (data) => {
            const { code } = data;
            if (code == 'SGK_020') {
                var posts = data.data;
                this.setState({
                    posts: this.state.posts.concat(posts),
                    loadMore: posts.length > 0
                });
                setTimeout(() => {this.resolve()}, 1000);
            }
        });
    }

    componentDidMount() {
        this.getPost.bind(this)();
        window.addEventListener('scroll', () => {
            var st = $(document).scrollTop();
            var rch = $(document).outerHeight() - $(window).height() - 100;
            if(st > rch && this.state.loadMore)
                this.getPost.bind(this)();
        });
    }

    getFullName(user){
        return user.First_Name + " " + user.Last_Name;
    }

    neatCaption(caption){
        var cap = caption.replace(/(^|\s)(#[a-z_.\d-]+)/ig, "$1<a href='/page?h=$2'>$2</a>");
        cap = cap.replace(/\?h=#/g, '?h=');
        cap = cap.replace(/(^|\s)(@[a-z_.\d-]+)/ig, "$1<a href='/page?u=$2'>$2</a>");
        return cap.replace(/\?u=@/g, '?u=');
    }

    resolve(){
        $('.js-zoom-gallery').off('*').each(function () {
            $(this).magnificPopup({
                delegate: 'a',
                type: 'image',
                gallery: {
                    enabled: true
                },
                removalDelay: 500, 
                callbacks: {
                    beforeOpen: function () {
                        this.st.image.markup = this.st.image.markup.replace('mfp-figure', 'mfp-figure mfp-with-anim');
                        this.st.mainClass = 'mfp-zoom-in';
                        console.log(this.st);
                    }
                },
                closeOnContentClick: true,
                midClick: true
            });
        });
        $('.play-video').off('*').magnificPopup({
            disableOn: 700,
            type: 'iframe',
            mainClass: 'mfp-fade',
            removalDelay: 160,
            preloader: false,
            fixedContentPos: false,
            readOnly: true
        });

        $('.post-code-editor textarea').each(function(k, ele) {            
            CodeMirror.fromTextArea(
                ele, {
                lineNumbers: true,
                mode: "text/html",
                matchBrackets: true
            });
            if($(this).parent().children('.CodeMirror').length > 1){
                $(this).parent().children('.CodeMirror')[1].remove();
            }
        });
        $('.post-study-content a').attr('target','_blank');
    }

    handleDownload(e) {
        e.preventDefault();
        var link = document.createElement("a");
        var targetFile = e.target.href;
        link.download = targetFile;
        link.href = targetFile;
        link.click();
    }

    render() {
        return (
            <div id="newsfeed-items-grid">
                {this.state.posts.map((post, postIndex) =>
                    <div key={postIndex} className="ui-block">
                                
                        <article className="hentry post video">
                        
                            <div className="post__author author vcard inline-items">
                                <img src={post.user.avatar ? getRootUrl() + "image/avatars/" + post.user.avatar : authorImg} alt="author" />
                        
                                <div className="author-date">
                                    <Link className="h6 post__author-name fn" to={"/page?u=" + post.user.userId}>
                                    {this.getFullName(post.user)}
                                    </Link>
                                    <div className="post__date">
                                        <time className="published" dateTime={post.time}>
                                            {post.time}
                                        </time>
                                    </div>
                                </div>
                        
                                {/* <div className="more"><svg className="olymp-three-dots-icon"><use xlinkHref={ SvgIcon + "#olymp-three-dots-icon"}></use></svg>
                                    <ul className="more-dropdown">
                                        <li>
                                            <a href="#">Edit Post</a>
                                        </li>
                                        <li>
                                            <a href="#">Delete Post</a>
                                        </li>
                                        <li>
                                            <a href="#">Turn Off Notifications</a>
                                        </li>
                                        <li>
                                            <a href="#">Select as Featured</a>
                                        </li>
                                    </ul>
                                </div> */}
                        
                            </div>
                        
                            <div className="post-content scrolable-content">

                                {(post.studyContent) ?<div className="row" style={{margin: 0}}>
                                    <div className="col-xs-12 col-sm-12">
                                        <div className="post-study-content"
                                        dangerouslySetInnerHTML={{__html: post.studyContent}}></div>
                                    </div>
                                </div>: ''}

                                {(post.codeContent) ? <div className="row" style={{margin: 0, marginBottom: '10px'}}>
                                    <div className="col-xs-12 col-sm-12">
                                        <div className="post-code-editor"
                                        dangerouslySetInnerHTML={{__html: "<textarea>" + post.codeContent + "</textarea>"}}>                                            
                                        </div>
                                    </div>
                                </div>: ''}

                                <div className="post-block-photo js-zoom-gallery">
                                    {post.images ?
                                            post.images.map(( img, ind) => 
                                                <a key={ind} href={getRootUrl() + "image/post/" + img} className="half-width">
                                                    <img src={getRootUrl() + "image/post/" + img} alt="photo" />
                                                </a>
                                            )
                                        : ''
                                    }
                                </div>

                                {this.renderYoutubes(post.youtubeLinks)}

                                {post.additionalFiles ?
                                    <div className="additional-files">
                                        <h5>Attached Files</h5>                                    
                                        {post.additionalFiles.map(( file, ind) => 
                                            <a key={ind} href={getRootUrl() + "image/post/" + file.name} onClick={this.handleDownload.bind(this)} >
                                                {file.displayName}
                                            </a>
                                        )}
                                    </div>
                                : ''}

                            </div>
                        
                            <div className="post-additional-info inline-items">                               

                                <div className="post-caption col">
                                    <div dangerouslySetInnerHTML={{__html: this.neatCaption(post.caption)}} /> 
                                </div>
                        
                                <div className="post-like-count">
                                    <a href="#" className="post-add-icon inline-items">
                                        <svg className="olymp-heart-icon"><use xlinkHref={ SvgIcon + "#olymp-heart-icon"}></use></svg>
                                        <span>{post.whoLikes ? post.whoLikes.length : 0}</span>
                                    </a>
                                </div>
                        
                                {post.whoLikes ? 
                                    <ul className="friends-harmonic">
                                        {post.whoLikes.map((user, ind) =>
                                            <li key={ind}>
                                                <a href="#">
                                                    <img src={getRootUrl() + "image/avatars/" + user.avatar} alt="friend" />
                                                </a>
                                            </li>
                                        )}
                                    </ul>
                                : ''}                
                        
                                <div className="comments-shared">
                                    <a className="post-add-icon inline-items" href={"#comment-list-" + post._id} onClick={this.openComment} >
                                        <svg className="olymp-speech-balloon-icon"><use xlinkHref={ SvgIcon + "#olymp-speech-balloon-icon"}></use></svg>
                        
                                        <span>{post.comments.length}</span>
                                    </a>
                        
                                    <a href="#" className="post-add-icon inline-items">
                                        <svg className="olymp-share-icon"><use xlinkHref={ SvgIcon + "#olymp-share-icon"}></use></svg>
                                    </a>
                                </div>
                        
                        
                            </div>
                        
                            <div className="control-block-button post-control-button">
                        
                                <a href="#" className="btn btn-control">
                                    <svg className="olymp-like-post-icon"><use xlinkHref={ SvgIcon + "#olymp-like-post-icon"}></use></svg>
                                </a>
                        
                                <a className="btn btn-control" href={"#comment-list-" + post._id} onClick={this.openComment} >
                                    <svg className="olymp-comments-post-icon"><use xlinkHref={ SvgIcon + "#olymp-comments-post-icon"}></use></svg>
                                </a>
                        
                            </div>

                            <div className="tab-content">
                                <div className="tab-pane" id={'comment-list-' + post._id} role="tabpanel">
                                    <div className="ui-block-title ui-block-title-medium">
                                        <h5 className="title">{post.comments.length > 0 ? 'Comments' : 'No Comments'}</h5>
                                    </div>

                                    <ul className="comments-list scrolable-content">
                                        {post.comments ?
                                            post.comments.map((cmt, ind) => 
                                            <li className="comment-item" key={ind}>
                                                <div className="post__author author vcard inline-items">
                                                    <img src={cmt.avatar} alt="author" />
                                        
                                                    <div className="author-date">
                                                        <a className="h6 post__author-name fn" href="02-ProfilePage.html">{cmt.name}</a>
                                                        <div className="post__date">
                                                            <time className="published" dateTime={cmt.time}>
                                                                {cmt.time}
                                                            </time>
                                                        </div>
                                                    </div>

                                                </div>
                                        
                                                <p>{cmt.message}</p>
                                        
                                                <a href="#" className="post-add-icon inline-items">
                                                    <svg className="olymp-heart-icon"><use xlinkHref={ SvgIcon + "#olymp-heart-icon"}></use></svg>
                                                    <span>{cmt.likes}</span>
                                                </a>
                                                <a href="#" className="reply">Reply</a>
                                            </li>
                                        ) : ''}
                                    </ul>

                                    <a href="#" className="more-comments">View more comments <span>+</span></a>

                                    <form className="comment-form inline-items">
                            
                                        <div className="post__author author vcard inline-items">
                                            <img src={this.state.suser.image} alt="author" />
                                    
                                            <div className="form-group with-icon-right ">
                                                <textarea className="form-control" placeholder=""></textarea>
                                            </div>
                                        </div>
                                    
                                        <button className="btn btn-md-2 btn-primary">Post Comment</button>
                                    
                                        <button className="btn btn-md-2 btn-border-think c-grey btn-transparent custom-color">Cancel</button>
                                    
                                    </form>
                                </div>
                            </div>
                        
                        </article>
                    </div>
                )}
            </div>
        );
    }
}

export default class Home extends Component {

    constructor(props){
        super(props);
        this.state = {
            open: true,
            suser:{},
            isPrivate: false
        }
        window.setTimeout(this.resolve, 500);        
    }

    componentWillMount(){
        if(cookie.load('session')) {
            var suser = window[cookie.load('userdetail')];
            this.setState({suser: suser});
        }
    }

    isPage(){
        return /^\/page/.test(location.pathname);
    }

    resolve(){
        $('body').append(
            '<link rel="stylesheet" href="src/assets/codemirror/lib/codemirror.css" />\
            <script src="src/assets/codemirror/lib/codemirror.js"></script>\
            <script src="src/assets/codemirror/addon/edit/matchbrackets.js"></script>\
            <script src="src/assets/codemirror/mode/xml/xml.js"></script>\
            <script src="src/assets/codemirror/mode/javascript/javascript.js"></script>\
            <script src="src/assets/codemirror/mode/htmlmixed/htmlmixed.js"></script>\
            <script src="src/assets/codemirror/mode/css/css.js"></script>\
            <script src="src/assets/codemirror/addon/hint/show-hint.js"></script>\
            <script src="src/assets/codemirror/addon/hint/css-hint.js"></script>\
            <script src="src/assets/codemirror/keymap/sublime.js"></script>'
        );    
    }

    onChangeMode(mode){
        this.setState({isPrivate: mode});
    }

    render(){
        const { open, isPrivate } = this.state;
		if(!open) {
			return null;
        }
        
        return (
            <div className="container">

                {this.isPage() ? <Profile suser={this.state.suser} onChangeMode={this.onChangeMode.bind(this)} /> : null}

	            <div className="row">
                    {/*<div className="col col-xl-4 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12 xs-hidden">
                    
                    </div>*/}
                    <main id="post-data" className="col col-xl-12 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                        {!isPrivate ? <SinglePost /> : 
                        <div style={{fontSize: '30px'}} className="text-center">This account is private</div>}
                    </main>
                </div>
            </div>
        );
    }
}