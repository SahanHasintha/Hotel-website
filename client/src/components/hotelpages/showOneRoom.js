import React,{useEffect, useState} from 'react';
import {connect} from 'react-redux';
import {getProfileById} from '../../actions/profile';
import './imageViews/css/slider.css'

const ShowOneRoom = ({match , profile:{profile, loading}, getProfileById}) => {
    useEffect(()=>{
        getProfileById(match.params.profileId)
    },[getProfileById])

    const [x, setX] = useState(0)

    const goLeft = (length) => {
        console.log(x);
        x === 0 ? setX(-100*(length-1)) : setX(x+100);
    }
    const goRight = (length) => {
        console.log(x)
        // x=== (images.length-1) 
        x ===  -100*(length-1) ? setX(0) : setX(x-100)
    }
    return (
       <div>
            {profile !== null && profile.rooms.map(room=> room._id === match.params.roomId && <div className="slider">
                {room.images.map((image, index)=> {
                    return <div className="slide" style={{transform:`translateX(${x}%)`}}>
                            <img src={image} alt="" style={{maxHeight:800,maxWidth:800}}/>
                        </div>
                })}
                <button id="goLeft" onClick={()=>goLeft(room.images.length)} ><i class="angle double left icon" style={{fontSize:50}}/></button>
                <button id="goRight" onClick={()=>goRight(room.images.length)}><i class="angle double right icon" style={{fontSize:50}}/></button>
            </div>)}
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}

export default connect(mapStateToProps, {getProfileById})(ShowOneRoom);