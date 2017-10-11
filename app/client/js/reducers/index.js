import { combineReducers } from 'redux';
import userStore from './userStore';
import Posts from './Posts';

export  default combineReducers(
    {
        userStore,
        Posts
    }
)