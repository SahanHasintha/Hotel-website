import React,{useState} from 'react';
import {connect} from 'react-redux';
import firebase from '../../firebase/firebase';
import {createProfile} from '../../actions/profile';
import {withRouter} from 'react-router-dom';

const ProfileCreate = ({createProfile, history}) => {
    const [profilePicture, setProfilePicture] = useState(null)
    const [formData, setFormData] = useState({
        name:'', 
        address:'', 
        popularcity:'', 
        todaybestoffer:'', 
        description:'',
        phonenumber:'',
    });
    const {name, 
        address, 
        popularcity, 
        todaybestoffer, 
        description,
        phonenumber,
    } = formData;
        
        const onChange = (e) => {
            setFormData({
                ...formData, [e.target.name]:e.target.value
            })
        }

        const onSubmit = (e) => {
            e.preventDefault();


            let bucketName = 'images';
            let file = profilePicture;
            let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
            let uploadTask = storageRef.put(file)
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {/*Upload in progress function*/},
            () => {/*handle unsuccessfullUploads*/},
            async () => {
                // handle upload complete.
                await uploadTask.snapshot.ref.getDownloadURL().then(async (downloadUrl)=>{
                    if(downloadUrl !== null){
                        createProfile(formData, downloadUrl, history);
                    }
                }
                )
            }
            )
            
            // e.preventDefault();
            // createProfile(formData);
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
                        <input type="file" name="profilepicture" placeholder="Set the new picture" onChange={(e)=>{
                            setProfilePicture(e.target.files[0])
                        }}/>
                    </div>
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="phonenumber" placeholder="Set the new phonenumber"onChange={(e)=>onChange(e)} value={phonenumber}/>
                    </div>
                    </div>
                    
                    <input type="submit" className="ui fluid large teal submit button" value="Create the profile" />
                    
                </div>

                <div className="ui error message"></div>

                </form>
            </div>
            </div>
        </div>
    )
}

export default connect(null, {createProfile})(withRouter(ProfileCreate));
