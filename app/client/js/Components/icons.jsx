import { Component } from 'react';
import React from 'react';
import MdAddCircleOutline from 'react-icons/lib/md/add-circle-outline';
import MdAccountCircle from 'react-icons/lib/md/account-circle';
class icons extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className={'icons'}>
                <h1>Welcome to UnderLine_STORY</h1>
                <div>
                    <div className={this.props.openRegister ? 'active' : ''} >
                        <h3>Register</h3>
                        <MdAddCircleOutline onClick={this.props.newUser}/>
                    </div>
                    <div className={this.props.openLogin ? 'active' : ''}>
                        <h3>Log In</h3>
                        <MdAccountCircle   onClick={this.props.oldUser}/>
                    </div>
                </div>
            </div>
        )
    }
}

export default icons;