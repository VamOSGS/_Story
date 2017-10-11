import { Component } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import MdSend from 'react-icons/lib/md/send';
import ColorPicker from './ColorPicker.jsx';
import axios from 'axios';
class PostAdding extends Component {
    constructor(props) {
        super(props);
        this.Post = this.Post.bind(this);
        this.valChange = this.valChange.bind(this);
        this.state = {
            valid: false
        }
    }
    Post(e) {
        e.preventDefault();
        let d = new Date();
        let content = {
            User: this.props.store.user,
            Title: this.Title.value,
            Text: this.Text.value,
            Comments: [],
            Like: [],
            Color: this.props.contentStore.color,
            Date: d.toDateString()
        }
        if (content.Title && content.Color) {
            axios ({
                method: 'post',
                url: '/content',
                headers: {"content-type": "application/json"},
                data : content
            }).then(res => {
                console.log(res);
                axios({
                    method: 'get',
                    url: '/content',
                    "headers": {"content-type": "application/json"}
                }).then(res=> {
                    this.props.Posts(res.data);
                })
                this.Title.value = null,
                this.Text.value = null
            })
        } else {
            this.setState({
                valid: true
            })
        }
    }
    valChange() {
        this.setState({
            valid: false
        })
    }

    render() {

        return (
            <div className={this.state.valid ? 'Forms notValid' : 'Forms'}>
                <h1>What's on your mind, {this.props.store.user.FirstName}?</h1>
                {this.state.valid ?  <h2 onClick={this.valChange}>This fileds <strong>required</strong></h2> : null}
                <div className={'inputs'}>
                    <form id={'Post'} onSubmit={this.Post}>
                        <input onChange={this.valChange} ref={input => this.Title = input} type="text" placeholder={'Title'}/>
                    </form>
                    <textarea ref={input => this.Text = input} form ="Post" placeholder={'Text'} ></textarea>
                </div>
                <div className={'settings'}>
                    <ColorPicker/>
                    {/*<input type="file"/>*/}
                    <button onClick={this.Post}><MdSend/></button>
                </div>
            </div>
        )
    }
}

export default connect(
    state => ({
        store: state.userStore,
        contentStore: state.Posts
    }),dispatch => ({
    Posts: (posts) => {
        dispatch({type: 'GET_POSTS', payload: posts})
    }
})
)(PostAdding);