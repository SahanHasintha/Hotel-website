
import axios from 'axios';
import {ALL_PROFILES, GET_PROFILEBYID, PROPIC_UPLOADED, GET_PROFILE, PROFILE_ERROR, DELETE_ROOM} from './types';
import {setAlert} from './alert';

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
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}

//!Create profile
export const createProfile = (formdata, url)=> async dispatch => {

    const obj = {
        ...formdata, profilepicture:url
    }
    const config= {
        headers : {
            "Content-Type":"application/json"
        }
    }
    const body = JSON.stringify(obj);
    try {
        const res = await axios.post('http://localhost:5000/api/profile', body , config);

        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

        dispatch(setAlert('Profile created', 'green'))
    } catch (err) {
        console.log(err.message);
        const errors = err.response.data.errors;
        if(errors){
            errors.map(error => dispatch(setAlert(error.msg, 'red')));
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}

//!Edit profile
export const editeProfile = (formdata) => async dispatch => {
    const config = {
        headers : {
            "Content-Type": "application/json"
        }
    }

    const body = JSON.stringify(formdata)
    try {
        const res = await axios.put('http://localhost:5000/api/profile/edit-profile', body, config)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Profile edited', 'green'));
    } catch (err) {
        console.log(err.message);
        const errors = err.response.data.errors;
        if(errors){
            errors.map(err=>dispatch(setAlert(err.msg, 'red')))
        }
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
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
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}

//! Get my profile
export const getMyProfile = () =>async (dispatch) => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile/myProfile');
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}

//!Change profile picture
export const profilePictureUpload = (url) => async (dispatch) => {
    try {
        const config ={
            headers:{
                "Content-Type":"application/json"
            }
        }
        const obj = {
            profilePictureUrl:url
        };

        const body = JSON.stringify(obj)
        const res = await axios.put('http://localhost:5000/api/profile/profilepicture', body , config);

        dispatch({
            type:PROPIC_UPLOADED,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
    
}

//!Add the rooms
export const addRooms = (formdata , imageUrls) => async dispatch => {

    const obj ={...formdata, images:imageUrls}
    const config = { 
        headers :{
            "Content-Type":"application/json"
        }
    }
    
    try {
        const res = await axios.put('http://localhost:5000/api/profile/rooms', obj, config);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        });
        dispatch(setAlert('Room added', 'green'));
    } catch (err) {
        console.log(err.message);
        const errors = err.response.data.errors;

        if(errors){
            errors.map(error=> dispatch(setAlert(error.msg, 'red')));
        }

        dispatch({
            type:PROFILE_ERROR,
            payload: {msg: err.response.statusText, status:err.response.status}
        })
    }
}

//!Delete the room
export const DeleteRoom = (roomId) =>async (dispatch) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/rooms/${roomId}`);
        dispatch({
            type:DELETE_ROOM,
            payload:res.data
        });
        dispatch(setAlert('Room removed', 'green'))
    } catch (err) {
        console.log(err.message)
        dispatch(setAlert('Room not removed', 'red'))
    }
}


//!Add more images to room
export const roomsImages = (urls, roomId) =>async (dispatch) =>{
    // const obj = { ...urls};
    // console.log(obj);
    // console.log(roomId);
    
    try {
        const res = await axios.put(`http://localhost:5000/api/profile/rooms/${roomId}`, urls);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type:PROFILE_ERROR
        })
    }
}