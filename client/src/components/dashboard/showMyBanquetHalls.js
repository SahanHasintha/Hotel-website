import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import Spinner from '../layouts/loadingGif';
import MyBanquetItem from './myProperties/myBanquetItem';
import {getMyProfile} from '../../actions/profile';

export const ShowMyRestuarant = ({profile:{profile, loading}, getMyProfile}) => {
    useEffect(()=>{
        getMyProfile();
    },[])
    return (
        <div>
            {profile === null ? <Spinner/> :<MyBanquetItem halls={profile.weddinghall}/>}
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}

export default connect(mapStateToProps, {getMyProfile})(ShowMyRestuarant);