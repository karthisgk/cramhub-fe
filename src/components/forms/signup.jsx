import React, { Component } from 'react';
import { validator } from '../../const/validator';
import {
    FormGroup, Form, Button, Row, Col
} from 'reactstrap';
import { reduxForm } from 'redux-form';
import FormField from '../form-field';
import Notifier from '../notifier';
import API_CALL from '../../services';
import {validatePasswordSignup} from '../../const/util';

class Signup extends Component {

    state = {
		notifier: false,
		color: 'primary',
		message: '',
		success: false
    };
    
    signupApi = (values) => {
		API_CALL('post', 'signup', values, null, (data) => {
			const { code, message } = data;
			if (code == 'SGK_008') {
				this.setState({
					notifier: true,
					color: 'info',
					message:
						'Hey ' +
						values.First_Name +
						', you are already entitled. We have emailed you the link, can setup password there.'
				});
				$("#login-modal").find('.scrolable-content').animate({ 
                        scrollTop: $('#signup-panel').find('.form .alert').offset().top 
                }, 600);
			} else if (code == 'SGK_009') {
				this.setState({
					success: true
				});
			} else {
				this.setState({
					notifier: true,
					color: 'danger',
					message
                });
                $("#login-modal").find('.scrolable-content').animate({ 
                    scrollTop: $('#signup-panel').find('.form .alert').offset().top 
                }, 600);
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
				<Form onSubmit={handleSubmit(this.signupApi.bind(this))}>
                    <FormGroup>
						<FormField
							label="Firstname"
							placeholder="Enter your firstname"
							name="First_Name"
							type="text"
							validate={[ required ]}
						/>
					</FormGroup>
					<FormGroup>
						<FormField label="Lastname" placeholder="Enter your lastname" name="Last_Name" type="text" />
					</FormGroup>
					<FormGroup>
						<FormField
							label="Email ID"
							placeholder="Enter your Email ID"
							name="Email_Id"
							type="text"
							validate={[ required, email ]}
						/>
					</FormGroup>
					<FormGroup>
						<FormField placeholder="Password" name="password" type="password" validate={[ required ]} />
					</FormGroup>
					<FormGroup>
						<FormField
							label="Confirm Password"
							placeholder="Re-enter password"
							name="cpassword"
							type="password"
							validate={[ required ]}
						/>
					</FormGroup>
					<div className="text-center mt-4">
						<Button color="primary" block>
							Signup
						</Button>
					</div>
				</Form>		
			</div>
		);
	}
}

export default reduxForm({
	validatePasswordSignup,
	form: 'loginForm',
	enableReinitialize: true
})(Signup);