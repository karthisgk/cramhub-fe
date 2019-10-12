import React, { Component } from 'react';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import './style.scss';

class Modals extends Component {
    constructor(props){
        super(props);
    }

    render(){
        return (
            <div className="modal fade" id={this.props._id} tabIndex="-1" role="dialog" aria-labelledby={this.props._id} aria-hidden="true">
                <div className="modal-dialog window-popup edit-widget" role="document">
		            <div className="modal-content">
                        <a href="#" className="close icon-close" onClick={this.props.onClose ? this.props.onClose : null} data-dismiss="modal" aria-label="Close">
                            <svg className="olymp-close-icon"><use xlinkHref={ SvgIcon + "#olymp-close-icon"}></use></svg>
                        </a>

                        <div className="modal-header">
                            <h6 className="title">{this.props.title}</h6>
                        </div>

                        <div className="modal-body scrolable-content">
                            {this.props.comp}
                        </div>

                        <div className="modal-footer text-center" data-dismiss="modal">
                            <button type="button" onClick={this.props.onClose ? this.props.onClose : null} className="btn btn-danger">Close</button>
                        </div>

                    </div>
                </div>
            </div>
        );
    }
}

export default Modals;