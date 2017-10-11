import { Component } from 'react';
import { connect } from 'react-redux';
import React from 'react';
import axios from 'axios';
class ColorPicker extends Component {
    constructor(props) {
        super(props);
        this.handleColor = this.handleColor.bind(this);
        this.state = {colors: ['#F7F7F7', '#F44336', '#CDDC39','#E91E63','#2196F3','#673AB7','#009688']}
    }
    handleColor(e,c,i) {
        Object.keys(this.refs).forEach((key) => {
            this.refs[key].classList.remove('selected');
        });
        this.refs[i].classList.add('selected');
        this.props.sendColor(c)
    }
    render() {
        return (
            <div>
                <ul>
                    {this.state.colors.map((color,i) => <li key={i} onClick={(e)=>this.handleColor(e, color, i)} ref={i} style={{backgroundColor: color}}></li>)}
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
        sendColor: (Color) => {
            dispatch({type: 'SELECT_COLOR', payload: Color})
        }
    })
)(ColorPicker);