import React,{useState} from 'react';
import {connect} from 'react-redux';
import {DeleteRoom} from '../../../actions/profile';
import firebase from '../../../firebase/firebase';
import {roomsImages} from '../../../actions/profile';

const MyRoomItem = ({rooms, DeleteRoom, roomsImages, profile:{profile, loading}}) => {
    let [images , setImages] = useState(null)
    const onChange =(e) => {
        const files = e.target.files;
        const xxx = [...files];
        setImages(xxx);
    }
    
    const handleSave = async (roomId) => {
        let imgUrls = [];
        await images.map(image => {
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

        })
        
    }
    return (
        <div className="ui  divided items">
            {rooms.map(room => <div className="item" key={room._id}>
            <div className="ui small image">
                {room.images !== 0 ? <img src={room.images[0]} alt=""/>: <img src="" alt=""/>}
                
            </div>
            <div className="content">
                <h5 className="header">{room.price}</h5>
                <div className="meta">
                    <span>{room.facilities}</span>
                </div>
                <div className="extra">
                    {room.category} 
                    <button className="ui right floated red button" onClick={()=>{DeleteRoom(room._id)}}>
                        Delete
                    </button>
                    <div className="ui right floated">
                        <input type="file" multiple="multiple" onChange={(e) => onChange(e)}/>
                        <button className="ui primary button" onClick={(e)=>handleSave(room._id)}>
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
export default connect(mapStateToProps, {DeleteRoom, roomsImages})(MyRoomItem);