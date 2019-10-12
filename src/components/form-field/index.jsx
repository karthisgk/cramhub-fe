import React, { Component } from 'react';
import { Field } from 'redux-form';
import { Input } from 'reactstrap';
import Datetime from 'react-datetime';
import moment from 'moment';

import './style.scss';

class FormField extends Component {
	generateComponent = (field) => {
		const { type, input, placeholder, keyword, list, label, option, disable, meta } = field;
		const { error, touched } = meta;
		if (type === 'select') {
			let optionList = _.map(list, (data, index) => {
				return (
					<option value={data[keyword]} key={index}>
						{data[option]}
					</option>
				);
			});
			return (
				<div>
					<label>{label ? label : placeholder}</label>
					<Input
						type="select"
						disabled={disable}
						className={touched && error ? 'input-error' : ''}
						{...input}
					>
						<option value="">Select {placeholder}</option>
						{optionList}
					</Input>
					{error && touched ? (
						<div className="error">
							<span className="icon">!</span>
							<span className="message">{error}</span>
						</div>
					) : (
							''
						)}
				</div>
			);
		} else if (type == 'date') {
			return (
				<div>
					<label>{label ? label : placeholder}</label>
					<Datetime
						timeFormat={false}
						closeOnSelect={true}
						dateFormat="DD/MM/YYYY"
						isValidDate={(currentDate) => {
							if (input.name == 'DOB') return currentDate.isBefore(moment().subtract(1, 'days'));
							else return currentDate.isAfter(moment().subtract(1, 'days'));
						}}
						inputProps={{ placeholder: placeholder }}
						{...input}
						className={touched && error ? 'input-error' : ''}
					/>
					{error && touched ? (
						<div className="error">
							<span className="icon">!</span>
							<span className="message">{error}</span>
						</div>
					) : (
							''
						)}
				</div>
			);
		} else if (type == 'time') {
			return (
				<div>
					<label>{label ? label : placeholder}</label>
					<Datetime
						timeFormat="hh:mm A"
						closeOnSelect={true}
						dateFormat={false}
						inputProps={{ placeholder: placeholder }}
						{...input}
						className={touched && error ? 'input-error' : ''}
					/>
					{error && touched ? (
						<div className="error">
							<span className="icon">!</span>
							<span className="message">{error}</span>
						</div>
					) : (
							''
						)}
				</div>
			);
		} else if (type == 'file') {
			return (
				<div>
					<label>{label ? label : placeholder}</label>
					<Input
						type={type}
						placeholder={placeholder}
						{...input}
						className={touched && error ? 'input-error' : ''}
						value={null}
						accept={'.pdf, .png, .jpg, .jpeg'}
					/>
					{error && touched ? (
						<div className="error">
							<span className="icon">!</span>
							<span className="message">{error}</span>
						</div>
					) : (
						''
					)}
				</div>
			);
		} else {
			return (
				<div>
					<label>{label ? label : placeholder}</label>
					<Input
						type={type}
						placeholder={placeholder}
						{...input}
						className={touched && error ? 'input-error' : ''}
					/>
					{error && touched ? (
						<div className="error">
							<span className="icon">!</span>
							<span className="message">{error}</span>
						</div>
					) : (
							''
						)}
				</div>
			);
		}
	};

	render() {
		return <Field {...this.props} component={this.generateComponent} />;
	}
}

export default FormField;
