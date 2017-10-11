import { connect } from 'react-redux';
import React from 'react';
import axios from 'axios';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';

class Login extends React.Component {
    constructor(props) {
        super(props);
        this.LogIn = this.LogIn.bind(this);
        this.Validate = this.Validate.bind(this);
        this.state = {
            notValid : false
        }
    }

    LogIn(e) {
        e.preventDefault();
        let userLog = {
            Username: this.usernameIn.value,
            Password: this.passwordIn.value
        }
        if (userLog.Username && userLog.Password) {
                axios({
                    method: "GET",
                    url: `/login/${userLog.Username}`,
                    headers: {"content-type": "application/json"}
                })
                .then(response => {
                    if (response.data.Password === userLog.Password.toString()) {
                        this.props.LoginUser(response.data);
                    } else {
                        return this.setState({notValid: true});
                    }
                })
        }  else {
            return this.setState({notValid: true});
        }
    }
    Validate() {
        this.setState({
            notValid: false
        })
    }
    render() {
        return (
            <form className={this.state.notValid ? 'notValid' : null} onSubmit={this.LogIn}>
                {this.state.notValid ?  <p>Incorrect <span>Username</span> or <span>Password</span></p>: null}
                <input onChange={this.Validate} ref={input => this.usernameIn = input} placeholder={'Username'} type="text"/>
                <input onChange={this.Validate} ref={input => this.passwordIn = input} placeholder={'Password'} type="password"/>
                <button>Log In<MdArrowForward/></button>
            </form>
        )
    }
}

export default connect(
    state => ({
        store: state.userStore
    }),
    dispatch => ({
        LoginUser: (user) => {
            dispatch({type: 'LOGIN_USER', payload: user})
        }
    })
)(Login);