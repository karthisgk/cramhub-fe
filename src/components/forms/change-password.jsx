import React, { Component } from 'react';
import { Form, FormGroup, Button } from 'reactstrap';
import { reduxForm } from 'redux-form';

import FormField from '../form-field';
import { validator } from '../../const/validator';
import { validatePassword } from '../../const/util';

class ChangePasswordForm extends Component {
    render() {
        let { required } = validator;
        const { handleSubmit } = this.props;
        return (
            <div>
                <Form onSubmit={handleSubmit(this.props.getValues.bind(this))}>
                    <FormGroup>
                        <FormField
                            label="Old Password"
                            placeholder="Enter old password"
                            name="Old_Password"
                            type="password"
                            validate={[required]}
                        />
                    </FormGroup>
                    <FormGroup>
                        <FormField
                            label="New Password"
                            placeholder="Enter new password"
                            name="New_Password" type="password"
                            validate={[required]} />
                    </FormGroup>
                    <FormGroup>
                        <FormField
                            label="Confirm New Password"
                            placeholder="Confirm new password"
                            name="Confirm_Password"
                            type="password"
                            validate={[required]} />
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
    validatePassword,
    form: 'changePasswordForm',
    enableReinitialize: true
})(ChangePasswordForm);
