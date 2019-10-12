import React, { Component } from 'react';
import Profile from './';
import avatar from './../../assets/img/author-page.jpg';
import UpdateUser from '../../components/forms/updateuser';
import API_CALL from '../../services';
import { Row, Col } from 'reactstrap';
import Notifier from '../../components/notifier';
import cookie from 'react-cookies';
import ImageCrop from '../../components/image-crop';

class ProfileSettings extends Component {
    constructor(props){
        super(props);
        this.state = {
			responseStatus: false,
            avatar: avatar,
            message: '',
			color: 'success',
			suser: {},
			open: false
		};
	}
	
	componentWillMount(){
        if(cookie.load('session')) {
			var suser = window[cookie.load('userdetail')];
            this.setState({suser: suser, open: true});
        }
    }

    save(data) {
		const { avatar } = this.state;
		if (avatar) {
			data.avatar = avatar;
		}

		if(typeof data.DOB != 'string')
			data.DOB = data.DOB.format('YYYY-MM-DD');

		let formdata = new FormData();
		for (let i in data) {
			formdata.append(i, data[i]);
		}

		API_CALL('post', 'updateuser', formdata, null, (data) => {
			const { code, message } = data;
			if (code == 'SGK_002') {
				this.setState({
					responseStatus: true,
					message: message,
					color: 'success'
				});
			} else {
				this.setState({
                    responseStatus: true,
					color: 'danger',
					message: message
				});
			}
		});
	}

    render() {
        const { message, responseStatus, color, suser, open } = this.state;
		if(!open) {
			return null;
		}
		return (
			<Row>
				<Col xs={12} sm={12} md={{ size: 6, offset: 3 }}>
					<ImageCrop image={suser.image ? suser.image : avatar} setImage={(file) => {this.setState({ avatar: file }) }} />
					<UpdateUser getValues={(values) => this.save(values)} initialValues={suser} />
					<Notifier message={message} color={color} show={responseStatus} />
				</Col>
			</Row>
		);
    }
}

export default ProfileSettings;