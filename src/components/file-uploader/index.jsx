import React, {useEffect, useState} from 'react';
import {useDropzone} from 'react-dropzone';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import ImageCompressor from 'image-compressor.js';
import './style.scss';

const thumbsContainer = {
  display: 'flex',
  flexDirection: 'row',
  flexWrap: 'wrap',
  marginTop: 16
};

const thumb = {
  display: 'inline-flex',
  borderRadius: 2,
  border: '1px solid #eaeaea',
  marginBottom: 8,
  marginRight: 8,
  width: 100,
  height: 100,
  padding: 4,
  boxSizing: 'border-box',
  position: 'relative'
};

const thumbInner = {
  display: 'flex',
  minWidth: 0,
  overflow: 'hidden'
};

const img = {
  display: 'block',
  width: 'auto',
  height: '100%'
};


export default function (props) {
    const [files, setFiles] = useState([]);
    const [loader, setLoader] = useState(false);
    const {getRootProps, getInputProps} = useDropzone({
        accept: 'image/*',
        onDrop: acceptedFiles => {
            if(files.length > 0)
                acceptedFiles = acceptedFiles.concat(files);
            var f = [];
            setLoader(true);
            acceptedFiles.forEach(file => {
                new ImageCompressor(file, {
                    success: function(file){
                        f.push(file);
                        if(f.length == acceptedFiles.length){
                            var fls = f.map(file => Object.assign(file, {
                                preview: URL.createObjectURL(file)
                            }));
                            window.selectedFiles = fls;
                            setFiles(fls);
                            setLoader(false);
                        }
                    }
                });
            });            
        }
    });

    var rightClick = (e) => {
        e.preventDefault();
        files.forEach((file, ind) => {
            if(file.preview == $(e.currentTarget).find('img.uploaded-img').attr('src')){
                files.splice(ind, 1);
                window.selectedFiles = files;
                setFiles(files.map(file => Object.assign(file, {
                    preview: URL.createObjectURL(file)
                })));
            }
        });
    }
  
    const thumbs = files.map((file, ind) => (
        <div style={thumb} key={ind} onContextMenu={(e) => rightClick.bind(this)(e)}>
            {!loader ? <div style={thumbInner}>
                <img
                className="uploaded-img"
                src={file.preview}
                style={img}
                />
            </div> : <div id="loader"></div>}            
        </div>
    ));

    useEffect(() => () => {
        files.forEach(file => URL.revokeObjectURL(file.preview));
    }, [files]);

    return (
        <section className="container">
        <div {...getRootProps({className: 'dropzone'})}>
            <input {...getInputProps()} />
            <p>Drag 'n' drop some files here, or click to select files</p>
        </div>
        <aside style={thumbsContainer} id="upload-preview">
            {thumbs}
        </aside>
        </section>
    );
}