import React,{Fragment, useState} from 'react';
import {connect} from 'react-redux';
import {userLogin} from '../../actions/auth';


const LoginUser = ({userLogin}) => {
    const [formData, setFormData]= useState({
        email:'',
        password:''
    });

    const {email, password} = formData;

    const onChange = (e) => {
        setFormData({
            ...formData, [e.target.name]:e.target.value
        })
    }

    const onSubmit = (e) => {
        e.preventDefault();
        userLogin(formData);
    }
    return (
        <div>
                <Fragment>
                    <h1 style={{color:'#427DD2'}}>Login User</h1>
                    <form className="ui form" onSubmit={(e)=>onSubmit(e)}>
                        
                        <div className="field">
                            <label>Email</label>
                            <input type="email" name="email" placeholder="Email"onChange={(e)=>onChange(e)} value={email}/>
                        </div>
                        <div className="field">
                            <label>Password</label>
                            <input type="text" name="password" placeholder="Password"onChange={(e)=>onChange(e)} value={password}/>
                        </div>
                        <input type="submit" className="ui primary button" value="Register" />
                    </form>
                </Fragment>
        </div>
    )
}

export default connect(null, {userLogin})(LoginUser);
