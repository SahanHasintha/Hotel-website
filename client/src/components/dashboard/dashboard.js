import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import firebase from '../../firebase/firebase';
import {profilePictureUpload, getMyProfile} from '../../actions/profile';

const Dashboard = ({profilePictureUpload, getMyProfile , profile:{profile , loading}}) => {
    const [image, setImage]= useState({img:null});

    const {img} = image;

    useEffect(()=>{
        getMyProfile()
    },[getMyProfile])

    const handleImageChange = (e) => {
        setImage({img: e.target.files[0]});
    }

    const handleSave = () => {
        if(img !== null){
            let bucketName = 'images';
            let file = img;
            let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`)
            let uploadTask = storageRef.put(file)
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
            () => {/*Upload in progress function*/},
            () => {/*handle unsuccessfullUploads*/},
            () => {
                // handle upload complete.
                uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl)=>{
                    if(downloadUrl !== null){
                        console.log(downloadUrl); 
                        profilePictureUpload(downloadUrl);
                    }
                }) 
            }
            )
        }
    }

    return (
        profile===null ? <div>
            <Link to="/create-profile" className="ui toggle button">Create Profile</Link>
        </div> :
        <div>
            {profile !== null && 
            <div>
            <h1>{profile.name}</h1>
            <img 
                style={{borderStyle:'solid'}}
                className="ui medium circular image" 
                src={profile.profilepicture} alt=""
            />
            </div>}
            <input type="file" onChange={(e) => handleImageChange(e)}/>
            <button onClick={()=>handleSave()}>Save</button>
            <div className="ui grid" style={{marginTop:"50px"}}>
                <div className="four wide column">
                    <Link to="/update-profile" className="ui toggle button">Edite Profile</Link>
                </div>
                <div className="four wide column">
                    <Link to="/update-rooms" className="ui toggle button">Add new Rooms</Link>
                </div>
                <div className="four wide column">
                    <Link to="/update-restuarant" className="ui toggle button">Add new Food for restuarant</Link>
                </div>
                <div className="four wide column">
                    <Link to="/update-banquethall" className="ui toggle button">Add new BanquetHall</Link>
                </div>
                <div className="four wide column">
                    <Link to="/my-rooms" className="ui toggle button">Show my rooms</Link>
                </div>
                <div className="four wide column">
                    <Link to="/my-restuarant" className="ui toggle button">Show my restuarant</Link>
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
export default connect(mapStateToProps, {profilePictureUpload, getMyProfile})(Dashboard);
