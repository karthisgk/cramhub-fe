import React, { Component } from 'react';
import Login from '../popupmodals/login';

class FLogin extends Component {
    constructor(props){
        super(props);
        this.state = {menuTitile: 'Login'};     
    }

    handleTitleChange(title){
        this.setState({
            menuTitile: title
        });
    } 

    render() {
        return (
            <div className="container">
                <div className="row" style={{marginTop: '35px'}}>
                    <div className="col col-xl-4 order-xl-2 col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12 xs-hidden"></div>
                    <div className="col col-xl-4 order-xl-2 col-lg-6 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12">
                        <div className="ui-block">
                            <div className="ui-block-title">
                                <h6 className="title">{this.state.menuTitile}</h6>
                            </div>
                            <div className="ui-block-content">
                                <Login flogin={true} onTitleChange={this.handleTitleChange.bind(this)} />
                            </div>
                        </div>
                    </div>
                    <div className="col col-xl-4 order-xl-2 col-lg-3 order-lg-2 col-md-12 order-md-1 col-sm-12 col-12 xs-hidden"></div>
                </div>
            </div>
        )
    }
}

export default FLogin;