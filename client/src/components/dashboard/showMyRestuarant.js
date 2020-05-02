import React from 'react';
import {connect} from 'react-redux';
import Spinner from '../layouts/loadingGif';
import MyRestuarantItem from './myProperties/myRestuarantItem';

export const ShowMyRestuarant = ({profile:{profile, loading}}) => {
    return (
        <div>
            {loading ? <Spinner/> :profile.restuarant.length ===0 ? <div>No restuarant</div>:<MyRestuarantItem restuarant={profile.restuarant}/>}
            
        </div>
    )
}

const mapStateToProps = (state) => {
    return {
        profile:state.profile
    }
}

export default connect(mapStateToProps)(ShowMyRestuarant);