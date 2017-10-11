import { Component } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import axios from 'axios';
import Comment from './Comment.jsx';
import Like from './Like.jsx';
import CommentList from "./CommentList.jsx";


class PostAdding extends Component {
    constructor(props) {
        super(props);
        this.likeCheck = this.likeCheck.bind(this);
    }
    componentWillMount() {
        axios({
            method: 'get',
            url: '/content',
            "headers": {"content-type": "application/json"}
        }).then(res=> {
            this.props.Posts(res.data);
        })
    }
    likeCheck() {
        let checkUser = liked => {
            return liked.Username === data.user.Username;
        }
        let check = data.likeList.find(checkUser);
    }
    render() {

        return (
            <div className={'List'}>
                <ul>
                    {this.props.contentStore.posts.map((post,i)=> <li style={{borderBottom: `5px solid ${post.Color}`}} key={i}>
                        <div style={{backgroundColor: post.Color }} className={'flex'}>
                            <div className={'user'}><p> <span className={'photo'}>{post.User.FirstName[0]}{post.User.LastName[0]}</span> {post.User.Username}</p></div>
                            <div className={'content'}><h1>{post.Title}</h1><h2>{post.Text}</h2></div>
                            <div><p>{post.Date}</p></div>
                        </div>
                        <div className={post.Like.length > 0 ? 'Like active' : 'Like' }>
                            <Like likeList={post.Like} id={post._id} />
                            <div>
                                <h6>Nobody likes this</h6>
                                <p>{post.Like.length} Likes this </p>
                                <ul>{post.Like.map((item, i) => <li key={i}>{item.Username}</li>)}</ul>
                            </div>
                        </div>
                        <div className={'comment-cont'} >
                            <CommentList comments={post.Comments}/>
                            <Comment id={post._id} />
                        </div>
                    </li>)}
                </ul>
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
        Posts: (posts) => {
            dispatch({type: 'GET_POSTS', payload: posts})
        }
    })
)(PostAdding);