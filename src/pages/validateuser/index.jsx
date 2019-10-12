import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import { Link } from 'react-router-dom';

import Notifier from './../../components/notifier';
import API_CALL from './../../services';
import { getUrlParams } from '../../const/util';
import './style.scss';

export class ValidateUser extends Component {
	state = {
		token: getUrlParams('token'),
		error: false
	};

	constructor(props) {
		super(props);
		const { token } = this.state;
		API_CALL('get', 'validatetoken?token=' + token, null, null, (data) => {
			const { code } = data;
			if (code == 'SGK_027') {
				this.setState({ show: true });
			} else {
				this.setState({ error: true });
			}
		});
	}

	render() {
		const { show, error } = this.state;
		if (show) {
			return (
				<div className="ui-block">
					<div className="set-password ui-block-content">
						<Row>
							<Col xs={12} className="text-center heading">
								Superb! your email is verified successfully.
							</Col>
							<Col xs={12} md={{ size: 4, offset: 4 }}>
								You can{' '}
								<a href="#" data-toggle="modal" data-target="#login-modal" className="text-primary">
									Login
								</a>{' '}
								into the application using your password.
							</Col>
						</Row>
					</div>
				</div>
			);
		} else if (error) {
			return (
				<div className="ui-block">
					<div className="set-password ui-block-content">
						<Row>
							<Col xs={12} className="text-center heading">
								Sorry! something went wrong
							</Col>
							<Col xs={12} md={{ size: 4, offset: 4 }}>
								<Notifier color="danger" message="Invalid token" />
							</Col>
						</Row>
					</div>
				</div>
			);
		} else {
			return null;
		}
	}
}

export default ValidateUser;
