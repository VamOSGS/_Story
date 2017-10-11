import React, {Component} from 'react';
import axios from 'axios';
import {connect} from 'react-redux';
import Login from './Login.jsx';
import Register from './Register.jsx';
import LoggedIn from './LoggedIn.jsx';
import Icons from './icons.jsx';
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline';
import MdAccountCircle from 'react-icons/lib/md/account-circle';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.newUser = this.newUser.bind(this);
        this.oldUser = this.oldUser.bind(this);
        this.state = {
            openRegister: false,
            openLogin: false
        }
    }

    newUser() {
        this.setState({
            openRegister: this.state.openRegister ? false : true,
            openLogin: false
        })
    }

    oldUser() {
        this.setState({
            openLogin: this.state.openLogin ? false : true,
            openRegister: false
        })
    }

    render() {
        return (
            <div>
                <div className={'wrap'}>
                    {
                        this.props.store.loggedIn ? <LoggedIn/>:
                        <div className={'loggedOut'}>
                            <Icons openRegister={this.state.openRegister} openLogin={this.state.openLogin}
                                   oldUser={this.oldUser} newUser={this.newUser}/>
                            <div className={'inputs'}>
                                <div className={this.state.openRegister ? 'Register active' : 'Register '}>
                                    <Register />
                                </div>
                                <div className={this.state.openLogin ? 'login active' : 'login'}>
                                    <Login />
                                </div>
                            </div>
                        </div>
                    }
                </div>
            </div>

        );
    }
}


export default connect(
    state => ({
        store: state.userStore
    })
)(App);

