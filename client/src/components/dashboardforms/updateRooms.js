import React,{useState} from 'react';
import {connect} from 'react-redux';
import firebase from '../../firebase/firebase';
import {addRooms} from '../../actions/profile';

const UpdateRoom = ({addRooms}) => {
    const [formData, setFormData]= useState({
        price:'',
        ac:false,
        facilities:'',
        description:'',
        category:''
    });
    const [roomImages, setRoomImages] =useState(null);

    const {price, ac, facilities, description, category} = formData;

    const onChangeForText = (e) => {
        setFormData({
            ...formData, [e.target.name]:e.target.value
        })
    }

    const onChangeForFiles = (e) => {
        const xxx = [...e.target.files];
        setRoomImages(xxx);
    }

    const onSubmit = (e) => {
        let imageUrls = [];
        e.preventDefault();
        roomImages.map(image => {
            let bucketName = 'rooms';
            let file = image;
            let storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
            let uploadTask = storageRef.put(file);
            uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                () => {},
                () => {},
                () => {
                    uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl)=> {
                        if(downloadUrl !== null){
                            imageUrls = [...imageUrls, downloadUrl];

                            if(imageUrls.length === roomImages.length){
                                addRooms(formData, imageUrls);
                            }
                        }
                    })
                }
                )
        })
        // addRooms(formData);
    }
    return (
        <div >
            <div className="ui middle aligned center aligned grid">
            <div className="column"style={{backgroundColor:"#E5E4E4"}} >
                <h2 className="ui teal image header">
                <div className="content">
                    Set the room
                </div>
                </h2>
                <form className="ui large form" onSubmit={(e)=>onSubmit(e)}>
                <div className="ui stacked segment" style={{backgroundColor:"#E5E4E4"}}>
                    <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="price" placeholder="Set the new price"onChange={(e)=>onChangeForText(e)} value={price}/>
                    </div>
                    </div>

                    <div className="field">
                    
                        <h6 style={{color:"#30BBB2"}}>If room is a/c, then put tik</h6>
                        <input type="checkbox" name="ac" placeholder="Set the new ac"onChange={(e)=>{
                            setFormData({...formData, ac : !ac})
                        }} value={ac}/>
                    
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input type="text" name="facilities" placeholder="Set the facilities"onChange={(e)=>onChangeForText(e)} value={facilities}/>
                    </div>
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                    <i className="user icon"></i>
                        <input type="text" name="category" placeholder="Set the new category"onChange={(e)=>onChangeForText(e)} value={category}/>
                    </div>
                    </div>

                    <div className="field">
                    <input type="file" multiple="multiple" onChange={(e) => onChangeForFiles(e)}/>
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                        <textarea type="text" name="description" placeholder="Set the new description"onChange={(e)=>onChangeForText(e)} value={description}/>
                    </div>
                    </div>
                    
                    <input type="submit" className="ui fluid large teal submit button" value="Add the room" />
                    
                </div>

                <div className="ui error message"></div>

                </form>
            </div>
            </div>
        </div>
    )
}

export default connect(null, {addRooms})(UpdateRoom);