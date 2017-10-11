import { Component } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import GoHeart from 'react-icons/lib/go/heart';
import axios from  'axios';

class Like extends Component {
    constructor(props) {
        super(props);
        this.handleLike = this.handleLike.bind(this);
        this.state = {
            active: false
        }
    }
    componentDidMount() {
        let checkUser = liked => {
            return liked.Username === this.props.store.user.Username;
        }
        let check = this.props.likeList.find(checkUser);
        if  (check !== undefined) {
            this.setState({active:true})
        }
    }
    handleLike() {
        let data = {
            user: this.props.store.user,
            likeList: this.props.likeList,
            id: this.props.id
        }

        let checkUser = liked => {
            return liked.Username === data.user.Username;
        }
        let check = data.likeList.find(checkUser);
        if  (check === undefined) {
            this.setState({
                active: true
            })
            axios({
                method: 'put',
                url: '/like',
                headers: {"content-type": "application/json"},
                data: data
            }).then(res => {
                axios({
                    method: 'get',
                    url: '/content',
                    headers: {"content-type": "application/json"}
                }).then(res=> {
                    this.props.Posts(res.data);
                })
            })
        } else {
            this.setState({
                active: false
            })
            let unLikeData = {
                id : this.props.id,
                user: this.props.store.user
            }
            axios({
                method: 'put',
                url: '/unlike',
                headers: {"content-type": "application/json"},
                data: unLikeData
            }).then(res => {
                axios({
                    method: 'get',
                    url: '/content',
                    headers: {"content-type": "application/json"}
                }).then(res=> {
                    this.props.Posts(res.data);
                })
            })
        }
    }
    render() {
        return (
            <GoHeart className={this.state.active ? 'green' : null} onClick={this.handleLike} />
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
)(Like);