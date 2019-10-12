import axios from 'axios';
import cookie from 'react-cookies';

import {getRootUrl} from '../const/util';

const ROOT_URL = getRootUrl();

function getToken() {
	return cookie.load('session');
}

function API_CALL(method, url, data, type, callback, file) {
	console.log('Calling API for the method of ' + method + ' : ' + ROOT_URL + url);
	let header = {};
	if (getToken()) {
		header['token'] = getToken();
	}
	if (callback) {
		axios({
			method,
			url: ROOT_URL + url,
			data,
			headers: header,
			responseType: file ? 'arraybuffer' : 'json'
		}).then((data) => {
			return callback(data.data);
		});
	} else {
		return (dispatch) => {
			dispatch({
				type: type.REQ
			});
			axios({
				method,
				url: ROOT_URL + url,
				data,
				headers: header
			})
				.then((response) => {
					if (response.data.code == 'MNS005') {
						cookie.remove('session', { path: '/' });
						window.location.reload();
					} else {
						dispatch({
							type: type.RES,
							payload: response.data
						});
					}
				})
				.catch((error) => {
					dispatch({
						type: type.FAIL,
						payload: error
					});
				});
		};
	}
}

export default API_CALL;
