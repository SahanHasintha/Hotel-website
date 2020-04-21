import React,{useState} from 'react';
import {connect} from 'react-redux';
import {createProfile} from '../../actions/profile';

const ProfileCreate = ({createProfile}) => {
    const [formData, setFormData] = useState({
        name:'', 
        address:'', 
        popularcity:'', 
        todaybestoffer:'', 
        description:'',
        phonenumber:''
    });
    const {name, 
        address, 
        popularcity, 
        todaybestoffer, 
        description,
        phonenumber} = formData;
        
        const onChange = (e) => {
            setFormData({
                ...formData, [e.target.name]:e.target.value
            })
        }

        const onSubmit = (e) => {
            e.preventDefault();
            createProfile(formData);
        }
    return (
        <div >
            <div className="ui middle aligned center aligned grid">
            <div className="column"style={{backgroundColor:"#E5E4E4"}} >
                <h2 className="ui teal image header">
                <div className="content">
                    Create your profile
                </div>
                </h2>
                <form className="ui large form" onSubmit={(e)=>onSubmit(e)}>
                <div className="ui stacked segment" style={{backgroundColor:"#E5E4E4"}}>
                    <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="name" placeholder="Set the new name"onChange={(e)=>onChange(e)} value={name}/>
                    </div>
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="address" placeholder="Set the new address"onChange={(e)=>onChange(e)} value={address}/>
                    </div>
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="popularcity" placeholder="Set the popularcity"onChange={(e)=>onChange(e)} value={popularcity}/>
                    </div>
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                    <i className="user icon"></i>
                        <input type="text" name="todaybestoffer" placeholder="Set the new todaybestoffer"onChange={(e)=>onChange(e)} value={todaybestoffer}/>
                    </div>
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                        <textarea type="text" name="description" placeholder="Set the new description"onChange={(e)=>onChange(e)} value={description}/>
                    </div>
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="phonenumber" placeholder="Set the new phonenumber"onChange={(e)=>onChange(e)} value={phonenumber}/>
                    </div>
                    </div>
                    
                    <input type="submit" className="ui fluid large teal submit button" value="Edit the profile" />
                    
                </div>

                <div className="ui error message"></div>

                </form>
            </div>
            </div>
        </div>
    )
}

export default connect(null, {createProfile})(ProfileCreate);
