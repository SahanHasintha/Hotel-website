import React,{useState} from 'react';
import {connect} from 'react-redux';
import {userLogin} from '../../actions/auth';
import {Link} from 'react-router-dom';


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
        <div >
            <div className="ui middle aligned center aligned grid">
            <div className="column"style={{backgroundColor:"#E5E4E4"}} >
                <h2 className="ui teal image header">
                <div className="content">
                    Log-in to your account
                </div>
                </h2>
                <form className="ui large form" onSubmit={(e)=>onSubmit(e)}>
                <div className="ui stacked segment" style={{backgroundColor:"#E5E4E4"}}>
                    <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="email" placeholder="E-mail address"onChange={(e)=>onChange(e)} value={email}/>
                    </div>
                    </div>
                    <div className="field">
                    <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input type="password" name="password" placeholder="Password" onChange={(e)=>onChange(e)} value={password}/>
                    </div>
                    </div>
                    <input type="submit" className="ui fluid large teal submit button" value="Login" />
                    
                </div>

                <div className="ui error message"></div>

                </form>

                <div className="ui message" style={{backgroundColor:"#E5E4E4"}}>
                New to us? <Link to="/register">Sign Up</Link>
                </div>
            </div>
            </div>
        </div>
    )
}

export default connect(null, {userLogin})(LoginUser);
