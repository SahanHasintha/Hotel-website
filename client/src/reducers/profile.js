import {
    ALL_PROFILES,
    GET_PROFILEBYID, 
    PROPIC_UPLOADED, 
    GET_PROFILE, 
    PROFILE_ERROR,
    DELETE_ROOM,
    GET_ROOMS
} from '../actions/types';

const initialState = {
    profiles:[],
    profile:null,
    loading:true,
    error:{}
};

export default (state=initialState, action) => {
    const {type, payload} = action;
    switch(type){
        case GET_ROOMS:
            state.profile.rooms = payload.rooms;
            return state;
        case ALL_PROFILES:
            return {
                ...state,
                profiles:payload,
                loading:false
            }
        case GET_PROFILEBYID:
        case PROPIC_UPLOADED:
        case GET_PROFILE:
        case DELETE_ROOM:
            return {
                ...state,
                profile:payload,
                loading:false
            }
        case PROFILE_ERROR:
            return{
                ...state,
                error:action.payload,
                loading: false
            }
        default:
            return state;
    }
}
