const initialState = {
    user: {},
    loggedIn: false
}

export default function userStore(state = initialState, action) {
    switch (action.type) {
        case 'LOGIN_USER':
            return {
                ...state,
                user: action.payload,
                loggedIn: true
            };
            break;

        case 'REGISTER_USER':
            console.log(action.payload);
            break;

        case 'LOGOUT_USER':
            return {
                ...state,
                user: {},
                loggedIn: false
            };
            break;
    }
    return state;
}