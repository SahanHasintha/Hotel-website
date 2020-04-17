import React, {Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {userRegister} from '../../actions/auth';
import {setAlert} from '../../actions/alert';

const RegisterUser = ({userRegister, setAlert}) => {
    const [formData, setFormData]= useState({
        name:'',
        email:'',
        password:''
    });
    const {name, email, password, password2}= formData;

    const onChange= (e)=>{
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(password !== password2){
            setAlert('Password does not match','red');
        }else{
            userRegister({name, email, password});
            
        }
        // password === password2 ? 
        // userRegister({name, email, password}) : 
        // setAlert('Password does not match','red');
        
    }

    return (
        <Fragment>
            <h1 style={{color:'#427DD2'}}>Register User</h1>
            <form className="ui form" onSubmit={(e)=>onSubmit(e)}>
                <div className="field">
                    <label>Name</label>
                    <input type="text" name="name" placeholder="Name" onChange={(e)=>onChange(e)} value={name}/>
                </div>
                <div className="field">
                    <label>Email</label>
                    <input type="email" name="email" placeholder="Email"onChange={(e)=>onChange(e)} value={email}/>
                </div>
                <div className="field">
                    <label>Password</label>
                    <input type="text" name="password" placeholder="Password"onChange={(e)=>onChange(e)} value={password}/>
                </div>
                <div className="field">
                    <label>Confirm password</label>
                    <input type="text" name="password2" placeholder="Conform password"onChange={(e)=>onChange(e)} value={password2}/>
                </div>
                <input type="submit" className="ui primary button" value="Register" />
            </form>
        </Fragment>
    )
}

export default connect(null, {userRegister, setAlert})(RegisterUser);
