import React,{useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {DeleteRoom} from '../../../actions/profile';
import firebase from '../../../firebase/firebase';
import {roomsImages} from '../../../actions/profile';
import {setAlert} from '../../../actions/alert';

const MyRoomItem = ({rooms, DeleteRoom, roomsImages, profile:{profile, loading}, history, setAlert}) => {
    let [images , setImages] = useState(null)
    const onChange =(e) => {
        const files = e.target.files;
        const xxx = [...files];
        setImages(xxx);
    }
    
    const handleSave = async (e, roomId , imagesLength) => {
        e.preventDefault();
        let imgUrls = [];
        
            await images.map(image => {
                if(imagesLength < 7){
                    let bucketName = 'rooms';
                    let file = image;
                    let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
                    let uploadTask = storageRef.put(file);
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot) => {
                            const percentage = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                            console.log(percentage);
                        },
                        () => {
                            
                        },
                        async () => {
                        await uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl)=>{
                                if(downloadUrl !== null){
                                    imgUrls = [...imgUrls, downloadUrl];
                                    if(imgUrls.length === images.length){
                                        console.log('equal');
                                        roomsImages(imgUrls, roomId);
                                    }
                                    
                                }
                            })
                        }
        
                    )
                }else{
                    setAlert('You cannot add more than 6 images for one room', 'red');
                }
            })
        
        
        
        
    }
    return (
        <div className="ui  divided items">
            {rooms.map(room => <div className="item" key={room._id}>
            <div className="ui small image">
                {room.images.length !== 0 ? <img src={room.images[0]} alt=""/>: <img src="" alt=""/>}
                
            </div>
            <div className="content">
                <h5 className="header">{room.price}</h5>
                <div className="meta">
                    <span>{room.facilities}</span>
                </div>
                <div className="extra">
                    {room.category} 
                    <button className="ui right floated red button" onClick={()=>{DeleteRoom(room._id, history)}}>
                        Delete
                    </button>
                    <div className="ui right floated">
                        <input type="file" multiple="multiple" onChange={(e) => onChange(e)}/>
                        <button className="ui primary button" onClick={(e)=>handleSave(e ,room._id,room.images.length)}>
                            Save the photoes
                        </button>
                    </div>
                    
                </div>

            </div>
            
        </div>)}
    </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}
export default connect(mapStateToProps, {DeleteRoom, roomsImages, setAlert})(withRouter(MyRoomItem));