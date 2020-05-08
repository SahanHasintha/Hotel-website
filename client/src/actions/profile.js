
import axios from 'axios';
import {
    ALL_PROFILES, 
    GET_PROFILEBYID, 
    PROPIC_UPLOADED, 
    GET_PROFILE, 
    PROFILE_ERROR, 
    DELETE_ROOM,
    GET_ROOMS
} from './types';
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
export const createProfile = (formdata, url, history)=> async dispatch => {

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

        dispatch(setAlert('Profile created', 'green'));
        history.push('/dashboard');
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
export const addRooms = (formdata , imageUrls, history) => async dispatch => {

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

        history.push('/dashboard')
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
export const DeleteRoom = (roomId, history) =>async (dispatch) => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/rooms/${roomId}`);
        dispatch({
            type:DELETE_ROOM,
            payload:res.data
        });
        dispatch(setAlert('Room removed', 'green'));
        history.push('/dashboard');
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

//!Get the room by token
export const getMyRooms = () =>async dispatch => {
    try {
        const res = await axios.get('http://localhost:5000/api/profile/rooms/my-rooms');
        dispatch({
            type:GET_ROOMS,
            payload:res.data
        })
    } catch (err) {
        console.log(err.message);
        dispatch({
            type:PROFILE_ERROR
        })
    }
}

//!Add food for restuarant
export const addFoods = (formData , urls) => async dispatch => {
    const obj ={
        ...formData,
        foodImages: urls
    };

    console.log(obj);
    try {
        const res = await axios.put('http://localhost:5000/api/profile/restuarant', obj );
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })

        dispatch(setAlert("Food added for restuarant", "green"))
    } catch (err) {
        console.log(err.message);
        const errors = err.response.data.errors;
        console.log(errors);
        if(errors){
            errors.map(error => dispatch(setAlert(error.msg , 'red')))
        }
        dispatch({
            type : PROFILE_ERROR
        })
    }
}

//!Delete food from restuarant
export const DeleteRestuarant = (id, history) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/restuarant/${id}`);
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })
        dispatch(setAlert('Food removed', 'green'))
        history.push('/dashboard')
    } catch (err) {
        console.log(err.message);
        dispatch(setAlert('Room not removed', 'red'))
    }
}

//!Add more images for resturant
export const addFoodImages = (urls, foodId) =>async (dispatch) => {
    try {
        const res = await axios.put(`http://localhost:5000/api/profile/foods/${foodId}`, urls);
        
    } catch (err) {
        console.log(err.message);
        dispatch({
            type:PROFILE_ERROR
        })
    }
} 

//!Add wedding hall to profile
export const addHalls = (formData, urls) =>async (dispatch) => {

    const config = {
        headers:{
            "Content-type":"application/json"
        }
    }
    
    const obj = {
        ...formData,
        hallimages:urls
    }

    try {
        const res = await axios.put('http://localhost:5000/api/profile/weddinghalls', obj ,config);

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

//!Delete the wedding hall
export const removeBanquetHall = (hallId)=> async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/weddinghalls/${hallId}`)
        dispatch({
            type:GET_PROFILE,
            payload:res.data
        })        
    } catch (err) {
        dispatch({
            type:PROFILE_ERROR
        })
    }
}


//!Add comment
export const AddComment = (comment, id) => async dispatch => {
    const config ={
        headers:{
            "Content-type":"application/json"
        }
    }
    const obj = {
        text:comment
    }
    try {
        const res = await axios.put(`http://localhost:5000/api/profile/comment/${id}`, obj, config)
        console.log(res.data);
    } catch (err) {
        console.log(err.message);
        dispatch({
            type:PROFILE_ERROR
        })
    }
}

//!Remove comment
export const removeComment = (id) => async dispatch => {
    try {
        const res = await axios.delete(`http://localhost:5000/api/profile/comment/remove/${id}`)
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