import { Component } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import MdArrowForward from 'react-icons/lib/md/arrow-forward';
import axios from 'axios';

class Register extends Component {
    constructor(props) {
        super(props);
        this.Register = this.Register.bind(this);
        this.Valid = this.Valid.bind(this);
        this.state = {
            notValid: false
        }
    }
    Register(e) {
        e.preventDefault();
        let info = {
            Username: this.Username.value,
            FirstName: this.FirstName.value,
            LastName: this.LastName.value,
            Password: this.Password.value
        }
        if(info.Username && info.Password && info.FirstName && info.LastName){
            axios({
                method: 'post',
                url: '/register',
                "headers": {"content-type": "application/json"},
                data: info
            }).then(response => {
                this.props.RegisterUser(response.data);
                this.Username.value = null;
                this.Password.value = null;
                this.FirstName.value = null;
                this.LastName.value = null;
            })
        } else {
            this.setState({
                notValid: true
            })
        }
    }
    Valid() {
        this.setState({
            notValid: false
        })
    }
    render() {
        return (
            <form onChange={this.Valid} className={this.state.notValid ? 'notValid' : null} onSubmit={this.Register}>
                {this.state.notValid ?  <p>You need to fill all<span> fields</span></p>: null}
                <h1>Registration</h1>
                <input ref={input => this.Username = input} placeholder={'Username'} type="text"/>
                <input ref={input => this.FirstName = input} placeholder={'First Name'} type="text"/>
                <input ref={input => this.LastName = input} placeholder={'Last Name'} type="text"/>
                <input ref={input => this.Password = input} placeholder={'Password'} type="password"/>
                <button>Register <MdArrowForward/></button>
            </form>
        )
    }
}

export default connect(
    state => ({
        store: state.userStore
    }),
    dispatch => ({
        RegisterUser: (info) => {
            dispatch({type: 'REGISTER_USER', payload: info})
        }
    })
)(Register);