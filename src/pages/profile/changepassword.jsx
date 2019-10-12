import React, { Component } from 'react';
import { Row, Col } from 'reactstrap';
import Profile from './';

import Notifier from '../../components/notifier';
import ChangePasswordForm from '../../components/forms/change-password';
import API_CALL from '../../services';

class ChangePassword extends Component {

    apicall = data => {        
        API_CALL('post', 'changepassword', data, null, (data) => {
            const { code, message } = data;
            if (code == 'SGK_028') {
                this.setState({
                    notifier: true,
                    color: 'info',
                    message: 'Your password has been changed successfully.'
                });
            } else {
                this.setState({
                    color: 'danger',
                    message: message,
                    notifier: true
                });
                setTimeout(() => console.log(this.state), 1000);
            }
        });
    };

    constructor(props){
        super(props);
        this.state = {
            color: 'primary',
            message: '',
            notifier: false
        };
    }

    render() {
        const { color, message, notifier } = this.state;
        const Alert = <Notifier color={color} message={message} show={notifier} />;      

        return (
            <div className="login">
                <Row>
                    <Col xs={12} md={{ size: 4, offset: 4 }}>
                        <ChangePasswordForm getValues={(data) => this.apicall(data)} />
                        {notifier ? Alert : null}
                    </Col>
                </Row>
            </div>
        );
    }
}

export default ChangePassword;