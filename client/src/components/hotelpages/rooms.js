import React,{ Fragment} from 'react';
import {connect} from 'react-redux';
import {Link} from 'react-router-dom';
import LoadingGif from '../layouts/loadingGif';

const Rooms = ({profile:{profile, loading}}) => {

    return (
        <div style={{ backgroundColor:'#E8E8E8'}}>
        <div style={{padding: 50,marginTop:20}}>
            
            {profile===null || loading ? <LoadingGif/> :(<div className="ui relaxed divided items">
            <h1>Rooms</h1>
                {profile.rooms.length === 0 ? <h3 style={{color:"red"}}>They have no restuarant</h3>:<Fragment>
                
                {profile.rooms.map(room => (<Link to={`/${profile._id}/rooms/${room._id}`} className="item" key={room._id}  style={{textDecoration:'none' ,cursor:'pointer'}} >
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
                </Link>
                ))}
                    </Fragment>}
                
            </div>) }
            
        </div>
        </div>
    )
}
const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}
export default connect(mapStateToProps)(Rooms);
