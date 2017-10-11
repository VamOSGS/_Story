import { Component } from 'react';
import React from 'react';
class CommentList extends Component {
    constructor(props) {
        super(props);
    }
    render() {
        return (
            <div className={'commentList'}>
                <ul>
                  { this.props.comments.map((item, i) =>
                      <li key={i}>
                          <div className={'user'}><p> <span className={'photo'}>{item.user.FirstName[0]}{item.user.LastName[0]}</span> {item.user.Username}</p></div>
                          <p>{item.comment}</p>
                      </li>)
                  }
                </ul>
            </div>
        )
    }
}

export default CommentList;