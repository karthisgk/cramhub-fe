import React, { Component } from 'react';
import API_CALL from '../../services';
import Profile from './';
import cookie from 'react-cookies';

class AccountSettings extends Component {
    constructor(props){
        super(props);
        this.state = {isPrivate: false, open: false};        
    }

    componentDidMount(){
        if(cookie.load('session')) {
			var suser = window[cookie.load('userdetail')];
            this.setState({isPrivate: suser.isPrivate == 1, open: true});
            window.setTimeout(this.resolve, 1000);
        }
    }

    handlePrivateMode(eve){
        this.setState({
            isPrivate: eve.target.checked
        });
        var element = $(eve.target);
        element.prop('disabled', true);
        API_CALL('post', 'updateuser', {isPrivate: eve.target.checked ? 1 : 0}, null, (data) => {
            const { code, message } = data;
            element.prop('disabled', false);
		});
    }

    resolve() {
        if($('.togglebutton label').children('.toggle').length == 2 ) {
            $('.togglebutton label').children('.toggle').eq(1).remove();
            $('.toggle').attr('style', 'display: block !important;');
        }
    }

    render() {
        const { open } = this.state;
		if(!open) {
			return null;
		}
        return (
            <div className="row">
                <div className="col-sm-4 col-xs-12">
                    <div className="description-toggle">
                        <div className="description-toggle-content">
                            <div className="h6">Private Mode</div>
                        </div>

                        <div className="togglebutton">
                            <label>
                                <input type="checkbox" checked={this.state.isPrivate} onChange={this.handlePrivateMode.bind(this)} />
                                <span className="toggle"></span>
                            </label>
                        </div>
                    </div>
                </div>  
            </div>
        )
    }
}

export default AccountSettings;