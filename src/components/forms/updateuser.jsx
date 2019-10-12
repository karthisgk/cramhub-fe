import React, { Component } from 'react';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import API_CALL from '../../services';
import { Row, Col, Form, FormGroup, Button } from 'reactstrap';
import { reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import _ from 'lodash';

import FormField from '../form-field';
import { validator } from '../../const/validator';
import './style.scss';
import cookie from 'react-cookies';

class AddForm extends Component {

	constructor(props){
		super(props);
		this.state = {univ: '', univercities: []};
		window.clickUnivercity = (e) => {
			$(e).parent().find('.selected').removeClass('selected');
			$(e).addClass('selected');
			document.getElementsByName('univ')[0].value = $(e).text();
			$('.univercity').hide().html('');
		}
	}

	componentWillMount(){
        if(cookie.load('session')) {
			var suser = window[cookie.load('userdetail')];
            this.setState({univ: suser.univ});
        }
	}
	
	clickSingleUniv(event){
        var e = event.target;
        $(e).parent().find('.selected').removeClass('selected');
        $(e).addClass('selected');
        this.setState({univ: $(e).text(), univercities: []});
        $('.univercity').hide();
    }

    clickUnivercity(event){
		var $this = event.target;
        if($this.value.length > 3){			
			API_CALL('post', 'gethashtags?type=2&offset=0&limit=20', {searchText: $this.value}, null, data => {
				const { code } = data;
				var univercities = data.data;
                $('.univercity').show();
				if (code == 'SGK_020') {
					if(univercities.length == 0){
                        $('.univercity').hide();
                        this.setState({univercities: []});
						return;
                    }
                    if(univercities.length > 0){
                        this.setState({univercities: univercities});
                    }else{
                        this.setState({univercities: []});
                        $('.univercity').hide();
                    }
				}
			});
		}else{
            $('.univercity').hide();
            this.setState({univercities: []});
		}
    }

	onSubmit(data){
		data.univ = this.state.univ;
		this.props.getValues(data);
	}

	render() {
		const { required, email } = validator;
		return (
			<div>
				<Form onSubmit={this.props.handleSubmit(this.onSubmit.bind(this))}>
					<FormGroup>
						<FormField placeholder="Firstname" name="First_Name" type="text" validate={[ required ]} />
					</FormGroup>
					<FormGroup>
						<FormField placeholder="Lastname" name="Last_Name" type="text" />
					</FormGroup>
					<FormGroup>
						<FormField placeholder="Date Of Birth" name="DOB" type="date" validate={[ required ]} />
					</FormGroup>
					<FormGroup>
						<FormField
							placeholder="Gender" 
							name="Gender"
							type="select"
							list={[ { name: 'Male', _id: 'm' }, { name: 'Female', _id: 'f' } ]}
							option="name"
							keyword="_id"
							validate={[ required ]}
						/>                        
					</FormGroup>
					<FormGroup>
						<FormField placeholder="Email ID" name="Email_Id" type="text" validate={[ required, email ]} />
					</FormGroup>	

					<div className="form-group" style={{marginBottom: 0}}>
						<div>
							<label>College / Univercity</label>
							<input type="text" autoComplete="off" onChange={(event)=>{this.setState({univ: event.target.value});}} value={this.state.univ} placeholder="College / Univercity" name="univ" className="form-control" onKeyUp={this.clickUnivercity.bind(this)} />
						</div>
					</div>

					<div className="mdropDown univercity scrolable-content">
						{
							this.state.univercities.map((univ, ind) => {
								return <div key={ind} onClick={this.clickSingleUniv.bind(this)}>{univ}</div>
							})
						}
					</div>			

					<div className="text-center" style={{marginTop: '1.4rem'}}>
						<Button color="primary">Submit</Button>
					</div>
				</Form>
			</div>
		);
	}
}

function mapStateToProps(reduxData) {
	return {};
}

export default reduxForm({
	form: 'addLabourForm',
	enableReinitialize: true
})(connect()(AddForm));
