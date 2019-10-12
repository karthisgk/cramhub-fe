import React, { Component } from 'react';
import { connect } from 'react-redux';
import SvgIcon from '../../assets/svg-icons/sprites/icons.svg';
import { Link } from 'react-router-dom';

import ProfileSettings from './profilesettings';
import ChangePassword from './changepassword';
import AccountSettings from './accountsettings';

class Profile extends Component {
    constructor(props){
        super(props);
        this.state = {currentTitle: props.title, comp: props.comp};
    }

    render(){
        return (
            <div className="container">
                <div className="row">
                    <div className="col col-xl-9 order-xl-2 col-lg-9 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                        <div className="ui-block">
                            <div className="ui-block-title">
                                <h6 className="title">{this.state.currentTitle}</h6>
                            </div>
                            <div className="ui-block-content">
                                {this.state.comp}
                            </div>
                        </div>
                    </div>

                    <div className="col col-xl-3 order-xl-1 col-lg-3 order-lg-1 col-md-12 order-md-2 col-sm-12 col-12 responsive-display-none">
                        <div className="ui-block">
                            
                            <div className="your-profile">
                                <div className="ui-block-title ui-block-title-small">
                                    <h6 className="title">Your PROFILE</h6>
                                </div>

                                <div id="accordion" role="tablist" aria-multiselectable="true">
                                    <div className="card">
                                        <div className="card-header" role="tab" id="headingOne">
                                            <h6 className="mb-0">
                                                <a data-toggle="collapse" data-parent="#accordion" href="#collapseOne" aria-expanded="true" aria-controls="collapseOne">
                                                    Profile Settings
                                                    <svg className="olymp-dropdown-arrow-icon"><use xlinkHref={ SvgIcon + "#olymp-dropdown-arrow-icon"}></use></svg>
                                                </a>
                                            </h6>
                                        </div>

                                        <div id="collapseOne" className="collapse show" role="tabpanel" aria-labelledby="headingOne">
                                            <ul className="your-profile-menu">
                                                <li>
                                                    <Link to="/profilesettings">Personal Information</Link>
                                                </li>
                                                <li>
                                                    <Link to="/accountsettings">Account Settings</Link>
                                                </li>
                                                <li>
                                                    <Link to="/changepassword">Change Password</Link>
                                                </li>
                                            </ul>
                                        </div>
                                    </div>
                                </div>

                                <div className="ui-block-title">
                                    <a href="33-YourAccount-Notifications.html" className="h6 title">Notifications</a>
                                    <a href="#" className="items-round-little bg-primary">8</a>
                                </div>
                                <div className="ui-block-title">
                                    <a href="34-YourAccount-ChatMessages.html" className="h6 title">Chat / Messages</a>
                                </div>
                                <div className="ui-block-title">
                                    <a href="35-YourAccount-FriendsRequests.html" className="h6 title">Friend Requests</a>
                                    <a href="#" className="items-round-little bg-blue">4</a>
                                </div>

                            </div>
                        
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export const ps = connect((reduxData) => {
	return {
        title: "Profile Settings", 
        comp: <ProfileSettings />
	};
})(Profile);
export const as = (props) => <Profile title="Account Settings" comp={<AccountSettings />} />;
export const cp = (props) => <Profile title="Change Password" comp={<ChangePassword />} />;