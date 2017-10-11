import { Component } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import GoSignOut from 'react-icons/lib/go/sign-out';
class InfoBar extends Component {
    constructor(props) {
        super(props);
        this.LogOut = this.LogOut.bind(this);
    }
    LogOut(e) {
        e.preventDefault();
        this.props.LogOut();
    }
    render() {
        return (
            <div className={'infoBar'}>
                 <h1>_Story</h1>
                <div>
                    <div>
                        <div className={'photo'}>{this.props.store.user.FirstName[0]}{this.props.store.user.LastName[0]}
                            <div className={'info'}>
                                <p>Username: {this.props.store.user.Username}</p>
                                <p>First Name: {this.props.store.user.FirstName}</p>
                                <p>Last Name: {this.props.store.user.LastName}</p>
                            </div>
                        </div>

                    </div>
                    <button onClick={this.LogOut}><GoSignOut /></button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        store: state.userStore
    }),
    dispatch => ({
        LogOut: () => {
            dispatch({type: 'LOGOUT_USER'})
        }
    })
)(InfoBar);