import React, { Component } from 'react';
import { validator } from '../../const/validator';
import {
    FormGroup, Form, Button, Row, Col
} from 'reactstrap';
import { reduxForm } from 'redux-form';
import FormField from '../form-field';
import Notifier from '../notifier';
import API_CALL from '../../services';

class ForgetPassword extends Component {

    state = {
		color: 'primary',
		message: '',
        notifier: false,
        success: false
	};
	
	apicall = (data) => {
		API_CALL('post', 'forgetpassword', data, null, (data) => {
			const { code, message } = data;
			if (code == 'SGK_029') {
				this.setState({
					color: 'success',
					message: message,
                    notifier: true,
                    success: true
				});
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
				<div className="form">
                    <Notifier show={notifier} color={color} message={message} />
                </div>
			);
		}
		return (
			<div className="form">
                <Notifier show={notifier} color={color} message={message} />
				<Form onSubmit={handleSubmit(this.apicall.bind(this))}>
					<FormGroup>
						<FormField
							label="Email ID"
							placeholder="Enter your Email ID"
							name="Email_Id"
							type="text"
							validate={[ required, email ]}
						/>
					</FormGroup>
					<div className="text-center mt-4">
						<Button color="primary" block>
							Submit
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
})(ForgetPassword);