import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_SUCCESS, LOGIN_FAIL, USER_LOADED, AUTH_ERROR} from './types';
import {setAlert} from './alert';
import setAuthToken from '../utils/setAuthToken';


//!Load the user
export const loadUser = () =>async (dispatch) => {
    if(localStorage.token){
        setAuthToken(localStorage.token);
    }

    try {
        const res = await axios.get('http://localhost:5000/api/auth');

        dispatch({
            type:USER_LOADED,
            payload:res.data
        });

    } catch (err) {
        console.log(err.message);
        dispatch({
            type:AUTH_ERROR
        })
    }
}


//!User register action
export const userRegister = (formData)=>async (dispatch)=>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify(formData);

    try {
        const res = await axios.post('http://localhost:5000/api/user' , body, config);

        dispatch({
            type:REGISTER_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser());
        dispatch(setAlert('User register success', 'green'));
    } catch (err) {
        const errors = err.response.data.errors;

        if(errors){
            errors.map(error=> dispatch(setAlert(error.msg, 'red')));
        }
        console.log(err.message);
        dispatch({
            type:REGISTER_ERROR
        })
    }
}


//!User login action
export const userLogin = (formData) =>async (dispatch) =>{
    const config={
        headers:{
            'Content-Type':'application/json'
        }
    }

    const body = JSON.stringify(formData)
    try {
        const res = await axios.post('http://localhost:5000/api/auth', body, config);
        dispatch({
            type:LOGIN_SUCCESS,
            payload:res.data
        })
        dispatch(loadUser());
        dispatch(setAlert('Login success','green'))
    } catch (err) {
        const errors = err.response.data.errors;
        if(errors){
            errors.map(error => dispatch(setAlert(error.msg, 'red')));
        }
        console.log(err.message);
        dispatch({
            type:LOGIN_FAIL
        })
    }
}


//!user logout
export const logout = () => (dispatch) => {
    dispatch({
        type:LOGIN_FAIL
    });
    // dispatch({
    //     type:CLEAR_PROFILE
    // });
}