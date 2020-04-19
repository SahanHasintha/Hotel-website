
import axios from 'axios';
import {ALL_PROFILES, GET_PROFILEBYID} from './types';

//! Get All profiles
export const allProfiles = () => async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile');
        dispatch({
            type:ALL_PROFILES,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message);

    }
}


//!Get profile by id 
export const getProfileById = (id) => async dispatch => {
    try {
        const res = await axios.get(`http://localhost:5000/api/profile/hotel/${id}`)

        dispatch({
            type:GET_PROFILEBYID,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message);
        
    }
}