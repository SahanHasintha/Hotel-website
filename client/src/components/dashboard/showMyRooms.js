import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import MyRooms from './myProperties/myRoomItem';
import { getMyProfile} from '../../actions/profile';
import LoadingGif from '../layouts/loadingGif';

const ShowMyRooms = ({profile : {profile, loading}, getMyProfile}) => {
    useEffect(()=>{
        getMyProfile();
    },[])


    return (
        <div>
            {profile !== null ? <MyRooms rooms={profile.rooms}/>:<LoadingGif />}
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}
export default connect(mapStateToProps,{ getMyProfile})(ShowMyRooms);

