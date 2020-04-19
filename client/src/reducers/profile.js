import {ALL_PROFILES,GET_PROFILEBYID} from '../actions/types';

const initialState = {
    profiles:[],
    profile:null,
    loading:true,
};

export default (state=initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case ALL_PROFILES:
            return {
                ...state,
                profiles:payload,
                loading:false
            }
        case GET_PROFILEBYID:
            return {
                ...state,
                profile:payload,
                loading:false
            }
        default:
            return state;
    }
}
