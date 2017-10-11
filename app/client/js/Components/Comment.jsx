import { Component } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import axios from 'axios';
import MdSend from 'react-icons/lib/md/send';

class Comment extends Component {
    constructor(props) {
        super(props);
        this.addComment = this.addComment.bind(this);
    }
    addComment(e) {
        e.preventDefault();
        let info = this.Comment.value;
        let data = {
            comment : info,
            user: this.props.store.user,
            id: this.props.id
        }
        if (info) {
            axios({
                method: 'put',
                url: '/comment',
                headers: {"content-type": "application/json"},
                data: data
            }).then(()=>{
                axios({
                    method: 'get',
                    url: '/content',
                    headers: {"content-type": "application/json"}
                }).then(res=> {
                    this.props.Posts(res.data);
                    this.Comment.value = null;
                })
            })
        }
    }
    render() {
        return (
                <div className={'commentAdding'}>
                    <form onSubmit={this.addComment}>
                        <input ref={input => this.Comment = input} type="text" placeholder={'Write a comment...'}/>
                        <button><MdSend/></button>
                    </form>
                </div>
        )
    }
}

export default connect(
    state => ({
        store: state.userStore,
        contentStore: state.Posts
    }),
    dispatch => ({
        Posts: (post) => {
            dispatch({type: 'GET_POSTS', payload: post})
        }
    })
)(Comment);