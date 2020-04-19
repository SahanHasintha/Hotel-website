import {REGISTER_SUCCESS, REGISTER_ERROR,LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED,AUTH_ERROR} from '../actions/types';

const initialState = {
    token:localStorage.getItem('token'),
    user:null,
    loading:true,
    isAuthenticated:false
}

export default (state =initialState ,action) => {
    const {type, payload} = action;

    switch(type){
        case REGISTER_SUCCESS:
        case LOGIN_SUCCESS:
            localStorage.setItem('token', payload.token)
            return {
                ...state,
                ...payload,
                loading:false,
                isAuthenticated:true,
            }
        case REGISTER_ERROR:
        case LOGIN_FAIL:
        case AUTH_ERROR:
            localStorage.removeItem('token');
            return {
                ...state,
                loading:false,
                token:null,
                isAuthenticated:false,
                user:null
            }
        case USER_LOADED:
            return {
                ...state,
                user:payload,
                isAuthenticated:true,
                loading:false
            }
    
        default:
            return state;
    }
}