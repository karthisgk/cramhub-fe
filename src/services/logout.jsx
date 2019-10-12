import cookie from 'react-cookies';
import API_CALL from './';
export function Logout(){
    API_CALL('get', 'logout', null, null, (data) => {
        if (data.code == 'SGK_024') {
            cookie.remove('session');
            window.location.reload();
        }
    });
}