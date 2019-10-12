import React, { Component } from 'react';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import FileUploader from '../file-uploader';
import API_CALL from '../../services';
import {getRootUrl} from '../../const/util';
import './style.scss';

export default class UploadModal extends Component {

    constructor(props){
        super(props);
        this.state = {
            additionalFiles: []
        };
    }

    handleFiles(eve) {
        if(!window.additionalFiles)
            window.additionalFiles = [];
        
        if($('#additional-files')[0].files.length > 0){
            var fileList = $('#additional-files')[0].files;
            for (let index = 0; index < fileList.length; index++) {
                const file = fileList[index];
                window.additionalFiles.push(file);
            }
        }

        this.setState({
            additionalFiles: window.additionalFiles
        })
    }


    handleUpload(eve){
        var mfiles = {uploadedImage: [], uploadedFiles: []};
        if(window.selectedFiles) {
            window.selectedFiles.forEach((file, ind) => {
                file = new File([file], file.name, { type: 'image/jpg' });
                mfiles.uploadedImage.push(file);
            });
        }

        if(window.additionalFiles) {
            window.additionalFiles.forEach((file, ind) => {
                mfiles.uploadedFiles.push(file);
            });
        }

        console.log(mfiles);
        var formData = new FormData();
        mfiles.uploadedImage.forEach((file, ind) => {
            formData.append('images', file);
        });
        mfiles.uploadedFiles.forEach((file, ind) => {
            formData.append('images', file);
        });

        API_CALL('post', 'uploadpostfiles', formData, null, data => {
            const { code, message } = data;
            if (code == 'SGK_020') {
                   var files = data.data;
                   window.uploadedImage = files.images;
                   window.uploadedFiles = files.additionalFiles;
                   $('#update-header-photo').modal('toggle');
            }else{
                console.log(message);
            }            
        });
    }

    render(){
        return (
            <div className="modal fade" id="update-header-photo" tabIndex="-1" role="dialog" aria-labelledby="update-header-photo" aria-hidden="true">
                <div className="modal-dialog window-popup update-header-photo" role="document">
                    <div className="modal-content">
                        <a href="#" className="close icon-close" onClick={() => $('#update-header-photo').modal('toggle')}>
                            <svg className="olymp-close-icon"><use xlinkHref={SvgIcon + "#olymp-close-icon"}></use></svg>
                        </a>

                        <div className="modal-header">
                            <h6 className="title">Upload Images</h6>
                        </div>

                        <div className="modal-body">
                            <a href="#" className="upload-photo-item" style={{width: '100%'}}
                            onClick={(e) => $(e.currentTarget).find('section.container input').click()}>
                                <svg className="olymp-computer-icon"><use xlinkHref={SvgIcon + "#olymp-computer-icon"}></use></svg>

                                <FileUploader />
                            </a>

                            <h6 className="text-center">Right click to remove</h6>

                            {this.state.additionalFiles ?
                                <div className="additional-files">
                                    <h5>Attached Files</h5>                                    
                                    {this.state.additionalFiles.map(( file, ind) => 
                                        <a key={ind} href="#" >
                                            {file.name}
                                        </a>
                                    )}
                                </div>
                            : ''}
                        </div>

                        <div className="modal-footer text-center">
                            <input type="file" multiple id="additional-files" onChange={this.handleFiles.bind(this)} style={{display: 'none'}} />
                            <button className="btn btn-md-2 btn-border-think btn-transparent c-grey" onClick={() => $('#additional-files').click()}>Attach Files</button>
                            <button className="btn btn-primary btn-md-2" onClick={this.handleUpload.bind(this)}>Upload Files & Images</button>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
};