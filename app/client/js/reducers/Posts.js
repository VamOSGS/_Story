const initialState = {
    posts: [],
    color: null,
    comment : null
}

export default function userStore(state = initialState, action) {
    switch (action.type) {
        case 'GET_POSTS':
            return {...state, posts: action.payload}
            break;
        case 'RETURN_POSTS': {
            return state;
        }
        case 'SELECT_COLOR':
            return {...state, color: action.payload}
            break;
        case 'ADD_COMMENT':
            return {...state, comment: action.payload}
            break;
    }
    return state;
}