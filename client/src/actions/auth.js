import axios from 'axios';
import {REGISTER_SUCCESS, REGISTER_ERROR, LOGIN_SUCCESS, LOGIN_FAIL} from './types';
import {setAlert} from './alert';

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