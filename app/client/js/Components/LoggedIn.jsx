import { Component } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import InfoBar from './InfoBar.jsx';
import PostAdding from './PostAdding.jsx';
import PostListing from './PostListing.jsx';
class LoggedIn extends Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div  className={'LoggedIn'}>
                <InfoBar />
                <div className={'Add-List'}>
                    <PostAdding />
                    <PostListing />
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        store: state.userStore
    })
)(LoggedIn);