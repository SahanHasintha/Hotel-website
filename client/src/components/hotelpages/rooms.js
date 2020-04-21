import React,{useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {getProfileById} from '../../actions/profile';
import LoadingGif from '../layouts/loadingGif';

const Rooms = ({profile:{profile, loading}}) => {

    return (
        <div style={{marginTop : "30px"}}>
            
            {profile===null || loading ? <LoadingGif/> :(<div className="ui relaxed divided items">
            <h1>Rooms</h1>
                {profile.restuarant.length === 0 ? <h3 style={{color:"red"}}>They have no restuarant</h3>:<Fragment>
                
                {profile.rooms.map(room => (<div className="item" key={room._id}>
                    <div className="ui small image">
                        <img src="" alt=""/>
                    </div>
                    <div className="content">
                        <a className="header">{room.price}</a>
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
