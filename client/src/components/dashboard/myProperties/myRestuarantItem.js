import React,{useState} from 'react';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {DeleteRestuarant} from '../../../actions/profile';
import firebase from '../../../firebase/firebase';
import {addFoodImages} from '../../../actions/profile';
import {setAlert} from '../../../actions/alert';

export const MyRestuarantItem = ({restuarant, DeleteRestuarant, history,addFoodImages, setAlert}) => {
    const [images, setImages] = useState([])

    const onChange =(e) => {
        let imgs = [];
        imgs = [...e.target.files]
        setImages(imgs);
    }

    const handleSave = (e, foodId , imagesLength) => {
        e.preventDefault();
        let imageUrls = [];
        
            images.map(image => {
                if(imagesLength < 7){
                    let bucket = 'foods';
                    let file = image;
                    let storageRef = firebase.storage().ref(`${bucket}/${file.name}`);
                    let uploadTask = storageRef.put(file);
                    uploadTask.on(firebase.storage.TaskEvent.STATE_CHANGED,
                        (snapshot)=> {
                            const percentage = Math.round((snapshot.bytesTransferred/snapshot.totalBytes)*100);
                            console.log(percentage);
                        },
                        (err) => { console.log(err)},
                        async () => {
                            uploadTask.snapshot.ref.getDownloadURL().then((downloadUrl)=>{
                                if(downloadUrl!==null){
                                    console.log(downloadUrl);
                                    imageUrls = [...imageUrls, downloadUrl];
                                    if(imageUrls.length === images.length){
                                        addFoodImages(imageUrls, foodId);
                                    }
                                }
                            })
                        }
                        )
                }else{
                    setAlert('You cannot add anymore 6 images for one food', 'red');
                }
    
            })
        
        
    }

    return (
        <div className="ui  divided items">
            {restuarant.map(food => 
            <div className="item" key={food._id}>
                <div className="ui small image">
                    {food.foodImages.length !== 0 ? <img src={food.foodImages[0]} alt=""/>: <img src="" alt=""/>}
                    
                </div>
                <div className="content">
                    <h5 className="header">{food.price}</h5>
                    <div className="meta">
                        <span>{food.foodname}</span>
                    </div>
                    <div className="extra">
                        {food.description} 
                        <button className="ui right floated red button" onClick={()=> DeleteRestuarant(food._id, history)}>
                            Delete
                        </button>
                        <div className="ui right floated">
                            <input type="file" multiple="multiple" onChange={(e) => onChange(e)}/>
                            <button className="ui primary button" onClick={(e) => handleSave(e, food._id , food.foodImages.length)}>
                                Save the photoes
                            </button>
                        </div>
                        
                    </div>

                </div>
            
            </div>
        )}
        </div>
    )
}

export default connect(null , {
        DeleteRestuarant, 
        addFoodImages,
        setAlert
    })(withRouter(MyRestuarantItem));
