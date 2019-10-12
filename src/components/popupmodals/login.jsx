import React, { Component } from 'react';
import cookie from 'react-cookies';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import Modal from './';
import {
    Row, Col
} from 'reactstrap';
import SignupForm from '../forms/signup';
import LoginFrom from '../forms/login';
import ForgetPassword from '../forms/forgetpassword';


class LoginModal extends Component {

	state = {
		popupTiltle: 'Login',
		loginFrom: <LoginFrom />,
		singupFrom: null,
		forgetPassword: null
	};

    constructor(props){
        super(props);
	}	

	openPanel(e){
        e.preventDefault();
		const ele = $(e.currentTarget.getAttribute('href'));
		this.setState({
			popupTiltle: e.currentTarget.getAttribute('data-text')
		});
		if(this.props.onTitleChange)
			this.props.onTitleChange(e.currentTarget.getAttribute('data-text'));
		ele.parent().find('.tab-pane.active').removeClass('active');
		ele.addClass('active');
		this.setState({
			loginFrom: ele.attr('id') == 'login-panel' ? <LoginFrom /> : null,
			singupFrom: ele.attr('id') == 'signup-panel' ? <SignupForm /> : null,
			forgetPassword: ele.attr('id') == 'forget-panel' ? <ForgetPassword /> : null
		}); 
    }

    renderElement(){		
        return (
            <div className="login-comp">

				<div className="tab-content">
					<div className="tab-pane active" id="login-panel" role="tabpanel">						
						{this.state.loginFrom}

						<Col xs={12} className="text-center">
							<h6>
								<a href="#forget-panel" data-text="Forgot Your Password" onClick={this.openPanel.bind(this)}>Forgot Password?</a>
							</h6>
						</Col>
						<Col xs={12} className="add-on text-center">
							New User? <a href="#signup-panel" data-text="Signup" onClick={this.openPanel.bind(this)}>Signup Here</a>
						</Col>
					</div>

					<div className="tab-pane" id="signup-panel" role="tabpanel">
						{this.state.singupFrom}
						<Col xs={12} className="text-center">
							<h6>
								<a href="#forget-panel" data-text="Forgot Your Password" onClick={this.openPanel.bind(this)}>Forgot Password?</a>
							</h6>
						</Col>
						<Col xs={12} className="add-on text-center">
							Already a user? <a href="#login-panel" data-text="Login" onClick={this.openPanel.bind(this)}>Login</a>
						</Col>
					</div>

					<div className="tab-pane" id="forget-panel" role="tabpanel">						
						{this.state.forgetPassword}

						<Col xs={12} className="text-center">
							<h6>
								<a href="#login-panel" data-text="Login" onClick={this.openPanel.bind(this)}>Login</a>
							</h6>
						</Col>

						<Col xs={12} className="add-on text-center">
							New User? <a href="#signup-panel" data-text="Signup" onClick={this.openPanel.bind(this)}>Signup Here</a>
						</Col>
					</div>
				</div>				

				{/*<Row>
					<Col sm={12} lg={6} >
						<a href="#" className="btn bg-facebook full-width btn-icon-left">
							<i className="fab fa-facebook" aria-hidden="true"></i>Facebook
						</a>
					</Col>

					<Col sm={12} lg={6} >
						<a href="#" className="btn bg-google full-width btn-icon-left">
							<i className="fab fa-google" aria-hidden="true"></i>google
						</a>
					</Col>
				</Row>*/}
            </div>
        )
	}
	
	onClose(e){
		$(e.currentTarget).parent().closest('.modal-content')
		.find('input.form-control').removeClass('input-error').next().remove();
	}

    render(){
		if(cookie.load('session')){
			return null;
		}

		if(this.props.flogin){
			return this.renderElement();
		}

        return (
            <Modal _id="login-modal" title={this.state.popupTiltle} comp={this.renderElement()} onClose={this.onClose} />
        );
    }
}

export default LoginModal;