import {REGISTER_SUCCESS, REGISTER_ERROR,LOGIN_SUCCESS, LOGIN_FAIL} from '../actions/types';

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
            localStorage.removeItem('token');
            return {
                ...state,
                loading:false,
                token:null,
                isAuthenticated:false

            }
        default:
            return state;
    }
}