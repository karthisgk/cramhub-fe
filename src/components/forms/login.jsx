import React, { Component } from 'react';
import cookie from 'react-cookies';
import { validator } from '../../const/validator';
import {
    FormGroup, Form, Button, Row, Col
} from 'reactstrap';
import { reduxForm } from 'redux-form';
import FormField from '../form-field';
import Notifier from '../notifier';
import API_CALL from '../../services';

class Login extends Component {

    state = {
		color: 'primary',
		message: '',
		notifier: false
	};
	
	apicall = (data) => {
		API_CALL('post', 'login', data, null, (data) => {
			const { code, message } = data;
			if (code == 'SGK_020') {
				const { data: { accessToken } } = data;
				cookie.save('session', accessToken, { path: '/' });
				window.location.reload();
			} else {
				this.setState({
					color: 'danger',
					message: message,
					notifier: true
				});
			}
		});
	};

	render() {
		let { required, email } = validator;
        const { handleSubmit } = this.props;
        const { notifier, color, message, success } = this.state;
		if (success) {
			return (
				<div className="login">
					<Row>
						<Col xs={12} className="text-center">
							<h3>You are almost done!</h3>
							<p className="text-black-50">Please verify your email & get activation</p>
						</Col>
					</Row>
				</div>
			);
		}
		return (
			<div className="form">
                <Notifier show={notifier} color={color} message={message} />
				<Form onSubmit={handleSubmit(this.apicall.bind(this))}>
					<FormGroup>
						<FormField
							label="Email ID / User ID"
							placeholder="Enter your Email ID or User ID"
							name="email"
							type="text"
							validate={[ required ]}
						/>
					</FormGroup>
					<FormGroup>
						<FormField placeholder="Password" name="password" type="password" validate={[ required ]} />
					</FormGroup>
					<div className="text-center mt-4">
						<Button color="primary" block>
							Login
						</Button>
					</div>
				</Form>		
			</div>
		);
	}
}

export default reduxForm({
	form: 'loginForm',
	enableReinitialize: true
})(Login);