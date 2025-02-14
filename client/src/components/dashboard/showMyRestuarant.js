import React,{useEffect} from 'react';
import {connect} from 'react-redux';
import Spinner from '../layouts/loadingGif';
import MyRestuarantItem from './myProperties/myRestuarantItem';
import {getMyProfile} from '../../actions/profile';

export const ShowMyRestuarant = ({profile:{profile, loading}, getMyProfile}) => {
    useEffect(()=>{
        getMyProfile();
    },[])
    return (
        <div>
            {profile === null ? <Spinner/> :<MyRestuarantItem restuarant={profile.restuarant}/>}
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}

export default connect(mapStateToProps, {getMyProfile})(ShowMyRestuarant);