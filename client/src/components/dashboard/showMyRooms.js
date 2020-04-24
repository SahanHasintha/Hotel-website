import React from 'react';
import {connect} from 'react-redux';
import MyRooms from './myProperties/myRoomItem';

const ShowMyRooms = ({profile : {profile, loading}}) => {
    return (
        <div>
            {!loading && <MyRooms rooms={profile.rooms}/>}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}
export default connect(mapStateToProps)(ShowMyRooms);

