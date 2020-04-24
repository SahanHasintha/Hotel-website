import React, {useState} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
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
                        <input type="text" name="name" placeholder="Name" onChange={(e)=>onChange(e)} value={name}/>
                    </div>
                </div>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="email" name="email" placeholder="Email"onChange={(e)=>onChange(e)} value={email}/>
                    </div>
                </div>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input type="password" name="password" placeholder="Password"onChange={(e)=>onChange(e)} value={password}/>
                    </div>
                </div>
                <div className="field">
                    <div className="ui left icon input">
                        <i className="lock icon"></i>
                        <input type="password" name="password2" placeholder="Conform password"onChange={(e)=>onChange(e)} value={password2}/>
                    </div>
                </div>
                
                <input type="submit" className="ui fluid large teal submit button" value="Login" />
                
            </div>

            <div className="ui error message"></div>

            </form>

            <div className="ui message" style={{backgroundColor:"#E5E4E4"}}>
            before are you login ? <Link to="/login">Login</Link>
            </div>
        </div>
        </div>
    </div>
    )
}

export default connect(null, {userRegister, setAlert})(RegisterUser);
