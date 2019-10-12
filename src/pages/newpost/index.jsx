import React, { Component } from 'react';
import Notifier from '../../components/notifier';
import UploadModal from '../../components/popupmodals/upload';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import API_CALL from '../../services';
import { getHashTagFromInput, replaceHashTagInCaption } from '../../const/util';
import './style.scss';

class NewPost extends Component {
    constructor(props){
        super(props);
        this.state = {
            univercities: [],
            hashTags: [],
            color: 'primary',
            message: '',
            notifier: false,
            isRichText: false,
            codeEditor: false,
            youtubeLinks: '',
            univ: '',
            caption: ''
        };
        window.setTimeout(this.resolve, 2000);
    }

    handleRichOption(event) {
        this.setState({
            isRichText: event.target.checked
        });
        if(event.target.checked)
            $('#rich-content').jqte();
        else{
            var bk = $('#rich-content').val();
            $('#rich-content').parent().closest('.form-group').html(
                '<textarea class="form-control" placeholder="Share what you are thinking here..." id="rich-content"></textarea>'
            );
            $('#rich-content').val(bk);
        }
    }

    handleCodeEditor(event) {
        this.setState({
            codeEditor: event.target.checked
        });
        var editorElement = $(
            '<div class="form-group">\
                <textarea id="code-editor" ></textarea>\
            </div>'
        );
        var bk = window.codeEditor ? window.codeEditor.getValue() : '';
        if(event.target.checked){
            editorElement.insertAfter($('#rich-content').parent().closest('.form-group'));
            window.codeEditor = CodeMirror.fromTextArea(
                $('#code-editor')[0], {
                lineNumbers: true,
                mode: "text/html",
                matchBrackets: true
            });
            window.codeEditor.setValue(bk);          
        }
        else{
            $('#code-editor').parent().closest('.form-group').remove();
        }
    }

    handleYoutubeLinks(eve){
        this.setState({
            youtubeLinks: eve.target.value
        });
    }

    handleCaption(eve){
        this.setState({
            caption: eve.target.value
        });
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
        if($('.togglebutton label').children('.toggle').length == 4 ) {
            $('.togglebutton label').children('.toggle').eq(1).remove();
            $('.togglebutton label').children('.toggle').eq(2).remove();
            $('.toggle').attr('style', 'display: block !important;');
        }     
    }

    getCaption(event) {
        var $this = event.target;
        var caption = $this.value;
        if(/(^|\s)(#[a-z\d-]+)/ig.test(caption) || /(^|\s)(@[a-z\d-]+)/ig.test(caption)){
            API_CALL('post', 'gethashtags?type=1&offset=0&limit=20', 
            {searchText: getHashTagFromInput(caption, $this.selectionStart)}, null, data => {
				const { code } = data;
				var hashTags = data.data;
                $('.caption-hashtag').show();
				if (code == 'SGK_020') {
                    if(hashTags.length > 0){
                        this.setState({hashTags: hashTags});
                    }else{
                        this.setState({hashTags: []});
                        $('.caption-hashtag').hide();
                    }
				}else{
                    this.setState({hashTags: []});
                    $('.caption-hashtag').hide();
                }
			});
		}else{
            $('.caption-hashtag').hide();
            this.setState({hashTags: []});
		}
    }

    clickSingleCaption(event){
        var e = event.target;
        $(e).parent().find('.selected').removeClass('selected');
        $(e).addClass('selected');
        var replaceCaption = replaceHashTagInCaption(this.state.caption, $(e).text(), $('.post-caption')[0].selectionStart);
        this.setState({caption: replaceCaption, hashTags: []});
        $('.caption-hashtag').hide();
    }

    clickSingleUniv(event){
        var e = event.target;
        $(e).parent().find('.selected').removeClass('selected');
        $(e).addClass('selected');
        this.setState({univ: $(e).text(), univercities: []});
        $('.univercity').hide();
    }

    clickUnivercity(event){
		var $this = event.target;
        if($this.value.length > 3){		
			API_CALL('post', 'gethashtags?type=2&offset=0&limit=20', {searchText: $this.value}, null, data => {
				const { code } = data;
				var univercities = data.data;
                $('.univercity').show();
				if (code == 'SGK_020') {
                    if(univercities.length > 0){
                        this.setState({univercities: univercities});
                    }else{
                        this.setState({univercities: []});
                        $('.univercity').hide();
                    }
				}else{
                    this.setState({univercities: []});
                    $('.univercity').hide();
                }
			});
		}else{
            $('.univercity').hide();
            this.setState({univercities: []});
		}
    }
    
    handleSubmit(eve){
        var apiData = {
            caption: this.state.caption,
            univ: this.state.univ,
            youtubeLinks: this.state.youtubeLinks,
            studyContent: $('#rich-content').val(),
            codeContent: window.codeEditor ? window.codeEditor.getValue() : '',
            images: [],
            uploadedImage: window.uploadedImage ? window.uploadedImage : [],
            uploadedFiles: window.uploadedFiles ? window.uploadedFiles : []
        };

        /*
        upload files when post submit.
        if(window.selectedFiles) {
            window.selectedFiles.forEach((file, ind) => {
                file = new File([file], file.name, { type: 'image/jpg' });
                apiData.images.push(file);
            });
        }

        if($('#additional-files')[0].files.length > 0){
            var fileList = $('#additional-files')[0].files;
            for (let index = 0; index < fileList.length; index++) {
                const file = fileList[index];
                apiData.images.push(file);
            }
        }

        */

        var formData = new FormData();

        Object.keys(apiData).forEach((key, i) => {
            if(key != 'images')
                formData.append(key, apiData[key]);
        });

        // apiData.images.forEach((file, ind) => {
        //     formData.append('images', file);
        // });

        API_CALL('post', 'dopost', apiData, null, data => {
            const { code, message } = data;
            if (code == 'SGK_020') {
                const { data: { postId } } = data;
                $('#rich-content').val('');
                if(window.codeEditor)
                    window.codeEditor.setValue('');
                if(this.state.isRichText)
                    $('#rich-content').jqteVal('');
                this.setState({
                    color: 'success',
                    message: message,
                    notifier: true,
                    caption: '',
                    univ: '',
                    youtubeLinks: '',
                    isRichText: false,
                    codeEditor: false
                });
                $('#additional-files')[0].type = '';
                $('#additional-files')[0].type = 'file';               
            }else{
                this.setState({
                    color: 'danger',
                    message: message,
                    notifier: true
                });
            }            
        });
    }

    render(){
        const { notifier, color, message } = this.state;
        return(
            <div className="container">
                <UploadModal />
	            <div className="row">
                    <main className="col col-xl-12 order-xl-2 col-lg-12 order-lg-1 col-md-12 col-sm-12 col-12">
                        <div className="ui-block">
                            
                            <div className="news-feed-form">
                                <ul className="nav nav-tabs" role="tablist">
                                    <li className="nav-item">
                                        <a className="nav-link active inline-items" data-toggle="tab" href="#home-1" role="tab" aria-expanded="true">
                            
                                            <svg className="olymp-status-icon"><use xlinkHref={ SvgIcon + "#olymp-status-icon"}></use></svg>
                            
                                            <span>New Post</span>
                                        </a>
                                    </li>
                                </ul>

                                <div className="tab-content">
                                    <div className="tab-pane active" id="home-1" role="tabpanel" aria-expanded="true">
                                        
                                        <div className="form-group">
                                            <textarea className="form-control" placeholder="Share what you are thinking here..." id="rich-content"></textarea>
                                        </div>

                                        <div className="under-post">
                                            <div className="row">
                                                <div className="col-sm-6 col-xs-12">

                                                    <div className="form-group with-icon label-floating">
                                                        <label className="control-label">Write a caption</label>
                                                        <input className="form-control post-caption" type="text" autoComplete="off" value={this.state.caption} onChange={this.handleCaption.bind(this)} onKeyUp={this.getCaption.bind(this)} />
                                                        <i className="fab fa-pen" aria-hidden="true"></i>
                                                    </div>

                                                    <div className="mdropDown caption-hashtag scrolable-content">
                                                        {
                                                            this.state.hashTags.map((tag, ind) => {
                                                                return <div key={ind} onClick={this.clickSingleCaption.bind(this)}>{tag}</div>
                                                            })
                                                        }
                                                    </div>                                            
                                                    
                                                </div>

                                                <div className="col-sm-6 col-xs-12">
                                                
                                                    <div className="form-group with-icon label-floating">
                                                        <label className="control-label">Youtube Ref (Seperate with semicolon ';')</label>
                                                        <input className="form-control" type="text" value={this.state.youtubeLinks} onChange={this.handleYoutubeLinks.bind(this)} />
                                                        <i className="fab fa-youtube c-youtube" aria-hidden="true"></i>
                                                    </div>
                                                
                                                </div>
                                            </div>

                                            <div className="row">
                                                <div className="col-sm-4 col-xs-12">
                                                    
                                                    <div className="form-group with-icon label-floating" style={{marginBottom: 0}}>
                                                        <label className="control-label">College / Univercity</label>
                                                        <input type="text" id="muniv" autoComplete="off" onChange={(event)=>{this.setState({univ: event.target.value});}} value={this.state.univ} name="univ" className="form-control" onKeyUp={this.clickUnivercity.bind(this)} />
                                                        <i className="fas fa-graduation-cap c-graduation"></i>
                                                    </div>

                                                    <div className="mdropDown univercity scrolable-content">
                                                        {
                                                            this.state.univercities.map((univ, ind) => {
                                                                return <div key={ind} onClick={this.clickSingleUniv.bind(this)}>{univ}</div>
                                                            })
                                                        }
                                                    </div>

                                                </div>
                                                <div className="col-sm-4 col-xs-12">
                                                    <div className="description-toggle">
                                                        <div className="description-toggle-content">
                                                            <div className="h6">Word Pad Editor</div>
                                                        </div>
                                        
                                                        <div className="togglebutton">
                                                            <label>
                                                                <input type="checkbox" checked={this.state.isRichText} onChange={this.handleRichOption.bind(this)} /><span className="toggle"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>
                                                <div className="col-sm-4 col-xs-12">
                                                    <div className="description-toggle">
                                                        <div className="description-toggle-content">
                                                            <div className="h6">Code Editor</div>
                                                        </div>
                                        
                                                        <div className="togglebutton">
                                                            <label>
                                                                <input type="checkbox" checked={this.state.codeEditor} onChange={this.handleCodeEditor.bind(this)} /><span className="toggle"></span>
                                                            </label>
                                                        </div>
                                                    </div>
                                                </div>                                            
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <Notifier show={notifier} color={color} message={message} />
                                        </div>

                                        <div className="add-options-message">
                                            <a href="#" className="options-message" data-toggle="tooltip" data-placement="top"   data-original-title="ADD PHOTOS & Files">
                                                <svg className="olymp-camera-icon" data-toggle="modal" data-target="#update-header-photo"><use xlinkHref={ SvgIcon + "#olymp-camera-icon"}></use></svg>
                                            </a>
                                            
                                            <button className="btn btn-primary btn-md-2" onClick={this.handleSubmit.bind(this)}>Post Status</button>                                           
                        
                                        </div>
                            
                                        
                                    </div>
                                </div>
                            </div>
				
				        </div>
                    </main>
                </div>                
            </div>            
        );
    }
}

export default NewPost;