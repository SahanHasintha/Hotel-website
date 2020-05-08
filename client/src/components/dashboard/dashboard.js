import React, {useState, useEffect} from 'react';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import firebase from '../../firebase/firebase';
import Spinner from '../layouts/loadingGif';
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
         loading  ? <Spinner/> : profile ===null ? <Link to="/create-profile" className="ui toggle button"/> :
         <div style={{display: 'flex',justifyContent:'center' }}>
         <div className="ui card" style={{alignSelf:'center',width:"60%", height:'auto'}}>
            <div className="image">
                <img src={profile.profilepicture}/>
                <input type="file" onChange={(e) => handleImageChange(e)}/>
                 <button onClick={()=>handleSave()}>Save</button>
            </div>
            <div className="content">
                <a className="header">{profile.name}</a>
                <div className="meta">
                <span className="date">Adress : {profile.address}</span>
                
                </div>
                <p className="date">Pupular city : {profile.popularcity}</p>
                <div className="description">
                    Description:
                    <div className="ui segment">
                        {profile.description}
                    </div>
                    Phone number:
                    <h5>{profile.phonenumber}</h5>
                </div>
            </div>
            <div className="extra content">
            
                <Link to="/update-profile" className="ui toggle button" style={{width:'100%', marginBottom:30}}>Edite Profile</Link>
                <Link to="/update-rooms" className="ui toggle button" style={{width:'49%', marginBottom:10}}>Add new Rooms</Link>
                <Link to="/my-rooms" className="ui toggle button" style={{width:'49%', marginBottom:10}}>Show my rooms</Link>
                <Link to="/update-restuarant" className="ui toggle button" style={{width:'49%', marginBottom:10}}>Add new Food for restuarant</Link>
                <Link to="/my-restuarant" className="ui toggle button" style={{width:'49%', marginBottom:10}}>Show my restuarant</Link>
                <Link to="/update-banquethall" className="ui toggle button" style={{width:'49%', marginBottom:10}}>Add new BanquetHall</Link>
                <Link to="/my-halls" className="ui toggle button" style={{width:'49%', marginBottom:10}}>Show my BanquetHall</Link>
                <Link to="/comments" className="ui toggle button" style={{width:'49%', marginBottom:10}}>Show All comments</Link>
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
