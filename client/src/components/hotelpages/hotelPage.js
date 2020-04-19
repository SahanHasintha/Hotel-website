import React, {useEffect, Fragment} from 'react';
import {connect} from 'react-redux';
import {getProfileById} from '../../actions/profile';

const HotelPage = ({getProfileById , match , profile:{profile, loading}}) => {

    useEffect(()=>{
        getProfileById(match.params.id)
    },[getProfileById, match.params.id])
    return (
        <div>
            {profile && !loading && <Fragment>{profile.name}</Fragment>}
            
        </div>
    )
}

const mapStateToProps= (state) => {
    return {
        profile:state.profile
    }
}
export default connect(mapStateToProps, {getProfileById})(HotelPage);
