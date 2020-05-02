import React,{useState} from 'react';
import {connect} from 'react-redux';
import firebase from '../../firebase/firebase';
import {addFoods} from '../../actions/profile';
import {setAlert} from '../../actions/alert';

const UpdateRestuarant = ({addFoods, setAlert}) => {
    const [formData, setFormData] = useState({
        foodname:'',
        price:'',
        description:''
    });

    const [images, setImages] = useState([]);
    const {foodname,price,description} = formData;

    const onChange = (e) => {
        setFormData({
            ...formData, [e.target.name]:e.target.value
        });
    }

    const onChangeForImages = (e) => {
        const xxx = [...e.target.files];
        setImages([...xxx]);
    }

    const onSubmit = (e) => {
        if(images.length === 0){
            setAlert('You dont select images yet', 'red');
        }
        let urls = [];
        e.preventDefault();
        images.map(image => {
            let bucketName = 'foods';
            let file = image;
            let storageRef =  firebase.storage().ref(`${bucketName}/${file.name}`);
            let uploadTasks = storageRef.put(file);
            uploadTasks.on(firebase.storage.TaskEvent.STATE_CHANGED,
                (snapshot) => {
                    const percentage = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                    console.log(percentage);
                },
                (err) => {
                    console.log(err.message)
                },
                () => {
                    uploadTasks.snapshot.ref.getDownloadURL().then((downloadUrl => {
                        if(downloadUrl !== null){
                            urls = [...urls , downloadUrl]

                            if(urls.length === images.length){
                                addFoods(formData, urls)
                            }
                        }
                    }))
                }
                )
        })
    }


    return (
        <div >
            <div className="ui middle aligned center aligned grid">
            <div className="column"style={{backgroundColor:"#E5E4E4"}} >
                <h2 className="ui teal image header">
                <div className="content">
                    Add Foods for restuarant
                </div>
                </h2>
                <form className="ui large form" onSubmit={(e) => onSubmit(e)}>
                <div className="ui stacked segment" style={{backgroundColor:"#E5E4E4"}}>

                    <div className="field">
                        <div className="ui left icon input">
                            <input type="text" name="foodname" placeholder="Enter the foodname" onChange={(e)=> onChange(e)} value={foodname}/>
                        </div>
                    </div>

                    <div className="field">
                        <div className="ui left icon input">
                            <input type="text" name="price" placeholder="Enter the price" onChange={(e)=> onChange(e)} value={price}/>
                        </div>
                    </div>

                    <div className="field">
                        <input type="file" multiple="multiple" onChange={(e)=> onChangeForImages(e)}/>
                    </div>

                    <div className="field">
                        <div className="ui left icon input">
                            <textarea type="text" name="description" placeholder="description" onChange={(e)=> onChange(e)} value={description}/>
                        </div>
                    </div>

                    <input type="submit" className="ui fluid large teal submit button" value="Login" />
                    
                </div>

                <div className="ui error message"></div>

                </form>

            </div>
            </div>
        </div>
    )
}

export default connect(null, {addFoods, setAlert})(UpdateRestuarant);
