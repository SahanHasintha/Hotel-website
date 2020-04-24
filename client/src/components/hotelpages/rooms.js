import React,{ Fragment} from 'react';
import {connect} from 'react-redux';
import LoadingGif from '../layouts/loadingGif';

const Rooms = ({profile:{profile, loading}}) => {

    return (
        <div style={{marginTop : "30px"}}>
            
            {profile===null || loading ? <LoadingGif/> :(<div className="ui relaxed divided items">
            <h1>Rooms</h1>
                {profile.rooms.length === 0 ? <h3 style={{color:"red"}}>They have no restuarant</h3>:<Fragment>
                
                {profile.rooms.map(room => (<div className="item" key={room._id}>
                    <div className="ui small image">
                        {room.images !== 0 ? <img src={room.images[0]} alt=""/>: <img src="" alt=""/>}
                    </div>
                    <div className="content">
                        <h5 className="header">{room.price}</h5>
                        <div className="meta">
                            <span>{room.facilities}</span>
                        </div>
                        <div className="description">
                            <p>
                                {room.description}
                            </p>
                        </div>
                        <div className="extra">
                            {room.category} 
                        </div>
                    </div>
                </div>))}
                    </Fragment>}
                
            </div>) }
            
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}
export default connect(mapStateToProps)(Rooms);
