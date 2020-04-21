import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {getMyProfile, editeProfile} from '../../actions/profile';

const UpdateProfile = ({profile:{profile,loading}, getMyProfile, editeProfile}) => {
    const [formData, setFormData]= useState({
        name:'',
        address:'',
        popularcity:'',
        todaybestoffer:'',
        description:'',
        phonenumber:''
    })
    const {name,
        address,
        popularcity,
        todaybestoffer,
        description,
        phonenumber}  = formData;


    useEffect(()=>{
        getMyProfile();

        setFormData({
            name: loading || !profile.name ? '' : profile.name,
            address: loading || !profile.address ? '' : profile.address,
            popularcity: loading || !profile.popularcity ? '' : profile.popularcity,
            todaybestoffer: loading || !profile.todaybestoffer ? '' : profile.todaybestoffer,
            description: loading || !profile.description ? '' : profile.description,
            phonenumber: loading || !profile.phonenumber ? '' : profile.phonenumber,
        })
        
    },[loading])

   

    const onChange = (e) => {
        setFormData({
            ...formData, [e.target.name]: e.target.value
        })
    }

    const onSubmit = () => {
        editeProfile(formData);
    }


    return (
        <div >
            <div className="ui middle aligned center aligned grid">
            <div className="column"style={{backgroundColor:"#E5E4E4"}} >
                <h2 className="ui teal image header">
                <div className="content">
                    Update your profile
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

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}
export default connect(mapStateToProps, {getMyProfile, editeProfile})(UpdateProfile);
