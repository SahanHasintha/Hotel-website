import React,{useState} from 'react';
import {connect} from 'react-redux';
import Resizer from 'react-image-file-resizer';
import firebase from '../../firebase/firebase'
import {addHalls} from '../../actions/profile';

const UpdateRoom = ({addHalls}) => {
    const [formData, setFormData] = useState({
        price:'',
        description:'',
        phonenumber:'',
        hallname:'',
        included:''
    });

    const [images, setImages] = useState([]);

    const {
        price, 
        description, 
        phonenumber, 
        hallname, 
        included} = formData;
    
    const onChange = (e) => {
        setFormData({
            ...formData, [e.target.name]:e.target.value
        })
    }
    
    const onChangeForImages = (e) => {
        const xxx = [...e.target.files]
        setImages(xxx);
        // let arr = [];
        // xxx.map(image =>{
        //     Resizer.imageFileResizer(
        //         image,
        //         300,
        //         300,
        //         'JPEG',
        //         100,
        //         0,
        //         uri => {
        //             arr = [...arr, uri]
        //             console.log(uri)
        //             if(arr.length === xxx.length){
        //                 setImages(arr);
        //             }
        //         },
        //         'base64'
        //     )
        // } )
        
    }

    // const onSubmit = (e) => {
    //     e.preventDefault();
    //     addHalls(formData, images)
    // }

    const onSubmit =(e) => {
        e.preventDefault();
        let urls = [];
        if(images.length !== 0){
            images.map(image => {
                const bucketName = 'halls';
                const file = image;
                const storageRef = firebase.storage().ref(`${bucketName}/${file.name}`);
                const uploadTask = storageRef.put(image);
                uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                    () => {},
                    () => {},
                    () => { 
                        uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl)=>{
                            if(downloadUrl !== null){
                                console.log(downloadUrl);
                                urls = [...urls , downloadUrl];
                                if(images.length === urls.length){
                                    addHalls(formData, urls)
                                }
                            }
                        })
                    }
                    )
            })
        }else {

        }
        
    }
    return (
        <div >
            <div className="ui middle aligned center aligned grid">
            <div className="column"style={{backgroundColor:"#E5E4E4"}} >
                <h2 className="ui teal image header">
                <div className="content">
                    Set the Wedding halls
                </div>
                </h2>
                <form className="ui large form" onSubmit={(e) => onSubmit(e)}>
                <div className="ui stacked segment" style={{backgroundColor:"#E5E4E4"}}>
                    <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input 
                            type="text" 
                            name="hallname" 
                            placeholder="Set the hall name" 
                            value={hallname}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                        <i className="user icon"></i>
                        <input 
                            type="text" 
                            name="price" 
                            placeholder="Set the price" 
                            value={price}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                        <i className="phone icon"></i>
                        <input 
                            type="text" 
                            name="phonenumber" 
                            placeholder="Contact number" 
                            value={phonenumber}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                        <textarea 
                            type="text" 
                            name="description" 
                            placeholder="Set the new description" 
                            value={description}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    </div>

                    <div className="field">
                    <input 
                        type="file"
                        multiple="multiple" 
                        onChange={(e)=> onChangeForImages(e)}
                    />
                    </div>

                    <div className="field">
                    <div className="ui left icon input">
                        <textarea 
                            type="text" 
                            name="included" 
                            placeholder="Set the new included" 
                            value={included}
                            onChange={(e) => onChange(e)}
                        />
                    </div>
                    </div>
                    
                    <input 
                        type="submit" 
                        className="ui fluid large teal submit button" 
                        value="Add the hall" 
                    />
                    
                </div>

                <div className="ui error message"></div>

                </form>
            </div>
            </div>
        </div>
    )
}

export default connect(null, {addHalls})(UpdateRoom);